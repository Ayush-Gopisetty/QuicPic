import React from 'react';
import './Post.css';
import Avatar from "@material-ui/core/Avatar"

function Post() {
    return (
        <div className="post">
            <div className="post__header">
                <Avatar
                    className="post__avatar"
                    alt="Temoc"
                    src="https://cdn.discordapp.com/attachments/757748733365714975/906340594601844756/imageedit_3_9716447303.png"
                />

                <h3>Username</h3>
            </div>

            <img className="post__image" src="https://cdn.discordapp.com/attachments/757748733365714975/906333591334711296/Temoc_2016.jpg"/>

            <h4 className="post__text"><strong>temoc</strong> UTD Pride</h4>
        </div>
    )
}

export default Post;