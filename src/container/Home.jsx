import { Typography } from "@mui/material";
import Footer from "../component/Footer";
// import RunningPeople from "../Images/runningPeople.jpg";
import RunningWoman from "../Images/runningwoman.jpg";
import Carousel from "../component/Carousel";
import SignUpLogin from "./SignUpLogin";

const Home = () => {
  return (
    <div className="Home">
      <header>
        {" "}
        <div className="pageHeader">
          <Typography fontFamily="helvetica" fontSize="30px">
            Chart My Jog
          </Typography>
        </div>
      </header>
      <main>
        <div style={{display: "flex", justifyContent: "center", }}>
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
       <SignUpLogin />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
