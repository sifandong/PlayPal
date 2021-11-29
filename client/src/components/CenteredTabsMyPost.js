import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
// import PostCardMatrix from './PostCardMatrix';
import { Grid } from "@mui/material";
// import { TabPanel } from '@mui/lab';
import PostCard from "./PostCard";
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  gridContainer: { 
    marginTop: "30px", 
    paddingRight: 6,
    paddingLeft: 2,
  },
}));

export default function CenteredTabs() {
  const [value, setValue] = React.useState(0);

  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="Created" />
        <Tab label="Joined" />
        <Tab label="Liked" />
        <Tab label="Following" />
      </Tabs>
      <TabPanel value={value} index={0}>
        Post List 1
        <Grid
            item
            container
            spacing={{ xs: 2 }}
            className={classes.gridContainer}
          >
            {Array.from(Array(6)).map((_, index) => (
              <Grid item xs={6} md={4} key={index}>
                <PostCard />
              </Grid>
            ))}
          </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Post List 2
        <Grid
              item
              container
              spacing={{ xs: 2}}
              className={classes.gridContainer}
            >
              {Array.from(Array(6)).map((_, index) => (
                <Grid item xs={6} md={4} key={index}>
                  <PostCard />
                </Grid>
              ))}
            </Grid>
      </TabPanel>
      <TabPanel value={value} index={2}>
        Liked Posts List
        <Grid
              item
              container
              spacing={{ xs: 2}}
              className={classes.gridContainer}
            >
              {Array.from(Array(6)).map((_, index) => (
                <Grid item xs={6} md={4} key={index}>
                  <PostCard />
                </Grid>
              ))}
            </Grid>
        </TabPanel>
      <TabPanel value={value} index={3}>Following users List</TabPanel>
      
    </Box>
  );
}

function TabPanel(props) {
  const {children,value,index} = props;
  return(
    <div>
      {
        value === index &&(
          <h1>{children}</h1>
        )
      }
    </div>
  )
}