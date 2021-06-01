import React from "react";
import { Link } from "react-router-dom";
import { Avatar, Box, makeStyles } from "@material-ui/core";

import { grey } from "@material-ui/core/colors";
import { Bookmark } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { selectUser } from "../features/user/userSlice";

const useStyles = makeStyles((theme) => ({
  profileImage: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    border: "3px solid #FFF",
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: 12,
    color: 'rgba(0,0,0, 0.6)'
  }
}));

const ProfileWidget = () => {
  const style = useStyles();
  const user = useSelector(selectUser);
  return (
    <Box borderRadius={8} overflow="hidden" bgcolor="white" border="1px solid rgba(0,0,0, 0.09)">
      <Box height={54}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 512" id="person-default" data-supported-dps="2048x512">
          <path fill="none" d="M0 0h2048v512H0z" />
          <path fill="#dbe7e9" d="M0 0h2048v512H0z" />
          <path fill="#bfd3d6" d="M1408 0h640v512h-640z" />
          <path d="M1236.29 0H0v512h1236.29a771.52 771.52 0 000-512z" fill="#a0b4b7" />
        </svg>
      </Box>
      <Box display="flex" justifyContent="center" mt={-2}>
        <Avatar alt="Recep Üstündağ" src={user.image} className={style.profileImage} />
      </Box>
      <Box py={2} borderBottom="1px solid rgba(0,0,0, 0.08)" mb={2}>
        <Box component="div" fontWeight="500" fontSize={16} textAlign="center" px={5}>
          {user.name}
        </Box>
        <Box component="div" fontWeight="300" fontSize={13} color={grey[700]} textAlign="center" px={5} pt={1}>
          {user.email}
        </Box>
      </Box>
      <Box>
        <Box px={2} className={style.link}>
          <Link to="/">Profilinizi kimler görüntüledi</Link>
          <Box component="span">15</Box>
        </Box>
        <Box py={1} borderBottom="1px solid rgba(0,0,0, 0.08)" mb={2} px={2} className={style.link}>
          <Link to="/">İletişim ağınızı büyütün</Link>
          <Box component="span">15</Box>
        </Box>
        <Box>
          <Link to="/">
            <Box display="flex" alignItems="center" pb={2} pl={2} color={grey[700]}>
              <Bookmark fontSize="small" />
              <Box fontSize={12} fontWeight="bold">Öğelerim</Box>
            </Box>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileWidget;
