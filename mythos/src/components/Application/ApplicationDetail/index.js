import React from 'react'
import PropTypes from 'prop-types'
import style from './applicationDetail.module.css'

const ApplicationDetail = (props) => {
    return (
    <div className={style.detail}>
        <div className={style.detailHeader}>
            <span>Details</span>
        </div>
        <div className={style.detailContainer}>
            <div className={style.section}>
                <div className={style.fieldLeft}>
                    <span className={style.label}>Name:</span>
                    <span className={style.value}>{props.name}</span>
                </div>
                <div className={style.fieldLeft}>
                    <span className={style.label}>Server:</span>
                    <span className={style.value}>{props.server}</span>
                </div>
                <div className={style.fieldLeft}>
                    <span className={style.label}>Preferred spec:</span>
                    <span className={style.value}>{props.role}</span>
                </div>
                <div className={style.fieldLeft}>
                    <span className={style.label}>Average item level:</span>
                    <span className={style.value}>{props.avgItemLevel}</span>
                </div>
            </div>
            <div className={style.emptySection}>
            </div>
            <div className={style.section}>
                <div className={style.fieldRight}>
                    <span className={style.label}>Battle Tag:</span>
                    <span className={style.value}>{props.battleTag}</span>
                </div>
                <div className={style.fieldRight}>
                    <span className={style.label}>WarcraftLog Link:</span>
                    <span className={style.value}>{props.warcraftLogTag}</span>
                </div>
                <div className={style.fieldRight}>
                    <span className={style.label}>Discord Tag:</span>
                    <span className={style.value}>{props.discordTag}</span>
                </div>
                <div className={style.fieldRight}>
                    <span className={style.label}>Equipped item level:</span>
                    <span className={style.value}>{props.eqptItemLevel}</span>
                </div>
            </div>
        </div>
    </div>)
}

ApplicationDetail.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    server: PropTypes.string,
    role: PropTypes.string,
    avgItemLevel: PropTypes.number,
    eqptItemLevel: PropTypes.number,
    battleTag: PropTypes.string,
    warcraftLogTag: PropTypes.string,
    discordTag: PropTypes.string
}

export default ApplicationDetail
