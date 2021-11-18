import React, {useState, useEffect } from 'react';
import './App.css';
import Post from './Post';
import { db, auth } from './firebase';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {Button, Input} from '@material-ui/core';
import ImageUpload from './ImageUpload';

//gets the style for the sign in and sign up window
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

//Creates the style for the sign in
const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

//Creates the layout for the web application and adds the functionalities to it
function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null);

  //User authentication from Firebase is implemented into the web application
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser);
        setUser(authUser);
      }

      else {
        setUser(null);
      }
    })

    return () => {
      unsubscribe();
    }

  }, [user, username]);

  //The posts are added onto the web application in the most recent order
  useEffect(() => {
    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id, 
        post: doc.data()
      })));
    })
  }, []);

  //Allows user to input username, email, and password to create account
  //account is stored in Firebase
  const signUp = (event) => {
    event.preventDefault();

    auth.createUserWithEmailAndPassword(email, password)
    .then((authUser) => {
      return authUser.user.updateProfile({
        displayName: username
      })
    })
    .catch((error) => alert(error.message));

    setOpen(false);
  }

  //Allows user to input email, and password to login in
  const signIn = (event) => {
    event.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));

      setOpenSignIn(false);
  }

  //Functionality is added for sign in, sign up, logout, add post, and add comment
  // Firebase authentication is used for the sign up and sign in functionality
  // Checks if inputted email, username, and password is in proper format for sign up functionality
  // Checks if inputted email and password is in proper format for sign in functionality
  // Also checks if inputted email has already been used for sign up functionality
  // Checks if email and password has been correctly entered for sign in functionality
  // Created Account from sign up functionality is stored on Firebase
  // Allows logged in user to use logout functionality to take user back to sign in or sign up page
  // Allows user to use add post functionality if user is logged in
  // Add post functionality allows user to upload an image and set a caption for the image
  // Also, add post functionality allows user to be able to track the image upload progress
  // Allows user to use add comments functionality if user is logged in
  // Add comments functionality allows user to add comments to an existing post
  // Delete post functionality allows user to delete a post that the user had uploaded
  // Delete comment functionality allows user to user to delte a comments the user had previously added to a post
  return (
    <div className="app">
      <Modal
       open={open}
       onClose={() => setOpen(false)}
       >
         <div style={modalStyle} className={classes.paper}>
           <form class="app__signup">
            <center>
              <img
                className="app__headerImage"
                src="https://cdn.discordapp.com/attachments/757748733365714975/906266039359266836/Drawing.png"
                alt=""
              />
            </center>
            <Input
              placeholder="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button type="submit" onClick={signUp}>Sign Up</Button>
           </form>
         </div>
      </Modal>

      <Modal
       open={openSignIn}
       onClose={() => setOpenSignIn(false)}
       >
         <div style={modalStyle} className={classes.paper}>
           <form class="app__signup">
            <center>
              <img
                className="app__headerImage"
                src="https://cdn.discordapp.com/attachments/757748733365714975/906266039359266836/Drawing.png"
                alt=""
              />
            </center>
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button type="submit" onClick={signIn}>Sign In</Button>
           </form>
         </div>
      </Modal>

      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://cdn.discordapp.com/attachments/757748733365714975/906266039359266836/Drawing.png"
          alt=""
        />

        {user ? (
          <Button onClick={() => auth.signOut()}>Logout</Button>
        ): (
          <div className="app__loginContainer">
            <Button onClick={() => setOpenSignIn(true)}>Sign In</Button> 
            <Button onClick={() => setOpen(true)}>Sign Up</Button> 
          </div> 
        )}
      </div>
      
      <div className="app__posts">
        {
          posts.map(({id, post}) => (
            <Post key={id} postId={id} user={user} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
          ))
        }
      </div>

      {user?.displayName ?  (
        <ImageUpload username={user.displayName} />
      ): (
        <h3>Sorry you need to login to upload</h3>
      )}

    </div>
  );
}

export default App;
