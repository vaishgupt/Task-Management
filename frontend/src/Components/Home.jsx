import { Link } from "react-router-dom";
import task from "../assets/task.png";

const Home = () => {
  return (
    <div className="screen">
      <div className="card card--center">
        <img src={task} alt="task" className="card__img" />
        <h1>You are what you believe.</h1>
        <p>If you are extremely organised and would like to keep track of what you do everyday. You are at right place.</p>
        <Link to="/signup">
          <button className="btn">Let&apos;s get Started</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
