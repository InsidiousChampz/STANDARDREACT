/* eslint-disable no-restricted-imports */
import React from "react";
import { Formik, Form, Field } from "formik";
import { Button, LinearProgress, Grid, Select } from "@material-ui/core";
import { TextField } from "formik-material-ui";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

import DayJsUtils from "@date-io/dayjs";
require("dayjs/locale/th");
var dayjs = require("dayjs");
dayjs.locale("th");

function ProductGroupSearch(props) {
  const handleToPopup = () => {
    props.newgroup(true);
  };

  return (
    <Card elevation={3} style={{ marginBottom: 5 }}>
      <CardContent>
        <Typography variant="h6">Search Product Group</Typography>
        <MuiPickersUtilsProvider utils={DayJsUtils}>
          <Formik
            //Form fields and default values
            initialValues={{
              name: "",
              createBy: "",
              status: "",
            }}
            //Validation section
            validate={(values) => {
              const errors = {};
              return errors;
            }}
            //Form Submission
            // ต้องผ่าน Validate ก่อน ถึงจะถูกเรียก
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(false);
              props.submit(values);
            }}
          >
            {/* Render form */}
            {({
              submitForm,
              isSubmitting,
              values,
              errors,
              resetForm,
              setFieldValue,
            }) => (
              <Form>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                  spacing={1}
                >
                  <Grid item xs={4} lg={4}>
                    <Field
                      fullWidth
                      component={TextField}
                      required
                      type="text"
                      label="Name"
                      name="name"
                    ></Field>
                  </Grid>
                  <Grid item xs={4} lg={4}>
                    <Field
                      fullWidth
                      component={TextField}
                      required
                      type="text"
                      label="Create by"
                      name="createBy"
                    ></Field>
                  </Grid>
                  <Grid item xs={4} lg={4}>
                    <InputLabel htmlFor="titleId-simple">Status</InputLabel>
                    <Field
                      fullWidth
                      component={Select}
                      name="status"
                      label="Status"
                      value={values.status}
                      onChange={(e) => {
                        setFieldValue("status", e.target.value);
                      }}
                    >
                      <MenuItem disabled value={""}>
                        Please Select
                      </MenuItem>
                      <MenuItem key={"status1"} value={true}>
                        {"true"}
                      </MenuItem>
                      <MenuItem key={"status2"} value={false}>
                        {"false"}
                      </MenuItem>
                    </Field>
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                  spacing={1}
                >
                  <Grid item xs={4} lg={3}>
                    {isSubmitting && <LinearProgress />}
                    <Button
                      fullWidth
                      variant="contained"
                      color="default"
                      disabled={isSubmitting}
                      onClick={resetForm}
                    >
                      Reset
                    </Button>
                  </Grid>
                  <Grid item xs={4} lg={3}>
                    {isSubmitting && <LinearProgress />}
                    <Button
                      fullWidth
                      variant="contained"
                      color="secondary"
                      disabled={isSubmitting}
                      onClick={submitForm}
                    >
                      Search
                    </Button>
                  </Grid>
                  <Grid item xs={4} lg={3}>
                    {isSubmitting && <LinearProgress />}
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      disabled={isSubmitting}
                      onClick={handleToPopup}
                    >
                      New Product group
                    </Button>
                  </Grid>
                </Grid>
                {/* {JSON.stringify(values)} */}
              </Form>
            )}
          </Formik>
        </MuiPickersUtilsProvider>
      </CardContent>
    </Card>
  );
}

export default ProductGroupSearch;
