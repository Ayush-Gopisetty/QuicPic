import logo from './logo.svg';
import './App.css';
import Post from './Post';
function App() {
  return (
    <div className="app">
      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://cdn.discordapp.com/attachments/757748733365714975/906266039359266836/Drawing.png"
          alt=""
        />
      </div>

      <Post/>
      <Post/>
      <Post/>
    </div>
  );
}

export default App;
