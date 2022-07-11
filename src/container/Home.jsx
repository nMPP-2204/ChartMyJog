import Navbar from "../component/Navbar";
import { Typography } from "@mui/material";
import Footer from "../component/Footer";

const Home = () => {
  return (
    <div className="Home">
      <header>
        <h1 className="pageHeader">Chart My Jog</h1>
      </header>
      <main>
        <Navbar />
        <div>
          <Typography
            fontWeight={700}
            sx={{ fontSize: { lg: "44px", xs: "40px" } }}
            mb="23px"
            mt="30px"
          >
            When your legs get tired <br />
            Run with your heart ...
          </Typography>
          <img
            alt=""
            src={
              "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.mLBkfdLd9gh5HyXyhOW7nwHaE8%26pid%3DApi&f=1"
            }
          />
        </div>
        <div>"Chart my jog is the best jog charter out there!"</div>
        <p>Sign in</p>
        <p>Don't have an account? Sign up</p>
        <Footer />
      </main>
    </div>
  );
};

export default Home;
