/* eslint-disable no-restricted-imports */
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: "2", //theme.spacing(1),
      width: "100%", //theme.spacing(16),
      height: "75vh", //theme.spacing(16),
    },
  },
}));

function DashboardPage() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Paper elevation={3}></Paper>
    </div>
  );
}

export default DashboardPage;
