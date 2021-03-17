/* eslint-disable no-restricted-imports */
import React, { useState } from "react";
import { useFormik } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import { useSelector, useDispatch } from "react-redux";
import * as ordersRedux from "../_redux/ordersRedux";

import DayJsUtils from "@date-io/dayjs";
//Grid
import Grid from "@material-ui/core/Grid";
import { Button, Card, CardContent } from "@material-ui/core";

require("dayjs/locale/th");
var dayjs = require("dayjs");
dayjs.locale("th");

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    flexGrow: 1,
    padding: 5,
  },
}));

const DATEFORMAT = "DD/MM/YYYY";

function OrderSearch(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const ordersReducer = useSelector(({ orders }) => orders);
  const formik = useFormik({
    enableReinitialize: "true",
    initialValues: {
      dateFrom: ordersReducer.search.dateFrom,
      dateTo: ordersReducer.search.dateTo,
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const handleSearchDate = () => {
    let objSearch = {
      ...ordersReducer.Search,
      dateFrom: formik.values.dateFrom,
      dateTo: formik.values.dateTo,
    };
    dispatch(ordersRedux.actions.SeacrhOrder(objSearch));
    props.setSearch(true);
  };

  const handleSearchFilter = () => {
    let objSearch = {
      ...ordersReducer.Search,
      dateFrom: dayjs(new Date()),
      dateTo: dayjs(new Date()),
    };
    dispatch(ordersRedux.actions.SeacrhOrder(objSearch));
    props.setSearch(false);
  };

  return (
    <Grid container direction="row" justify="flex-start" alignItems="center">
      <Card className={classes.root}>
        <CardContent>
          <Grid item xs={12} lg={12}>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              spacing={1}
            >
              <Grid item xs={12} lg={6}>
                <MuiPickersUtilsProvider utils={DayJsUtils}>
                  <KeyboardDatePicker
                    margin="normal"
                    id="dateFrom"
                    name="dateFrom"
                    label="Date - From"
                    format={DATEFORMAT}
                    value={formik.values.dateFrom}
                    onChange={(e) => {
                      formik.setFieldValue("dateFrom", e);
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item xs={12} lg={6}>
                <MuiPickersUtilsProvider utils={DayJsUtils}>
                  <KeyboardDatePicker
                    margin="normal"
                    id="dateTo"
                    label="Date - To"
                    format={DATEFORMAT}
                    value={formik.values.dateTo}
                    onChange={(e) => {
                      formik.setFieldValue("dateTo", e);
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item xs={12} lg={6}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={handleSearchDate}
                >
                  Search
                </Button>
              </Grid>
              <Grid item xs={12} lg={6}>
                <Button
                  fullWidth
                  variant="contained"
                  color="secondary"
                  onClick={handleSearchFilter}
                >
                  Reset
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default OrderSearch;
