import React from "react";
import { Avatar, Box, Button, List, ListItem, ListItemAvatar, ListItemText, makeStyles } from "@material-ui/core";
import { Info, PlusOne } from "@material-ui/icons";
import { grey } from "@material-ui/core/colors";

import profile from "../assets/profile.jpg";

const useStyles = makeStyles((theme) => ({
  widget: {
    background: "#FFF",
    border: "1px solid rgba(0,0,0, 0.12)",
    borderRadius: 8,
    padding: 12,
  },
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  followButton: {
    borderRadius: 99,
    boxShadow: "inset 0 0 0 1px rgba(0,0,0, 0.6)",
    background: "#FFF",
    padding: "4px 15px",
  },
}));

const Hastags = () => {
  const style = useStyles();
  return (
    <Box className={style.widget}>
      <Box component="h3" display="flex" alignItems="center" justifyContent="space-between" fontSize={16} m={0}>
        Akışınıza ekleyin
        <Info style={{ color: grey[500] }} fontSize="small" />
      </Box>
      <Box>
        <List className={style.root}>
          <ListItem>
            <ListItemAvatar>
              <Avatar alt="Recep Üstündağ" src={profile} className={style.profileImage} />
            </ListItemAvatar>
            <ListItemText primary="Reactjs" secondary="Front End" />
          </ListItem>
          <Box ml={7}>
            <Button variant="contained" className={style.followButton} startIcon={<PlusOne />}>
              Takip Et
            </Button>
          </Box>
          <ListItem>
            <ListItemAvatar>
              <Avatar alt="Recep Üstündağ" src={profile} className={style.profileImage} />
            </ListItemAvatar>
            <ListItemText primary="Vuejs" secondary="Front End" />
          </ListItem>
          <Box ml={7}>
            <Button variant="contained" className={style.followButton} startIcon={<PlusOne />}>
              Takip Et
            </Button>
          </Box>
          <ListItem>
            <ListItemAvatar>
              <Avatar alt="Recep Üstündağ" src={profile} className={style.profileImage} />
            </ListItemAvatar>
            <ListItemText primary="Angularjs" secondary="Front End" />
          </ListItem>
          <Box ml={7}>
            <Button variant="contained" className={style.followButton} startIcon={<PlusOne />}>
              Takip Et
            </Button>
          </Box>
        </List>
      </Box>
    </Box>
  );
};

export default Hastags;
