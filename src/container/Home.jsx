import { Typography } from "@mui/material";
import Footer from "../component/Footer";
// import RunningPeople from "../Images/runningPeople.jpg";
import RunningWoman from "../Images/runningwoman.jpg";
import Carousel from "../component/Carousel";

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
        <Carousel />
        {/* <div> */}
        {/* <Typography
            fontWeight={700}
            sx={{ fontSize: { lg: "44px", xs: "40px" } }}
            mb="23px"
            mt="30px"
          >
            When your legs get tired <br />
            Run with your heart ...
          </Typography> */}
        {/*
          <img
            alt=""
            src={RunningWoman}
            style={{ height: "auto", width: "400px" }}
          />
        // </div> */}
      </main>
      <Footer />
    </div>
  );
};

export default Home;
