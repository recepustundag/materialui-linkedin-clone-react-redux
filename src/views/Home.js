import React, { useEffect, useState } from "react";
import { Box, Container, Grid, makeStyles } from "@material-ui/core";

import Header from "../components/Header";
import ProfileWidget from "../components/ProfileWidget";
import Hastags from "../components/Hastags";
import ShareFeed from "../components/ShareFeed";
import Post from "../components/Post";
import { useDispatch, useSelector } from "react-redux";
import { posts, getPosts } from "../features/posts/postsSlice";
import db from "../firebase";

const useStyles = makeStyles((theme) => ({
  container: {
    [theme.breakpoints.down('sm')]: {
      padding: 0
    },
  },
}));


const Home = () => {
  const style = useStyles();
  const dispatch = useDispatch();
  // const [ article, setArticle ] = useState([]);

  useEffect(() => {
    db.collection('posts').orderBy('timestamp', 'asc')
    .onSnapshot((snapshot) => {

      
      snapshot.docs.map((doc) => (
        dispatch(getPosts({
          id: doc.id,
          data: doc.data(),
        }))
      ));

      /* setArticle(
        snapshot.docs.map((doc) => ({
          id:doc.id,
          data: doc.data(),
        }))
      ) */

    })
  }, []);

  const article = useSelector(posts);

  return (
    <>
      <Header />
      <Container className={style.container}>
        <Box pt={6}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={3} lg={3}>
              <Box mx={2}>
                <ProfileWidget />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} lg={6}>
              <Box>
                <ShareFeed />
              </Box>
              <Box mt={6}>
                {Object.values(article).map(({id, data}) => (
                    <Post key={id} id={id} posts={data}/>
                ))}
              </Box>
            </Grid>
            <Grid item xs={12} sm={3} lg={3}>
              <Hastags/>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default Home;
