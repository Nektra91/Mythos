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
    }
}
export default serviceFunctions;