import React, {Component} from 'react';
import TopImage from '../../components/Dashboard/TopImage';
import Recruitment from '../../components/Dashboard/Recruitment';
import Progress from '../../components/Dashboard/Progress';

import Au from '../../hoc/Au/Au';

import classes from './Home.css';


class Home extends Component {
    render() {
        return (
            <Au>
                <div className={classes.Home}>
                    <div className={classes.TopImage}>
                        <TopImage>
                        </TopImage>
                    </div>                    
                    <div className={classes.Middle}>
                        <div className={classes.Recruitment}>
                            <Recruitment></Recruitment>
                        </div>
                        <div className={classes.Progress}>
                            <Progress></Progress>
                        </div>
                    </div>
                    
                </div>                
            </Au>
        )
    }
}
export default Home;