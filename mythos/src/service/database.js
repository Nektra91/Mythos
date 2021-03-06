import axios from 'axios';

const serviceFunctions = {
    async fetchClassesAndSpec() {
        let classes = [];
        await axios.post(`https://light-jackal-86.hasura.app/v1/graphql`, {
            query: `query MyQuery {
              Class {
                Id
                Name
                Recruitments {
                  Specialization {
                    Name
                  }
                  Recruiting
                  Id
                }
              }
            }`            
          }, {
            headers: {
              'x-hasura-admin-secret': 'Mythos123'
            }
          }).then(res => {
            classes = res.data.data.Class;
          });
        return classes;
    },

    async fetchAllApplications() {
      let application = null;
      await axios
      .post(`https://light-jackal-86.hasura.app/v1/graphql`, {
        query: `query MyQuery {
                Application(where: {Deleted: {_eq: false}}) {
                  Id
                  Name
                  About
                  BattleTag
                  Brag
                  Completed
                  DiscordTag
                  RaidingExperience
                  Role
                  Server
                  WarcraftLogTag
                  WhyMythos
                  AppliedOn
                }
              }`,
      }, {
        headers: {
          'x-hasura-admin-secret': 'Mythos123'
        }
      }).then(response => {
        application = response.data.data.Application;
      });
      return application;
    },

    async getSpecsForClass(payload) {
        let specs = [];     
        await axios.post(`https://light-jackal-86.hasura.app/v1/graphql`, {
            query: `query MyQuery {
            Specialization(where: {Recruitments: {Class: {Name: {_eq: "${payload}"}}}}) {
                Name
            }
            }`
        }, {
          headers: {
            'x-hasura-admin-secret': 'Mythos123'
          }
        }).then(response => {
            specs = response.data.data.Specialization
        });
        return specs;
    },

    async fetchApplication(id) {
      let application = null;
      await axios.post(`https://light-jackal-86.hasura.app/v1/graphql`, {
        query: `query MyQuery {
        Application(where: {Id: {_eq:${id}}}) {
          About
          BattleTag
          Brag
          Completed
          DiscordTag
          Id
          Name
          RaidingExperience
          Role
          Server
          WarcraftLogTag
          WhyMythos
        }
      }`}, {
        headers: {
          'x-hasura-admin-secret': 'Mythos123'
        }
      }).then(response => {
        application = response.data.data.Application[0];
      }).catch(err => {
      });
      return application;
    },

    async fetchCommentsForApplication(id) {
      let comments = [];
      await axios.post(`https://light-jackal-86.hasura.app/v1/graphql`, {
        query: `query MyQuery {
          ApplicationComment(where: {ApplicationId: {_eq:${id}}}, order_by: {Id: asc}) {
            Comment
            CreatedByUserId
            ApplicationId
            User {
              Username
              CharacterName
              CharacterUrl
            }
          }
        }`
      }, {
        headers: {
          'x-hasura-admin-secret': 'Mythos123'
        }
      }).then(response => {
        comments = response.data.data.ApplicationComment;
      }).catch(err => {
      });
      return comments;
    },

    async createApplicationComment(payload) {
      await axios.post(`https://light-jackal-86.hasura.app/v1/graphql`, {
          query: `mutation MyMutation {
            insert_ApplicationComment(objects: {ApplicationId: "${payload.applicationId}", Comment: "${payload.comment}", CreatedByUserId: "${payload.createdById}"}) {
              returning {
                ApplicationId
                Comment
                CreatedByUserId
                Id
              }
            }
          }`
      }, {
        headers: {
          'x-hasura-admin-secret': 'Mythos123'
        }
      }).then(response => {
      }).catch(err => {
      })
  },

  async approveApplication(id) {
    await axios.post(`https://light-jackal-86.hasura.app/v1/graphql`, {
      query: `mutation MyMutation {
        update_Application(where: {Id: {_eq: ${id}}}, _set: {Completed: true}) {
          affected_rows
          returning {
            Id
            Completed
          }
        }
      }`
    }, {
      headers: {
        'x-hasura-admin-secret': 'Mythos123'
      }
    }).then(response => {
    }).catch(err => {
    });  
  },

  async markAsDeleted(id) {
    await axios.post(`https://light-jackal-86.hasura.app/v1/graphql`, {
      query: `mutation MyMutation {
        update_Application(where: {Id: {_eq: ${id}}}, _set: {Deleted: true}) {
          affected_rows
          returning {
            Id
            Completed
          }
        }
      }`
    }, {
      headers: {
        'x-hasura-admin-secret': 'Mythos123'
      }
    }).then(response => {
    }).catch(err => {
    });  
  },

  async createApplication(payload) {
    var date = new Date();
      await axios.post(`https://light-jackal-86.hasura.app/v1/graphql`, {
          query: `mutation insert_Application {
              insert_Application(objects: {
              About: "${payload.about}", 
              UserId: "${payload.id}",
              BattleTag: "${payload.battletag}", 
              Brag: "${payload.brag}", 
              DiscordTag: "${payload.discordtag}", 
              Name: "${payload.name}", 
              RaidingExperience: "${payload.experience}", 
              AppliedOn: "${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}",
              Role: "${payload.spec}", 
              Server: "${payload.server}", 
              WarcraftLogTag: "${payload.log}", 
              WhyMythos: "${payload.why}"}) {
              returning {
                  Id
                  Name
              }
              }
          }`
      }, {
        headers: {
          'x-hasura-admin-secret': 'Mythos123'
        }
      }).then(response => {
      }).catch(err => {
      })
    },

    async createUser(payload) {
      await axios.post(`https://light-jackal-86.hasura.app/v1/graphql`, {
        query: `mutation insert_User {
          insert_User(objects: {FirebaseIdentifier: "${payload.uid}", Username: "${payload.name}"}) {
            returning {
              Id
              FirebaseIdentifier
            }
          }
        }`
      }, {
        headers: {
          'x-hasura-admin-secret': 'Mythos123'
        }
      }).then(response => {
      }).catch(err => {
      })
    },

    async fetchUserData(payload) {
      /*var user = JSON.parse(localStorage.getItem("loggedInUser"));
      if(user !== null) {
        return user;
      }*/
      let userInfo = null;
      await axios.post(`https://light-jackal-86.hasura.app/v1/graphql`, {
        query: `query MyQuery {
          User(where: {FirebaseIdentifier: {_eq: "${payload.uid}"}}) {
            Username
            ServerName
            FirebaseIdentifier
            CharacterName
            CharacterUrl
            Admin
            Id
            Linked
            CharacterClass
            Applications(where: {Deleted: {_eq: false}, Completed: {_eq: false}}) {
              Id
            }
          }
        }`
      }, {
        headers: {
          'x-hasura-admin-secret': 'Mythos123'
        }
      }).then(response => {
        userInfo = response.data.data.User[0];
        //localStorage.setItem("loggedInUser", JSON.stringify(response.data.data.User[0]));
      }).catch(err => {
      })
      return userInfo;
    },

    async saveCharacterSync(payload) {
      let userInfo = null;
      await axios.post(`https://light-jackal-86.hasura.app/v1/graphql`, {
        query: `mutation MyMutation {
          update_User(where: {
            Id: {_eq: "${payload.id}"}}, 
            _set: {
              CharacterClass: "${payload.playerClass}", 
              CharacterName: "${payload.name}", 
              Linked: true, 
              ServerName: "${payload.server}",
              CharacterUrl: "${payload.avatar}"}) {
            returning {
              Username
              ServerName
              FirebaseIdentifier
              CharacterName
              Admin
              Id
              Linked
              CharacterClass
              CharacterUrl
            }
          }
        }`
      }, {
        headers: {
          'x-hasura-admin-secret': 'Mythos123'
        }
      }).then(response => {
        userInfo = response.data.data.update_User.returning[0]
      }).catch(err => {
      })
      return userInfo;
    },

    async fetchHomeTexts() {
      let homeTexts = null;
      await axios.post(`https://light-jackal-86.hasura.app/v1/graphql`, {
        query: `query MyQuery {
          HomeTexts {
            Id
            Text
          }
        }`
      }, {
        headers: {
          'x-hasura-admin-secret': 'Mythos123'
        }
      }).then(response => {
        homeTexts = response.data.data.HomeTexts
      }).catch(err => {
      })
      return homeTexts;
    },
    
    async fetchAllUsers() {
      let users = null;
      await axios.post(`https://light-jackal-86.hasura.app/v1/graphql`, {
        query: `query MyQuery {
          User(where: {Linked: {_eq: true}}) {
            Admin
            CharacterClass
            CharacterName
            CharacterUrl
            Id
            Linked
            ServerName
            Username
          }
        }`
      }, {
        headers: {
          'x-hasura-admin-secret': 'Mythos123'
        }
      }).then(response => {
        users = response.data.data.User
      }).catch(err => {
      })
      return users;
    },

    async makeUserAdmin(payload) {
      let user = null;
      await axios.post(`https://light-jackal-86.hasura.app/v1/graphql`, {
        query: `mutation update_User {
          update_User(where: {Id: {_eq: "${payload.userId}"}}, _set: {Admin: true}) {
            returning {
              Admin
              CharacterClass
              CharacterName
              CharacterUrl
              Id
              Linked
              ServerName
              Username
            }
          }
        }`
      }, {
        headers: {
          'x-hasura-admin-secret': 'Mythos123'
        }
      }).then(response => {
        user = response.data.data.User
      }).catch(err => {
      })
      return user;
    },

    async toggleRecruitment(payload) {
      let success = false;
      await axios.post(`https://light-jackal-86.hasura.app/v1/graphql`, {
        query: `mutation update_Recruitment {
          update_Recruitment(where: {Id: {_eq: "${payload.id}"}}, _set: {Recruiting: "${payload.recruiting}"}) {
            returning {
              Recruiting
              Id
            }
          }
        }`
      }, {
        headers: {
          'x-hasura-admin-secret': 'Mythos123'
        }
      }).then(response => {
        success = true;
      }).catch(err => {
      })
      return success;
    },

    async saveHomeText(payload) {
      let success = false;
      await axios.post(`https://light-jackal-86.hasura.app/v1/graphql`, {
        query: `mutation update_HomeTexts {
          update_HomeTexts(where: {Id: {_eq: "${payload.id}"}}, _set: {Text: "${payload.text}"}) {
            returning {
              Id
              Text
            }
          }
        }`
      }, {
        headers: {
          'x-hasura-admin-secret': 'Mythos123'
        }
      }).then(response => {
        success = true;
      }).catch(err => {
      })
      return success;
    }
}
export default serviceFunctions;