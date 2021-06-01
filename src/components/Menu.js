import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Box, makeStyles } from "@material-ui/core";

/* icons */
import { Home, BusinessCenter, Sms } from "@material-ui/icons";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import Notification from "@material-ui/icons/Notifications";

import { logout, selectUser } from "../features/user/userSlice";
import { auth } from "../firebase";

const Menu = () => {
  const style = useStyles();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const signOut = () => {
    auth.signOut().then(() => {
      dispatch(logout());
    });
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="flex-end" className="header-menu">
      <NavLink to="/" activeClassName="active">
        <Box className={style.menu}>
          <Home className={style.menuIcon} />
          <Box component="span" className={style.menuText}>
            Ana Sayfa
          </Box>
        </Box>
      </NavLink>
      <NavLink to="/mynetwork" activeClassName="active">
        <Box className={style.menu}>
          <PeopleAltIcon className={style.menuIcon} />
          <Box component="span" className={style.menuText}>
            Ağım
          </Box>
        </Box>
      </NavLink>
      <NavLink to="/jobs" activeClassName="active">
        <Box className={style.menu}>
          <BusinessCenter className={style.menuIcon} />
          <Box component="span" className={style.menuText}>
            İş İlanları
          </Box>
        </Box>
      </NavLink>
      <NavLink to="/messaging" activeClassName="active">
        <Box className={style.menu}>
          <Sms className={style.menuIcon} />
          <Box component="span" className={style.menuText}>
            Mesajlaşma
          </Box>
        </Box>
      </NavLink>
      <NavLink to="/notifications" activeClassName="active">
        <Box className={style.menu}>
          <Notification className={style.menuIcon} />
          <Box component="span" className={style.menuText}>
            Bildirimler
          </Box>
        </Box>
      </NavLink>
      <Box ml={2} display="flex" flexDirection="column" alignItems="center">
        <Avatar alt="Recep Üstündağ" src={user.image} className={style.smallProfile} />
        <Box component="span" className={style.menuText} onClick={signOut} style={{ cursor: "pointer" }}>
          Çıkış Yap
        </Box>
      </Box>
    </Box>
  );
};

export default Menu;

const useStyles = makeStyles((theme) => ({
  menu: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    marginRight: 35,
    width: "100%",
  },
  menuText: {
    fontSize: "12px",
    color: "rgba(0,0,0, 0.9)",
    marginTop: 1,
  },
  menuIcon: {
    color: "rgba(0,0,0, 0.6)",
    width: 27,
    height: 27,
  },
  smallProfile: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    marginTop: 5,
    marginBottom: 2,
  },
}));
