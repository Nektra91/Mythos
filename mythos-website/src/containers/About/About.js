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
        //console.log(this.props);
        axios.post('https://light-jackal-86.hasura.app/v1/graphql', {
            query: `query MyQuery {
                GuildInfo {
                  InfoText
                }
              }`
        }).then(res => {
            console.log(res);
        });
    }
}
export default About;