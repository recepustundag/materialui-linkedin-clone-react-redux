import React, { useState } from "react";
import { useDispatch } from "react-redux";
import firebase from 'firebase';
import { Avatar, Box, Button, IconButton, makeStyles, Slide, Snackbar } from "@material-ui/core";

import { blue, grey, red } from "@material-ui/core/colors";
import { Send, Share, Textsms, ThumbUp, Delete } from "@material-ui/icons";
import { updatePost,deletePost } from "../features/posts/postsSlice";
import db from "../firebase";

function TransitionLeft(props) {
  return <Slide {...props} direction="left" />;
}

const Post = ({ id, posts }) => {
  const style = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [transition, setTransition] = useState(undefined);

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    dispatch(deletePost(id));
    db.collection("posts")
      .doc(id)
      .delete()
      .then(() => {
        setOpen(true);
        setTransition(() => TransitionLeft);
        setTimeout(() => {
          setOpen(false);
        }, 3000);
      });
  };

  const handleLike = () => {
    dispatch(updatePost(id));
    db.collection("posts").doc(id).set({
      actor: posts.actor,
      description: posts.description,
      shareImage: posts.shareImage,
      timestamp: firebase.firestore.Timestamp.now(),
      liked: posts.liked + 1,
    })
  };

  return (
    <Box className={style.widget} mb={3}>
      <Snackbar open={open} onClose={handleClose} TransitionComponent={transition} message="Gönderi silindi.." key={transition ? transition.name : ""} />
      <Box display="flex" alignItems="start" position="relative">
        <Box position="absolute" right={0} top={0}>
          <IconButton aria-label="delete" style={{color: red[300]}} onClick={deletePost}>
            <Delete />
          </IconButton>
        </Box>
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
            {posts.timestamp.toDate().toLocaleDateString()}
          </Box>
        </Box>
      </Box>
      <Box mt={3} fontSize={14} lineHeight={1.6}>
        {posts.description}
      </Box>
      <Box mt={3}>
        <img src={posts.shareImage} className={style.image} />
      </Box>
      <Box mt={3} className={style.actionColumn}>
        <Box>
          <ThumbUp />
        </Box>
        <Box>{posts.liked}</Box>
      </Box>
      <Box mt={1}>
        <Button onClick={handleLike} variant="contained" className={style.actionButtons} startIcon={<ThumbUp />}>
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

export default Post;
