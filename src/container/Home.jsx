import { Typography } from "@mui/material";
import Footer from "../component/Footer";
import RunningPeople from "../Images/runningPeople.jpg";

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
        <div>
          {/* <Typography
            fontWeight={700}
            sx={{ fontSize: { lg: "44px", xs: "40px" } }}
            mb="23px"
            mt="30px"
          >
            When your legs get tired <br />
            Run with your heart ...
          </Typography> */}

          <img
            alt=""
            src={RunningPeople}
            style={{ height: "auto", width: "400px" }}
          />
        </div>

        <Footer />
      </main>
    </div>
  );
};

export default Home;
