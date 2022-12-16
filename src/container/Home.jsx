import { Typography } from "@mui/material";
import Footer from "../component/Footer";
// import RunningPeople from "../Images/runningPeople.jpg";
import RunningWoman from "../Images/runningwoman.jpg";
import Carousel from "../component/Carousel";
import SignUpLogin from "./SignUpLogin";
import Background from "../Images/Background.gif";

const Home = () => {
  return (
    <div className="Home">
      <header></header>
      <main>
        <div style={{ backgroundImage: `url(${Background})` }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Typography
              fontWeight={700}
              sx={{ fontSize: { lg: "34px", xs: "30px" } }}
              mb="23px"
              mt="30px"
            >
              When your legs get tired <br />
              Run with your heart ...
            </Typography>
          </div>
          <Carousel />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
