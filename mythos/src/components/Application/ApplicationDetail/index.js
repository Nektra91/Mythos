import React from 'react'
import PropTypes from 'prop-types'

const ApplicationDetail = (props) => {
    return (
    <div className="detail">
        <div className="detail-header">
            <h2>Details</h2>
        </div>
        <div className="detail-container">
            <div className="section">
                <div className="name-and-server">
                    <span className="label">Name:</span>
                    <span className="value">{props.name}</span>
                    <span className="label">-</span>
                    <span className="value">{props.server}</span>
                </div>
                <div className="role">
                    <span className="label">Role:</span>
                    <span className="value">{props.role}</span>
                </div>
                <div className="avg-item-level">
                    <span className="label">Average item level:</span>
                    <span className="value">{props.avgItemLevel}</span>
                </div>
                <div className="eqpt-item-level">
                    <span className="label">Equipped item level:</span>
                    <span className="value">{props.eqptItemLevel}</span>
                </div>
            </div>
            <div className="section">
                <div className="empty-section"></div>
            </div>
            <div className="section">
                <div className="battle-tag">
                    <span className="label">Battle Tag:</span>
                    <span className="value">{props.battleTag}</span>
                </div>
                <div className="warcraft-log-tag">
                    <span className="label">Warcraft Log Tag:</span>
                    <span className="value">{props.warcraftLogTag}</span>
                </div>
                <div className="discord-tag">
                    <span className="label">Discord Tag:</span>
                    <span className="value">{props.discordTag}</span>
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
