import React, { Component } from 'react';
import service from '../../../service/database';
import style from './adminhome.module.css';
import * as ROUTES from '../../../constants/routes';

class AdminHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      text: ''
    }
  }

  componentDidMount() {
    this.fetchAllHomeTexts();
  }

  onChange = event => {
    this.setState({text: event.target.value})
  }

  saveText(id, text) {
    let payload = {
      id: id,
      text: text,
    }
    this.saveHomeText(payload)
  }

  render() {

    let id = this.state.id;
    let text = this.state.text;
    return (
      <div>
        <div key={id} className={style.Texts}>
          <div className={style.Tile}>
            <div>
              <textarea
                name={id}
                value={text}
                type="text"
                className={style.TextArea}
                onChange={this.onChange}
              />
            </div>
            <div className={style.Button}>
              <button onClick={() => this.saveText(id, text)}>
                Save
              </button>
            </div>
          </div>    
        </div>
      </div>
    )
  }

  async fetchAllHomeTexts() {
    service.fetchHomeTexts()
    .then(response => {
      this.setState({id: response[0].Id});
      this.setState({text: response[0].Text})
    })
  }

  async saveHomeText(payload) {
    service.saveHomeText(payload)
    .then(response => {
      this.props.history.push(ROUTES.ADMIN)
    })
  }
}

export default AdminHome;