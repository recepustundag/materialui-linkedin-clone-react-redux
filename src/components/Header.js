import React from "react";
import { Link } from "react-router-dom";
import { Box, Container, Grid, makeStyles } from "@material-ui/core";
import { LinkedIn } from "@material-ui/icons";
import { blue } from "@material-ui/core/colors";

import Menu from "./Menu";
import HeaderSearch from "./HeaderSearch";

const useStyles = makeStyles({
  header: {
    borderBottom: "1px solid rgba(0,0,0, 0.08)",
  },
  logo: {
    color: blue[800],
    width: "45px",
    height: "45px",
  },
});

const Header = () => {
  const style = useStyles();
  return (
    <Box className={style.header} bgcolor="white">
      <Container>
        <Grid container>
          <Grid item xs={4}>
            <Box display="flex" alignItems="center" height="100%">
              <Link to="/">
                <LinkedIn className={style.logo} />
              </Link>
              <HeaderSearch />
            </Box>
          </Grid>
          <Grid item xs={8}>
            <Menu />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Header;
