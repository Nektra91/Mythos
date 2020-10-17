import React from 'react'
import PropTypes from 'prop-types'

const ApplicationInfo = (props) => {
    return (
        <div className="more-info">
            <div className="about">
                <span className="label">About:</span>
                <span className="value">{props.about}</span>
            </div>
            <div className="brag">
                <span className="label">Brag:</span>
                <span className="value">{props.brag}</span>
            </div>
            <div className="raiding-experience">
                <span className="label">RaidingExperience:</span>
                <span className="value">{props.raidingExperience}</span>
            </div>
            <div className="why-mythos">
                <span className="label">Why Mythos:</span>
                <span className="value">{props.whyMythos}</span>
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
