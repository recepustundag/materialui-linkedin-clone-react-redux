import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { auth, provider } from '../firebase'

import { Box, Button, Container, Grid, makeStyles } from "@material-ui/core";
import { blue, grey} from "@material-ui/core/colors";

import Logo from "../components/Logo";
import LoginHeroBg from "../assets/loginherobg.svg";
import iconGoogle from "../assets/google.png";
import { login } from "../features/user/userSlice";

const Login = () => {
  const style = useStyles();
  const dispatch = useDispatch();

  const singIn = () => {
    auth.signInWithPopup(provider).then(({user}) => {
      dispatch(
        login({
          name: user.displayName,
          email: user.email,
          image: user.photoURL,
        })
      )
    })
  }

  return (
    <Container>
      <Box component="header" py={2} display="flex" alignItems="center" justifyContent="space-between">
        <Box width={120}>
          <Link to="/" style={{ color: blue[700] }}>
            <Logo />
          </Link>
        </Box>
        <Box>
          <a href="/" className={style.registerButton}>
            Kayıt Ol
          </a>
          <Button className={style.loginButton}>Giriş Yap</Button>
        </Box>
      </Box>
      <Box mt={10}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Box className={style.heroTitle}>Profesyonel topluluğunuza hoş geldiniz!</Box>
            <Box mt={3}>
              <Button className={style.buttonGoogleSignin} onClick={singIn}>
                <img src={iconGoogle} width="20" alt="Google login" />
                <Box component="span" ml={1}>Google İle Giriş Yap</Box>
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <img src={LoginHeroBg} style={{width: '100%'}} alt="hero" />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Login;

const useStyles = makeStyles((theme) => ({
  loginButton: {
    borderWidth: 2,
    borderColor: blue[500],
    borderStyle: "solid",
    padding: theme.spacing(1),
    color: blue[500],
    fontWeight: 600,
    textTransform: "capitalize",
    borderRadius: 99,
    width: 100,
    marginLeft: 30,
  },
  registerButton: {
    color: grey[600],
    fontWeight: 600,
  },
  heroTitle: {
    color: blue[500],
    fontSize: 56
  },
  buttonGoogleSignin: {
    borderWidth: 1,
    borderColor: grey[400],
    borderStyle: 'solid',
    borderRadius: 99,
    width: '100%',
    fontSize: 16,
    textTransform: 'capitalize',
    fontWeight: 500,
    color: grey[500],
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  }
}));