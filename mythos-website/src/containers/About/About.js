import React, {Component} from 'react';

import Au from '../../hoc/Au/Au';

import axios from 'axios';


class About extends Component {
    render() {
        return (
            <Au>
                <div>About us</div>
            </Au>
        )
    }

    componentDidMount () {
        axios.post('https://light-jackal-86.hasura.app/v1/graphql', {
            query: `query MyQuery {
                GuildInfo {
                  InfoText
                }
                Officers {
                  Id
                  Name
                  Role
                }
              }`
        }).then(res => {
            console.log(res);
        });
    }
}
export default About;