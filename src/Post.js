import React, { useEffect, useState } from 'react';
import './Post.css';
import Avatar from "@material-ui/core/Avatar"
import { db, auth } from './firebase';
import firebase from 'firebase';

//creates a UI for allowing a loggin in user to add a post on the website application
// adds functionality for uploading the post from any device onto the website application
// tracks when the file has been uploaded onto the website application
//allows user to comment on the post that the user chooses to submit
//allows user to add a comment on an existing post
//allows user to delete a post that the user has uploaded
//allows user to delete a comment that the user has added
function Post({postId, user, username, caption, imageUrl}) {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');

    useEffect(() => {
        let unsubscribe;
        if (postId) {
            unsubscribe = db
                .collection("posts")
                .doc(postId)
                .collection("comments")
                .orderBy('timestamp', 'desc')
                .onSnapshot((snapshot) => {
                    setComments(snapshot.docs.map((doc) => ({
                            id: doc.id,
                            comment: doc.data(),
                        }))
                    );
                });
        }

        return () => {
            unsubscribe();
        };
    }, [postId]);

    const postComment = (event) => {
        event.preventDefault();

        db.collection("posts").doc(postId).collection("comments").add({
            text: comment,
            username: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        setComment('');
    }

    const deletePost = (event) => {
        event.preventDefault();

        db.collection("posts").doc(postId).delete()
        .then(function() {
            alert("Post has been successfully deleted");
        }).catch(function(error) {
            console.log("Error removing post: ", error);
        });

        firebase.storage().refFromURL(imageUrl).delete().then(function() {
            //File has successfully been deleted
        }).catch(function(error) {
            //An error has occurred!
        });
    }
    
    const deleteComment = (id) => {
        db.collection("posts").doc(postId).collection("comments").doc(id).delete();
    }

    return (
        <div className="post">
            <div className="post__header">
                <Avatar
                    className="post__avatar"
                    alt="Temoc"
                    src="https://cdn.discordapp.com/attachments/757748733365714975/906340594601844756/imageedit_3_9716447303.png"
                />

                <h3>{username}</h3>
            </div>

            <img className="post__image" src={imageUrl} alt=""/>

            <h4 className="post__text"><strong>{username}</strong> {caption}</h4>

            <div className="post__comments">
                {comments.map(({id, comment}) => (
                    <div className="post__comment">
                        <p>
                            <strong>{comment.username}</strong> {comment.text}
                        </p>
                        {comment.username == user?.displayName ? (
                            <button
                                className="delete__comment"
                                onClick={() => deleteComment(id)}
                            >
                                X
                            </button>
                        ) : (
                            <div></div>
                        )}
                    </div>
                ))}
            </div>
            
            {user && (
                <form className="post__commentBox">
                    <input
                        className="post__input"
                        type="text"
                        placeholder="Add a comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <button
                        className="post__button"
                        disabled={!comment}
                        type="submit"
                        onClick={postComment}
                    >
                        Post
                    </button>
                </form>
            )}
            {user && username === auth.currentUser.displayName && (
                <button
                    className="delete__button"
                    type="submit"
                    onClick={deletePost}
                >
                    Delete Post
                </button>
            )}
        </div>
    )
}

export default Post;
