import { Link } from "react-router-dom";

const Home = () => {

  return (
    <div>
      <h2>home</h2>
      <div>
        <div>
          <Link to="/about">turn to about</Link>
        </div>
        <div>
          <Link to="/about2">turn to about2</Link>
        </div>
        <div>
          <Link to="/priority-demo">turn to priority-demo</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
