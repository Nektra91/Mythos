import React from 'react';
import PropTypes from 'prop-types';
import Styles from './applicationInfo.module.css';

const ApplicationInfo = (props) => {
    return (
        <div className={Styles.moreInfo}>
            <div className={Styles.infoContainer}>
                <div className={Styles.infoSection}>
                    <div className={Styles.container}>
                        <div className={Styles.tile}>
                            <span className={Styles.label}>About:</span>
                            <span className={Styles.value}>{props.about}</span>
                        </div>
                        <div className={Styles.tile}>
                            <span className={Styles.label}>Brag:</span>
                            <span className={Styles.value}>{props.brag}</span>
                        </div>
                    </div>
                    <div className={Styles.container}>
                        <div className={Styles.tile}>
                            <span className={Styles.label}>RaidingExperience:</span>
                            <span className={Styles.value}>{props.raidingExperience}</span>
                        </div>
                        <div className={Styles.tile}>
                            <span className={Styles.label}>Why Mythos:</span>
                            <span className={Styles.value}>{props.whyMythos}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

ApplicationInfo.propTypes = {
    about: PropTypes.string,
    brag: PropTypes.string,
    raidingExperience: PropTypes.string,
    whyMythos: PropTypes.string
}

export default ApplicationInfo
