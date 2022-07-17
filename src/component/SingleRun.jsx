import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React, { useState } from "react";

const SingleRun = ({ run }) => {
  const startTime = run.startTime.toDate().toString();
  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="dashBoard">
      <Card
        className="card"
        sx={{
          maxWidth: 345,
          backgroundColor: "#e4e0d9",
          boxShadow: "4px 4px 8px 0px rgba(0,0,0,0.2)",
          transition: "0.3s",
          borderRadius: "25px",
        }}
      >
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "black" }} aria-label="recipe">
              C
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={run.name}
          subheader={startTime.slice(0, startTime.indexOf("("))}
        />
        <CardMedia
          component="img"
          height="194"
          image={run.image}
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
            Pace: {run.pace} min/mi
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
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Comments:</Typography>
            <Typography paragraph>{run.comment}</Typography>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
};

export default SingleRun;
