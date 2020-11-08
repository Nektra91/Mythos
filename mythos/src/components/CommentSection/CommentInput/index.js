import React, { Component } from 'react'
import styles from './CommentInput.module.css';
import service from '../../../service/database';

export class CommentInput extends Component {

    constructor(props) {
        super(props);
        this.onAddComment = this.onAddComment.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.fetchUserData = this.fetchUserData.bind(this);
        this.commentIsValid = this.commentIsValid.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.approve = this.approve.bind(this);
        this.state = {
            comment:'',
            user: null,
            dataFetched: false
        };
    }

    handleKeyUp(event) {
        const shouldResolve = event.key === 'Enter' && this.commentIsValid();
        if (shouldResolve) {
            this.onAddComment();
        }
    }

    componentDidMount() {
        this.fetchUserData();
    }

    handleInputChange(event) {
        this.setState({comment:event.target.value});
    }

    commentIsValid() {
        const canSubmit = this.state.dataFetched && this.state.comment.trim().length > 0;
        return canSubmit;
    }
    async fetchUserData() {
        const fireBaseUser = this.props.fireBaseUser;
        await service.fetchUserData(fireBaseUser).then(response => {
            const dto = this.createUserData(response);
            this.setState({user: dto, dataFetched: true});
        }).catch(err => {
            console.log(err);
        })
    }

    approve() {
        this.props.approveApplicant();
    }

    createUserData(data) {
        const result = {
            id: data.Id,
            userName: data.Username,
            server: data.ServerName,
            isAdmin:data.Admin,
            charClass: data.CharacterClass,
            charName: data.CharacterName,
            avatar: data.CharacterUrl,
            isLinked: data.Linked
        };
        return result;
    }
    onAddComment() {
        const userComment = {
            user: this.state.user,
            comment: this.state.comment
        };
        this.setState({comment:''});
        this.props.addComment(userComment);


    }
    render() {
        return (
            <div className={styles.inputContainer}>
                <div className={styles.inputArea}>
                    <input onChange={(event) => this.handleInputChange(event)}
                            value={this.state.comment}
                            onKeyUp={(event) => this.handleKeyUp(event)}
                            type="text" name="comment"
                            placeholder="have something to say?"></input>
                    <div className={styles.submitButton}>
                        <button className={styles.commentBtn}disabled={!this.commentIsValid()} onClick={() => this.onAddComment()}>Add comment</button>
                        <button className={styles.approveBtn} onClick={() => this.approve()}>Approve</button>
                    </div>
                </div>
            </div>
        )
    }
}
export default CommentInput
