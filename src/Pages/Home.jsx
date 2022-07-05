import { Link } from "react-router-dom";
import Navbar from "./Navbar.jsx";

const Home = () => {
  return (
    <div className="Home">
      <header>
        <h1 className="pageHeader">Chart My Jog</h1>
      </header>
      <main>
        <Navbar />
        <div>
          <p>"Super Motivational Running Quote"</p>
        </div>
        <div>"Company statement/why use our app quote here"</div>
        <p>Sign in</p>
        <p>Don't have an account? Sign up</p>
      </main>
    </div>
  );
}

export default Home;
