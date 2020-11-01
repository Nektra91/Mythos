import React from 'react'
import PropTypes from 'prop-types'
import icon from '../../../images/logo.png';
import styles from './CommentList.module.css';

function CommentList(props) {
    const commentList = props.props.map(x => x);
    let list;
       list = commentList.map((comment) => {  
        const user = comment.user;
        const userIcon = user.characterUrl ? user.characterUrl : icon;
            return (
                <div className={styles.comment}>
                    <div className={styles.imgContainer}>
                        <div>
                            <img className={styles.avatar} src={userIcon}></img>
                        </div>
                    </div>
                    <div className={styles.commentBody}>
                        <div className={styles.user}>{user.characterName}</div>
                        <div className={styles.commentText}>{comment.comment}</div>
                    </div>
                </div>
                )
            });
        if (list) {
            return (
            <div className={styles.commentContainer}>
                {list}
            </div>
            );
        }
        else {
           return (
           <div className={styles.commentContainer}>
               <div>No comments</div>
           </div>
           );
        }
}

CommentList.propTypes = {
    comments: PropTypes.arrayOf(
         PropTypes.shape({
            applicationId: PropTypes.number,
            comment: PropTypes.string,
            user: PropTypes.shape({
                userId: PropTypes.number,
                characterName: PropTypes.string,
                characterUrl: PropTypes.string,
                userName: PropTypes.string
            })
        })
    )
}

export default CommentList

