import React, { useState } from "react";
import { Avatar, Box, Fade, makeStyles, Modal, Backdrop, Container, IconButton, Button, LinearProgress } from "@material-ui/core";
import { ChatBubbleOutline, Close, DateRange, Panorama, VerticalSplit, YouTube } from "@material-ui/icons";

import { blue, green, grey, orange, red } from "@material-ui/core/colors";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../features/user/userSlice";
import { useForm } from "react-hook-form";
import firebase from "firebase";
import db, { storage } from "../firebase";
import { updatePosts } from "../features/posts/postsSlice";

const ShareFeed = () => {
  const { register, handleSubmit } = useForm();
  const style = useStyles();
  const user = useSelector(selectUser);
  const [open, setOpen] = useState(false);
  const [shareImage, setShareImage] = useState("");
  const [progressStatus, setProgressStatus] = useState(0);
  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const browseFileDialog = () => {
    document.getElementById("file").click();
  };

  const handeleFileChange = (e) => {
    const image = e.target.files[0];
    if (image === "" && image === undefined) {
      return;
    }

    setShareImage(image);
  };

  const reset = () => {
    setProgressStatus(0);
    setShareImage('');
    document.getElementById('articlePost').value = '';
    setOpen(false);
  }

  const onSubmit = (data) => {
    const upload = storage.ref(`/posts/${shareImage.name}`).put(shareImage);

    upload.on(
      "state_changed",
      (snapshot) => {
        setProgressStatus(1);
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgressStatus(progress);
      },
      (error) => console.log(error.code),
      async () => {
        const downloadURL = await upload.snapshot.ref.getDownloadURL();
        db.collection("posts").add({
          actor: {
            name: user.name,
            email: user.email,
            image: user.image,
          },
          description: data.message,
          liked: 0,
          shareImage: downloadURL,
          timestamp: firebase.firestore.Timestamp.now(),
        })
        reset();
      }
    );
  };

  return (
    <Box className={style.widget}>
      <Box display="flex" alignItems="center">
        <Avatar alt="Recep Üstündağ" src={user.image} />
        <button onClick={handleOpen} className={style.buttonModal}>
          Bir Gönderi Paylaş
        </button>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={style.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Container maxWidth="sm">
              <div className={style.modalContainer}>
                <Box display="flex" alignItems="center" justifyContent="space-between" fontSize={22}>
                  Gönderi oluşturun
                  <button variant="contained" className={style.closeButton} onClick={handleClose}>
                    <Close />
                  </button>
                </Box>
                <Box display="flex" alignItems="center" mt={3}>
                  <Avatar alt="Recep Üstündağ" src={user.image} />
                  <Box ml={2}>Recep Üstündağ</Box>
                </Box>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Box mt={3}>
                    <textarea id="articlePost" rows="5" {...register("message", { required: true })} placeholder="Ne hakkında konuşmak istiyorsunuz?" className={style.textarea}></textarea>
                  </Box>
                  {shareImage && <img width="300" src={URL.createObjectURL(shareImage)} />}
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Box borderRight="2px solid rgba(0,0,0, 0.2)">
                      <input type="file" id="file" style={{ display: "none" }} onChange={handeleFileChange} />
                      <IconButton onClick={browseFileDialog}>
                        <Panorama />
                      </IconButton>
                      <IconButton ml={2}>
                        <YouTube />
                      </IconButton>
                    </Box>
                    <Box display="flex" alignItems="center" justifyContent="space-between" flex={1} padding="0 15px">
                      <Button variant="contained" className={style.commentButton} startIcon={<ChatBubbleOutline />}>
                        Herkez
                      </Button>
                      <Button type="submit" variant="contained" className={style.postButton}>
                        Paylaş
                      </Button>
                    </Box>
                  </Box>
                </form>
                {progressStatus > 0 && (
                  <Box height={5}>
                    <LinearProgress variant="determinate" value={progressStatus} />
                  </Box>
                )}
              </div>
            </Container>
          </Fade>
        </Modal>
      </Box>
      <Box mt={3} display="flex" alignItems="center" justifyContent="space-between">
        <Button className={style.postWidgetButton}>
          <Panorama style={{ color: blue[300], fontSize: 24 }} />
          Fotoğraf
        </Button>
        <Button className={style.postWidgetButton}>
          <YouTube style={{ color: green[300], fontSize: 30 }} />
          Video
        </Button>
        <Button className={style.postWidgetButton}>
          <DateRange style={{ color: orange[300] }} />
          Etkinlik
        </Button>
        <Button className={style.postWidgetButton}>
          <VerticalSplit style={{ color: red[300], fontSize: 28 }} />
          Yazı Yaz
        </Button>
      </Box>
    </Box>
  );
};

export default ShareFeed;

const useStyles = makeStyles((theme) => ({
  widget: {
    background: "#FFF",
    border: "1px solid rgba(0,0,0, 0.12)",
    borderRadius: 8,
    padding: 12,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainer: {
    backgroundColor: theme.palette.background.paper,
    border: "1px solid rgba(0,0,0, 0.12)",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: 8,
  },
  closeButton: {
    background: "transparent",
    border: "none",
    color: grey[500],
    marginTop: 4,
    cursor: "pointer",
  },
  textarea: {
    border: "0",
    resize: "none",
    width: "100%",
    fontSize: 16,
  },
  postButton: {
    borderRadius: 99,
    background: grey[200],
    padding: "5px 25px",
    border: "none",
    color: grey[500],
    boxShadow: "none",
    textTransform: "capitalize",
  },
  commentButton: {
    background: "transparent",
    boxShadow: "none",
    border: 0,
    fontSize: 12,
  },
  buttonModal: {
    width: "100%",
    borderRadius: 99,
    border: "1px solid rgba(0,0,0, 0.12)",
    padding: "12px 15px",
    margin: "0 8px",
    textAlign: "left",
    cursor: "pointer",
    background: "#FFF",
    "&:hover": {
      background: grey[200],
    },
  },
  postWidgetButton: {
    border: "0",
    background: "transparent",
    display: "flex",
    alignItems: "center",
    color: grey[600],
    textTransform: "capitalize",
    fontSize: 14,
    "& svg": {
      marginRight: 2,
    },
  },
}));
