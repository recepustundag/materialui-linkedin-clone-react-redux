import React, { useEffect } from "react";
import { Box, makeStyles } from "@material-ui/core";
import { Search } from "@material-ui/icons";

const useStyles = makeStyles({
  headerSearch: {
    background: "#eef3f8",
    lineHeight: 1.75,
    fontWeight: 400,
    fontSize: "14px",
    height: "34px",
    border: "1px solid #e1e9ee",
    borderRadius: "0.4rem",
    padding: "0 8px 0 40px",
    width: '175px',
  },
});

const HeaderSearch = () => {
  const style = useStyles();

  useEffect(() => {

    document.getElementById('header-search').addEventListener('focus', function(){
      this.classList.add('active');
    });
    
    document.getElementById('header-search').addEventListener('focusout', function(){
      this.classList.remove('active');
    });

  }, [])

  
  return (
    <Box position="relative" ml={2}>
      <Box component="span" position="absolute" left={7} top={7}>
        <Search />
      </Box>
      <input type="text" placeholder="Arama Yap" id="header-search" className={style.headerSearch} />
    </Box>
  );
};

export default HeaderSearch;
