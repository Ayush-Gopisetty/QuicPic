import React, { useState } from 'react';
import './App.css';
import Post from './Post';
function App() {
  const [posts, setPosts] = useState([
    {
        username:"temoc",
        caption:"UTD Pride",
        imageUrl:"https://cdn.discordapp.com/attachments/757748733365714975/906333591334711296/Temoc_2016.jpg"
    },
    {
        username:"ayushgopisetty",
        caption:"UTD Pride",
        imageUrl:"https://cdn.discordapp.com/attachments/757748733365714975/906352741973119026/UTD_Campus2.jpg"
    },
    {
      username:"sunalam",
      caption:"Temoc",
      imageUrl:"https://cdn.discordapp.com/attachments/757748733365714975/906353648622247997/DcMnkX3VMAYKS5B.jpg"
  }
  ]);
  return (
    <div className="app">
      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://cdn.discordapp.com/attachments/757748733365714975/906266039359266836/Drawing.png"
          alt=""
        />
      </div>

      {
        posts.map(post => (
          <Post username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
        ))
      }

    </div>
  );
}

export default App;
