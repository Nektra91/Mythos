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
    }
}
export default serviceFunctions;