import React, { Component } from 'react';

class ClassIcon extends Component {
    constructor(props) {
        super(props);
        this.state = {image: this.props.image};

    }

    render() {
        return (
            <div>
                <img src={this.state.image} alt="" style={{height: 45, width: 45}} />
            </div>
        )
    }
}

export default ClassIcon;