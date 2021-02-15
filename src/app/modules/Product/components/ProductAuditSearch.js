/* eslint-disable no-restricted-imports */
import React from "react";
import { useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import { Button, LinearProgress, Grid } from "@material-ui/core";
import { TextField } from "formik-material-ui";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import DropdownProductGroupId from "../../_FormikDemo/components/DropdownProductGroupId";

require("dayjs/locale/th");
var dayjs = require("dayjs");
dayjs.locale("th");

function ProductAuditSearch(props) {
  //const dispatch = useDispatch();
  const ProductAuditReducer = useSelector(({ productAudit }) => productAudit);

  return (
    <Card elevation={3} style={{ marginBottom: 5 }}>
      <CardContent>
        <Typography variant="h6">Search Audit Product </Typography>
        <Formik
          //Initial Section
          initialValues={{
            name: ProductAuditReducer.AuditStoreValues.name,
            remark: ProductAuditReducer.AuditStoreValues.remark,
            createBy: ProductAuditReducer.AuditStoreValues.createBy,
            productGroupId: ProductAuditReducer.AuditStoreValues.productGroupId,
          }}
          //Validation section
          validate={(values) => {
            const errors = {};
            return errors;
          }}
          //Submit Section
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false);
            props.searchData(values);
          }}
        >
          {/* Render form */}
          {({ submitForm, isSubmitting, resetForm }) => (
            <Form>
              {/* 1 */}
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={1}
              >
                <Grid item xs={12} lg={6}>
                  <Field
                    fullWidth
                    component={TextField}
                    required
                    type="text"
                    label="Name"
                    name="name"
                  ></Field>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <Field
                    fullWidth
                    component={TextField}
                    required
                    type="text"
                    label="Remark"
                    name="remark"
                  />
                </Grid>
              </Grid>
              {/* 2 */}
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={1}
              >
                <Grid item xs={12} lg={6}>
                  <Field
                    fullWidth
                    component={TextField}
                    required
                    type="text"
                    label="Create By"
                    name="createBy"
                  ></Field>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <DropdownProductGroupId
                    fullWidth
                    name="productGroupId"
                    label="Product Groups"
                  ></DropdownProductGroupId>
                </Grid>
              </Grid>
              {/* 3 */}
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={1}
              >
                <Grid item xs={12} lg={6}>
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
                <Grid item xs={12} lg={6}>
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
              </Grid>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
}

export default ProductAuditSearch;
