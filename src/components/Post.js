import React from "react";
import { Avatar, Box, Button, CardMedia, makeStyles } from "@material-ui/core";

import profile from "../assets/profile.jpg";
import { blue, grey } from "@material-ui/core/colors";
import { Send, Share, Textsms, ThumbUp } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  widget: {
    backgroundColor: theme.palette.background.paper,
    border: "1px solid rgba(0,0,0, 0.12)",
    padding: theme.spacing(2, 2, 3),
    borderRadius: 8,
  },
  image: {
    width: "100%",
  },
  actionButtons: {
    background: "#FFF",
    border: 0,
    boxShadow: "none",
    color: grey[500],
    textTransform: "capitalize",
    "&:hover": {
      background: grey[200],
      boxShadow: "none",
    },
  },
  actionColumn: {
    display: "flex",
    alignItems: "center",
    fontSize: 12,
    lineHeight: "3px",
    "& svg": {
      fontSize: "9px",
      background: blue[600],
      color: "white",
      padding: "2px",
      borderRadius: "99px",
      marginRight: "2px",
    },
  },
}));

const Post = ({ posts }) => {
  const style = useStyles();
  return (
    <Box className={style.widget} mb={3}>
      <Box display="flex" alignItems="start">
        <Box mr={2}>
          <Avatar alt={posts.actor.name} src={posts.actor.image} />
        </Box>
        <Box display="flex" flexDirection="column">
          <Box component="span" fontSize={14} fontWeight="600">
            {posts.actor.name}
          </Box>
          <Box component="span" fontSize={12} color={grey[500]}>
            {posts.actor.email}
          </Box>
          <Box component="span" fontSize={12} color={grey[500]}>
            { posts.timestamp.toDate().toLocaleDateString()}
          </Box>
        </Box>
      </Box>
      <Box mt={3} fontSize={14} lineHeight={1.6}>
        {posts.description}
      </Box>
      <Box mt={3}>
        <img src={posts.shareImage} className={style.image}/>
      </Box>
      <Box mt={3} className={style.actionColumn}>
        <Box>
          <ThumbUp />
        </Box>
        <Box>{posts.liked}</Box>
      </Box>
      <Box mt={1}>
        <Button variant="contained" className={style.actionButtons} startIcon={<ThumbUp />}>
          Beğen
        </Button>
        <Button variant="contained" className={style.actionButtons} startIcon={<Textsms />}>
          Yorum Yap
        </Button>
        <Button variant="contained" className={style.actionButtons} startIcon={<Share />}>
          Paylaş
        </Button>
        <Button variant="contained" className={style.actionButtons} startIcon={<Send />}>
          Gönder
        </Button>
      </Box>
    </Box>
  );
};

export default Post;
