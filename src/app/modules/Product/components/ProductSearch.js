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
//import * as productRedux from "../_redux/productRedux";
//import DayJsUtils from "@date-io/dayjs";

require("dayjs/locale/th");
var dayjs = require("dayjs");
dayjs.locale("th");

function ProductSearch(props) {
  //const dispatch = useDispatch();
  const ProductReducer = useSelector(({ product }) => product);

  const handleToPopup = () => {
    props.newproduct(true);
  };

  return (
    <Card elevation={3} style={{ marginBottom: 5 }}>
      <CardContent>
        <Typography variant="h6">Search Product </Typography>
        <Formik
          //Form fields and default values
          initialValues={{
            id: ProductReducer.ProductUpdateValues.id,
            name: ProductReducer.ProductUpdateValues.name,
            price: ProductReducer.ProductUpdateValues.price,
            stockCount: ProductReducer.ProductUpdateValues.stockCount,
            createBy: ProductReducer.ProductUpdateValues.createBy,
            createDate: ProductReducer.ProductUpdateValues.createDate,
            status: ProductReducer.ProductUpdateValues.status,
            productGroupId: ProductReducer.ProductUpdateValues.productGroupId,
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
          {({ submitForm, isSubmitting, resetForm }) => (
            <Form>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={1}
              >
                <Grid item xs={3} lg={3}>
                  <Field
                    fullWidth
                    component={TextField}
                    required
                    type="text"
                    label="Name"
                    name="name"
                  />
                </Grid>
                <Grid item xs={3} lg={3}>
                  <Field
                    fullWidth
                    component={TextField}
                    required
                    type="text"
                    label="Price"
                    name="price"
                  />
                </Grid>
                <Grid item xs={3} lg={3}>
                  <Field
                    fullWidth
                    component={TextField}
                    required
                    type="text"
                    label="StockCount"
                    name="stockCount"
                  />
                </Grid>
                <Grid item xs={3} lg={3}>
                  <DropdownProductGroupId
                    fullWidth
                    name="productGroupId"
                    label="Product Groups"
                  ></DropdownProductGroupId>
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
                    New Product
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

export default ProductSearch;
