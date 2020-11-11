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
          }).then(res => {
            classes = res.data.data.Class;
          });
        return classes;
    },

    async fetchUnconfirmedApplications() {
      let application = null;
      await axios
      .post(`https://light-jackal-86.hasura.app/v1/graphql`, {
        query: `query MyQuery {
                Application(where: {Completed: {_eq: false}}) {
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
                }
              }`,
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
      }`}).then(response => {
        application = response.data.data.Application[0];
      }).catch(err => {
        console.log(err);
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
      }).then(response => {
        comments = response.data.data.ApplicationComment;
      }).catch(err => {
        console.log(err);
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
      }).then(response => {
        console.log(response);
      }).catch(err => {
        console.log(err);
      })
  },

    async createApplication(payload) {
        await axios.post(`https://light-jackal-86.hasura.app/v1/graphql`, {
            query: `mutation insert_Application {
                insert_Application(objects: {
                About: "${payload.about}", 
                BattleTag: "${payload.battletag}", 
                Brag: "${payload.brag}", 
                DiscordTag: "${payload.discordtag}", 
                Name: "${payload.name}", 
                RaidingExperience: "${payload.experience}", 
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
        }).then(response => {
          console.log(response);
        }).catch(err => {
          console.log(err);
        })
    },

    async createUser(payload) {
      console.log(payload)
      await axios.post(`https://light-jackal-86.hasura.app/v1/graphql`, {
        query: `mutation insert_User {
          insert_User(objects: {FirebaseIdentifier: "${payload.uid}", Username: "${payload.name}"}) {
            returning {
              Id
              FirebaseIdentifier
            }
          }
        }`
      }).then(response => {
        console.log(response);
      }).catch(err => {
        console.log(err);
      })
    },

    async fetchUserData(payload) {
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
          }
        }`
      }).then(response => {
        userInfo = response.data.data.User[0];
      }).catch(err => {
        console.log(err);
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
      }).then(response => {
        userInfo = response.data.data.update_User.returning[0]
      }).catch(err => {
        console.log(err);
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
      }).then(response => {
        homeTexts = response.data.data.HomeTexts
      }).catch(err => {
        console.log(err);
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
      }).then(response => {
        users = response.data.data.User
      }).catch(err => {
        console.log(err);
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
      }).then(response => {
        user = response.data.data.User
      }).catch(err => {
        console.log(err);
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
      }).then(response => {
        success = true;
      }).catch(err => {
        console.log(err);
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
      }).then(response => {
        console.log(response)
        success = true;
      }).catch(err => {
        console.log(err);
      })
      return success;
    }
}
export default serviceFunctions;