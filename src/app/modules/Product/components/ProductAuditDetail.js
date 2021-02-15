/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-imports */
import React from "react";
import { useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import DropDownProductGroupToProduct from "../../_FormikDemo/components/DropDownProductGroupToProduct";
import DropdownAuditType from "../../_FormikDemo/components/DropdownAuditType";
import TextAuditAmount from "../../_FormikDemo/components/TextAuditAmount";
import AddButton from "../../Common/components/Buttons/AddButton";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
import * as swal from "../../Common/components/SweetAlert";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import * as ProductAuditAxios from "../_redux/productAuditAxios";
import * as ProductAxios from "../_redux/productAxios";

function ProductAuditDetail(props) {
  let history = useHistory();
  const ProductAuditReducer = useSelector(({ productAudit }) => productAudit);

  const handleUpdateProduct = (values) => {
    ProductAxios.getProduct(values.productId).then((res) => {
      if (res.data.isSuccess) {
        let objLoad = {
          name: res.data.data.name,
          price: res.data.data.price,
          stockCount: values.auditTotalAmount,
          productGroupId: values.productGroupId,
        };

        ProductAxios.editProduct(objLoad, values.productId)
          .then((res) => {
            // It's Ok
          })
          .catch((err) => {
            swal.swalError(
              "Update Product",
              "พบความผิดพลาดในการปรับปรุงจำนวนสินค้า กรุณาทำใจ"
            );
          });
      }
    });
  };
  const handleResetForm = (values) => {
    values = {
      ...ProductAuditReducer.AuditStoreValues,
    };
  };
  const handleBackToAuditPage = () => {
    history.push("/productaudit");
  };
  const handleCalculateStock = (values) => {
    let contype = values.productAuditTypeId;
    var sumValue = 0;
    if (contype === 1) {
      sumValue =
        parseInt(values.Quantity_stockCount) + parseInt(values.AuditAmount);
    } else if (contype === 2) {
      if (
        parseInt(values.Quantity_stockCount) >= parseInt(values.AuditAmount)
      ) {
        sumValue =
          parseInt(values.Quantity_stockCount) - parseInt(values.AuditAmount);
      } else {
        swal.swalError(
          "ปรับสินค้า",
          "ไม่สามารถปรับสินค้าให้เกินกว่าสินค้าที่อยู่ในคลัง"
        );
      }
    }

    values.AuditTotalAmount = sumValue;
  };

  return (
    <Card elevation={3} style={{ marginBottom: 5 }}>
      <CardContent>
        <Typography variant="h6">Audit Product</Typography>
      </CardContent>
      <CardContent>
        <Formik
          enableReinitialize
          //Form fields and default values
          initialValues={{
            ProductAudit_productGroupId: 0,
            ProductAudit_productId: 0,
            productAuditTypeId: 0,
            AuditAmount: 0,
            Quantity_stockCount: 0,
            AuditTotalAmount: 0,
            Remark: "",
            name: "",
            id: 0,
          }}
          //Validation section
          validate={(values) => {
            const errors = {};
            return errors;
          }}
          //Form Submission
          onSubmit={(values, { setSubmitting }) => {
            swal
              .swalConfirm(
                "Confirm Audit?",
                "ต้องการที่จะปรับจำนวนสินค้าหรือไม่?"
              )
              .then((res) => {
                if (res.isConfirmed) {
                  let NameAudit = "";

                  if ((values.productAuditTypeId = 1)) {
                    NameAudit = "Increase Stock";
                  } else {
                    NameAudit = "Decrease Stock";
                  }

                  setSubmitting(false);
                  // clone & update value
                  let objPayload = {
                    ...ProductAuditReducer.AuditStoreValues,
                    productGroupId: parseInt(
                      values.ProductAudit_productGroupId
                    ),
                    productId: parseInt(values.ProductAudit_productId),
                    productAuditTypeId: parseInt(values.productAuditTypeId),
                    auditAmount: parseInt(values.AuditAmount),
                    stockCount: parseInt(values.Quantity_stockCount),
                    auditTotalAmount: parseInt(values.AuditTotalAmount),
                    remark: values.Remark,
                    name: NameAudit,
                  };

                  ProductAuditAxios.addAuditProduct(objPayload)
                    .then((res) => {
                      if (res.data.isSuccess) {
                        swal.swalSuccess("Audit Product Completed").then(() => {
                          //update StockCount into Product
                          handleUpdateProduct(objPayload);
                          // Clear Controls
                          handleResetForm(values);
                          // Go to audit page
                          handleBackToAuditPage();
                        });
                      } else {
                        swal.swalError("Error", res.data.message);
                      }
                    })
                    .catch((err) => {
                      swal.swalError("Error", err.message);
                    });
                }
              });
          }}
        >
          {({ submitForm, isSubmitting, values, errors, setFieldValue }) => (
            <Form>
              <Card elevation={3} style={{ marginBottom: 5 }}>
                <CardContent>
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    spacing={2}
                  >
                    <Grid item xs={12} lg={6}>
                      <DropDownProductGroupToProduct
                        name="ProductAudit"
                        value={values}
                        setFieldValue={setFieldValue}
                      ></DropDownProductGroupToProduct>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    spacing={2}
                  >
                    <Grid item xs={12} lg={3}>
                      <DropdownAuditType
                        name="productAuditTypeId"
                        value={values}
                        setFieldValue={setFieldValue}
                      ></DropdownAuditType>
                    </Grid>
                    <Grid item xs={12} lg={3}>
                      <Field
                        fullWidth
                        component={TextField}
                        type="text"
                        label="จำนวนที่ต้องการปรับ"
                        name="AuditAmount"
                        onBlur={handleCalculateStock(values)}
                        onChange={(e) => {
                          setFieldValue("AuditAmount", e.target.value);
                        }}
                      ></Field>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    spacing={2}
                  >
                    <Grid item xs={12} lg={3}>
                      <TextAuditAmount
                        disabled
                        fullWidth
                        label="จำนวนคงเหลือก่อนปรับ"
                        name="Quantity"
                        productId={values.ProductAudit_productId}
                        value={values.Quantity_stockCount}
                        setFieldvalue={setFieldValue}
                      ></TextAuditAmount>
                    </Grid>
                    <Grid item xs={12} lg={3}>
                      <Field
                        disabled
                        fullWidth
                        component={TextField}
                        type="text"
                        label="จำนวนคงเหลือ"
                        name="AuditTotalAmount"
                        value={values.AuditTotalAmount}
                        //setFieldValue={setFieldValue}
                      ></Field>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    spacing={2}
                  >
                    <Grid item xs={12} lg={6}>
                      <Field
                        fullWidth
                        component={TextField}
                        type="text"
                        label="สาเหตุ"
                        name="Remark"
                        multiline
                        value={values.Remark}
                        setFieldValue={setFieldValue}
                      ></Field>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    spacing={2}
                  >
                    <Grid item xs={12} lg={3}>
                      <AddButton fullWidth onClick={submitForm}>
                        Adjust Stock
                      </AddButton>
                    </Grid>
                    <Grid item xs={12} lg={3}>
                      <Button
                        fullWidth
                        component={Link}
                        to="/productaudit"
                        color="secondary"
                        variant="outlined"
                      >
                        Cancel
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
              <br></br>
              {/* {JSON.stringify(values)} */}
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
}

export default ProductAuditDetail;
