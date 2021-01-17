import React, { Component } from 'react';
import CommentInput from './CommentInput';
import CommentList from './CommentList';
import PropTypes from 'prop-types';
import Spinner from '../Spinner';
import dbService from '../../service/database';
import style from './CommentSection.module.css';
import AuthUserContext from '../Session/context';

export default class CommentSection extends Component {
    constructor(props) {
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.fetchComments = this.fetchComments.bind(this);
        this.onCommentAdd = this.onCommentAdd.bind(this);
        this.onApprove = this.onApprove.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.state = {
            commentList: null,
            user:null,
            loading: true,
        }
    }

    componentDidMount() {
        this.fetchComments();
    }

    async onApprove() {
        if (this.props.applicationId) {
            this.setState({loading: true});
            dbService.approveApplication(this.props.applicationId).then(response => {
                this.props.historyChange();
            });
        }
    }

    async onDelete() {
        if (this.props.applicationId) {
            this.setState({loading: true});
            const id = Number(this.props.applicationId);
            await dbService.markAsDeleted(id).then(resonse => {
                this.props.historyChange();
            });
        }
    }

    async onCommentAdd(userComment) {
        const newComment = {
            Comment: userComment.comment,
            CreatedByUserId: userComment.user.id,
            ApplicationId: this.props.applicationId,
            User: {
                UserName: userComment.user.userName,
                CharacterName: userComment.user.charName,
                CharacterUrl: userComment.user.avatar
            }
        };
        if (this.state.commentList) {
            const newList = this.state.commentList.concat(newComment)
            this.setState({commentList: newList});
            const insertDto = {
                applicationId: newComment.ApplicationId,
                comment: newComment.Comment,
                createdById: newComment.CreatedByUserId
            };
            await dbService.createApplicationComment(insertDto).then(() => {
                // success!!!
            })
        }
    }

    async fetchComments() {
        const id = Number(this.props.applicationId);
        await dbService.fetchCommentsForApplication(id).then(comments => {
            this.setState({commentList: comments, loading: false});
        }).catch(err => {
        });
    }

    render() {
        if (this.state.loading) {
            return (
                <div className={style.mainContainer}>
                    <div className={style.spinner}>
                        <Spinner/>
                    </div>
                </div>
            )
        } else {
            const comments = this.state.commentList.map(x => {
                return {
                    comment: {
                        applicationId: x.ApplicationId,
                        comment: x.Comment,
                        user: {
                            userId: x.CreatedByUserId,
                            characterName: x.User.CharacterName,
                            characterUrl: x.User.CharacterUrl,
                            userName: x.User.Username
                        }
                    }
                }
            });
            return (
                <AuthUserContext.Consumer>
                    {authUser => (
                        <div className={style.mainContainer}>
                            <CommentInput fireBaseUser={authUser}
                                           approveApplicant={this.onApprove}
                                           addComment={this.onCommentAdd}
                                           deleteApplication={this.onDelete}/>
                            <CommentList props={comments.map(comment => comment.comment)}/> 
                        </div>    
                    )}            
                </AuthUserContext.Consumer>  
            )
        }
    }
}

CommentSection.propTypes = {
    applicationId: PropTypes.number,
}

