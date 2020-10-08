import React, { Component } from 'react';

class SpecIcon extends Component {
    constructor(props) {
        super(props);
        this.state = {recruiting: this.props.recruiting, image: this.props.image};

    }

    render() {
        const recruiting = this.state.recruiting;
        let icon;
        if(recruiting) {
            icon = <img src={this.state.image} alt="" style={{height: 25, width: 25}} />
        } else {
            icon = <img src={this.state.image} alt="" style={{height: 25, width: 25, opacity: 0.2}} />
        }

        return (
            <div>
                {icon}
            </div>
        )
    }
}

export default SpecIcon;