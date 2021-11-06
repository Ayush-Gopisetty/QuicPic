import React, { useState } from 'react';
import './Post.css';
import Avatar from "@material-ui/core/Avatar"

function Post({username, caption, imageUrl}) {
    
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
        </div>
    )
}

export default Post;