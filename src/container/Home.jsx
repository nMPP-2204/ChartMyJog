import "../App.scss";
import Footer from "../component/Footer";
import Carousel from "../component/Carousel";
import Background from "../Images/Background.gif";
import { Link } from "react-router-dom";

const Home = () => {
  const styledLink = { color: "black", textDecoration: "none" };

  return (
    <div className="Home">
      <header></header>
      <main>
        <div
          style={{
            backgroundImage: `url(${Background})`,
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "center",
          }}
        >
          <div className="text-white text-center text-4xl font-serif py-4 w-9/12">
            Explore the world one step at a time
            <br />
            <p className="text-xl py-3">
              Many runners around the world use{" "}
              <span className="italic text-3xl">Chart My Jog</span> to track
              their jogs and showcase
              <br />
              <br />
              <span className="text-4xl animate-charcter">
                achievements {"&"} improvements
              </span>
            </p>
          </div>
          <div className="start-run mb-5">
            <Link to="/signup" style={styledLink}>
              <button>
                <span className="font-serif">Start RUN</span>
              </button>
            </Link>
          </div>
          <Carousel />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
