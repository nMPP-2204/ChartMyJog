import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import { getUserRuns } from "../utils/firestore";
import { Box, Tabs, Tab } from "@mui/material";
import { TabContext, TabPanel, TabList } from "@mui/lab";

import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
// import { ExpandMore } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';


export const PreviousRuns = () => {
  const [runs, setRuns] = useState([]);
  const [user] = useAuthState(auth);
  const [selectedRun, setSelectedRun] = useState(null);

  useEffect(() => {
    if (user) {
      (async () => {
        setRuns(await getUserRuns(user));
      })();
    }
  }, []);


  if (!runs || !runs.length) {
    return <div>No Runs</div>;
  }
  if (!selectedRun && runs.length > 0) setSelectedRun(runs[0].startTime);
  return (
    !selectedRun || (
      <div>
        <div style={{display: 'flex', justifyContent: 'center'}}>
        <h2>Your last run(s)</h2>
        </div>
        <div>
          {runs.map((run) => (
           <SingleRun key={run.startTime} run={run} />


          ))}
        </div>
      </div>
    )
  );
};

const SingleRun = ({ run }) => {
  console.log('server timestamp: ',run.startTime.toDate())
  const startTime = run.startTime.toDate().toString()


  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="dashBoard">
    <Card className= "card" sx={{ maxWidth: 345,
      backgroundColor: "#e4e0d9",
      boxShadow: "4px 4px 8px 0px rgba(0,0,0,0.2)",
      transition: "0.3s"
      }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'black' }} aria-label="recipe">
            C
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title= {run.name}
        subheader= {startTime.slice(0, startTime.indexOf("("))}
      />
      <CardMedia
        component="img"
        height="194"
        image= {run.image}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Duration: {run.time}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Distance: {run.distance}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Pace: Coming Soon
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse
       in={expanded} timeout="auto" unmountOnExit
      >
        <CardContent>
          <Typography paragraph>Comments:</Typography>
          <Typography paragraph>
            {run.comment}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
    </div>
    // <div className="single-run-history">
    //   <h2>
    //     {run.name}
    //   </h2>
    //   Date: {startTime.slice(0, startTime.indexOf("("))}
    //   <ul>
    //     <li>Time: {run.time}</li>
    //     <li>Distance: {run.distance}</li>
    //     <li>comment: {run.comment}</li>
    //     <img src={run.image} alt="" />
    //   </ul>
    // </div>
  );
};
