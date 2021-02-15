/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-imports */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import { red, blue, green } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import ProductSearch from "./ProductSearch";
import MUIDataTable from "mui-datatables";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Modal from "@material-ui/core/Modal";
import DeleteButton from "../../Common/components/Buttons/DeleteButton";
import EditButton from "../../Common/components/Buttons/EditButton";
import DropdownProductGroupId from "../../_FormikDemo/components/DropdownProductGroupId";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import InputAdornment from "@material-ui/core/InputAdornment";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import TextField from "@material-ui/core/TextField";
import Switch from "@material-ui/core/Switch";
import * as swal from "../../Common/components/SweetAlert";
import * as ProductAxios from "../_redux/productAxios";
import * as productRedux from "../_redux/productRedux";
import { Paper } from "@material-ui/core";

var flatten = require("flat");
require("dayjs/locale/th");
var dayjs = require("dayjs");
dayjs.locale("th");

function ProductManagement() {
  const dispatch = useDispatch();
  const ProductReducer = useSelector(({ product }) => product);
  //Style//
  const useStyles = makeStyles((theme) => ({
    rootPaper: {
      justifyContent: "center",
      alignItems: "center",
      display: "flex",
      flexWrap: "wrap",
      "& > *": {
        margin: theme.spacing(1),
        width: "90%", //theme.spacing(16),
        height: "auto", //"87vh", //theme.spacing(16),
      },
    },
    tbl: {
      width: 450,
    },
    root: {
      maxWidth: 300,
    },
    media: {
      height: 250, //160,
      paddingTop: "56.25%", // 16:9
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
    avatar: {
      backgroundColor: red[500],
    },

    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      fontFamily: "Verdana",
      fontSize: "10px",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      margin: "auto",
      width: "fit-content",
    },
    formControl: {
      marginTop: theme.spacing(2),
      minWidth: 120,
    },
    formControlLabel: {
      marginTop: theme.spacing(1),
    },
  }));
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);
  const [nonEdit, setNonEdit] = useState(false);
  const [paginated, setPaginated] = useState({
    page: 1,
    recordsPerPage: 5,
    orderingField: "",
    ascendingOrder: true,
    searchValues: {
      name: "",
      price: "",
      stockCount: "",
      productGroupId: "",
    },
  });

  const loadProductData = () => {
    ProductAxios.getProductFilter(
      paginated.page,
      paginated.recordsPerPage,
      paginated.searchValues.name,
      paginated.searchValues.price,
      paginated.searchValues.stockCount,
      paginated.searchValues.productGroupId
    )
      .then((res) => {
        if (res.data.isSuccess) {
          //flatten data
          if (res.data.data.length > 0) {
            let flatData = [];
            res.data.data.forEach((element) => {
              flatData.push(flatten(element));
            });
            setData(flatData);
          } else {
            swal.swalError("Not Found a Results Please Try again.");
          }
          setTotalRecords(res.data.totalAmountRecords);
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const handleToNewproduct = (values) => {
    if (values === true) {
      let objPayload = {
        ...ProductReducer.ProductUpdatevalues,
        id: 0,
        name: "",
        price: "",
        stockCount: "",
        productGroupId: "",
      };

      // save to redux
      dispatch(productRedux.actions.updateProduct(objPayload));
      setNonEdit(false);
      setOpenModal(true);
    }
  };
  const handleSearch = (values) => {
    setPaginated({
      ...paginated,
      page: 1,
      searchValues: values,
    });
  };
  const handleDelete = (id) => {
    swal.swalConfirm("Confirm delete?", `Confirm delete ${id}?`).then((res) => {
      if (res.isConfirmed) {
        //delete
        ProductAxios.deleteProduct(id)
          .then((res) => {
            if (res.data.isSuccess) {
              //reload
              swal.swalSuccess("Success", `Delete ${id} success.`).then(() => {
                loadProductData();
              });
            }
          })
          .catch((err) => {
            //network error
            swal.swalError("Error", err.message);
          });
      }
    });
  };
  const handleEdit = (id) => {
    ProductAxios.getProduct(id)
      .then((res) => {
        //Assign to redux
        let apiData = res.data.data;

        let objPayload = {
          ...ProductReducer.ProductUpdatevalues,
          id: id,
          name: apiData.name,
          price: apiData.price,
          stockCount: apiData.stockCount,
          createBy: apiData.createBy,
          createDate: apiData.createDate,
          status: apiData.status,
          productGroup: apiData.productGroup.name,
          productGroupId: apiData.productGroup.id,
        };

        // save to redux
        dispatch(productRedux.actions.updateProduct(objPayload));

        setNonEdit(true);
      })
      .catch((err) => {
        //Error
      });
  };
  const columns = [
    {
      name: "productGroup.name",
      label: "หมวดหมู่",
      options: {
        textAlign: "center",
      },
    },
    {
      name: "name",
      label: "รายการอาหาร",
      options: {
        textAlign: "center",
      },
    },
    {
      name: "price",
      label: "ราคา",
      options: {
        textAlign: "center",
      },
    },
    {
      name: "stockCount",
      label: "จำนวนคงเหลือในระบบ",
      options: {
        textAlign: "center",
      },
    },
    {
      name: "createBy",
      label: "ผู้นำเข้าระบบ",
      options: {
        textAlign: "center",
      },
    },
    {
      name: "createDate",
      label: "วันที่นำเข้าระบบ",
      options: {
        textAlign: "center",
      },
    },
    {
      name: "status",
      label: "สถานะ",
      options: {
        textAlign: "center",
        customBodyRenderLite: (dataIndex, rowIndex) => {
          if (data[dataIndex].status.toString() === "true") {
            return (
              <Grid
                style={{ padding: 0, margin: 0 }}
                container
                direction="row"
                justify="flex-start"
                alignItems="center"
              >
                <Switch
                  checked={true}
                  name="status"
                  inputProps={{ "aria-label": "secondary checkbox" }}
                />
              </Grid>
            );
          } else {
            return (
              <Grid
                style={{ padding: 0, margin: 0 }}
                container
                direction="row"
                justify="flex-start"
                alignItems="center"
              >
                <Switch
                  checked={false}
                  name="status"
                  inputProps={{ "aria-label": "secondary checkbox" }}
                />
              </Grid>
            );
          }
        },
      },
    },
    {
      name: "Management",
      label: "การจัดการ",
      options: {
        filter: false,
        sort: false,
        empty: true,
        textAlign: "center",
        customBodyRenderLite: (dataIndex, rowIndex) => {
          if (data[dataIndex].status.toString() === "true") {
            return (
              <Grid
                style={{ padding: 0, margin: 0 }}
                container
                direction="row"
                justify="flex-start"
                alignItems="center"
              >
                <EditButton
                  style={{ marginRight: 5 }}
                  onClick={() => {
                    handleEdit(data[dataIndex].id);
                    setOpenModal(true);
                  }}
                >
                  Edit
                </EditButton>
                <DeleteButton
                  onClick={() => {
                    handleDelete(data[dataIndex].id);
                  }}
                >
                  Delete
                </DeleteButton>
              </Grid>
            );
          } else {
            return (
              <Grid
                style={{ padding: 0, margin: 0 }}
                container
                direction="row"
                justify="flex-start"
                alignItems="center"
              >
                <EditButton
                  style={{ marginRight: 5 }}
                  onClick={() => {
                    handleEdit(data[dataIndex].id);
                    setOpenModal(true);
                  }}
                >
                  Edit
                </EditButton>
                <DeleteButton
                  disabled={true}
                  onClick={() => {
                    handleDelete(data[dataIndex].id);
                  }}
                >
                  Delete
                </DeleteButton>
              </Grid>
            );
          }
        },
      },
    },
  ];
  const options = {
    filterType: "checkbox",
    print: false,
    download: false,
    filter: true,
    search: false,
    selectableRows: "single",
    serverSide: true,
    count: totalRecords,
    page: paginated.page - 1,
    rowsPerPage: paginated.recordsPerPage,
    rowsPerPageOptions: [5, 10, 15, 20, 100],
    onTableChange: (action, tableState) => {
      switch (action) {
        case "sort":
          setPaginated({
            ...paginated,
            orderingField: `${tableState.sortOrder.name}`,
            ascendingOrder:
              tableState.sortOrder.direction === "asc" ? true : false,
          });
          break;
        default:
      }
    },
    onChangePage: (action) => {
      setPaginated({ ...paginated, page: action + 1 });
    },
    onChangeRowsPerPage: (action) => {
      //SetPagePerRow
      setPaginated({ ...paginated, recordsPerPage: action });
    },
  };
  useEffect(() => {
    //load data from api
    loadProductData();
  }, [paginated]);

  return (
    <div>
      {/* Search */}
      <ProductSearch
        newproduct={handleToNewproduct.bind(this)}
        submit={handleSearch.bind(this)}
      ></ProductSearch>
      {/* Table */}
      <MUIDataTable
        title={<Typography variant="h6">Product</Typography>}
        data={data}
        columns={columns}
        options={options}
      ></MUIDataTable>
      {/* Add Product Group */}
      <Formik
        enableReinitialize
        //Form fields and default values
        initialValues={{
          id: ProductReducer.ProductUpdateValues.id,
          name: ProductReducer.ProductUpdateValues.name,
          price: ProductReducer.ProductUpdateValues.price,
          stockCount: ProductReducer.ProductUpdateValues.stockCount,
          productGroupId: ProductReducer.ProductUpdateValues.productGroupId,
        }}
        //Validation section
        validate={async (values) => {
          const errors = {};
          //Validate form
          return errors;
        }}
        //Form Submission ต้องผ่าน Validate ก่อน ถึงจะถูกเรียก
        onSubmit={async (values, { setSubmitting }) => {
          // clone & update value
          let objPayload = {
            ...ProductReducer.ProductUpdateValue,
            name: values.name,
            price: values.price,
            stockCount: values.stockCount,
            productGroupId: values.productGroupId,
          };
          // save to redux
          dispatch(productRedux.actions.updateProduct(objPayload));

          if (values.id === 0) {
            ProductAxios.addProduct(objPayload)
              .then((res) => {
                if (res.data.isSuccess) {
                  swal.swalSuccess("Add Product Completed").then(() => {
                    loadProductData();
                    setOpenModal(false);
                  });
                } else {
                  setOpenModal(false);
                  swal.swalError("Error", res.data.message);
                }
              })
              .catch((err) => {
                setOpenModal(false);
                swal.swalError("Error", err.message);
              });
          } else {
            ProductAxios.editProduct(objPayload, values.id)
              .then((res) => {
                if (res.data.isSuccess) {
                  //Success
                  swal
                    .swalSuccess("Update Completed", `Update id: ${values.id}`)
                    .then(() => {
                      loadProductData();
                      setOpenModal(false);
                    });
                } else {
                  //internal error
                  // alert(res.data.message)
                  swal.swalError("Error", res.data.message);
                }
              })
              .catch((err) => {
                //error network
                swal.swalError("Error", err.message);
              })
              .finally(() => {
                setSubmitting(false);
              });
          }
          setSubmitting(false);
          setOpenModal(false);
        }}
      >
        {/* Render form */}
        {({ submitForm, isSubmitting, values, setFieldValue }) => (
          <Form>
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className={classes.modal}
              open={openModal}
              onClose={() => {
                setOpenModal(false);
              }}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={openModal}>
                <Paper elevation={3} className={classes.paper}>
                  <Grid container justify="flex-start" alignItems="center">
                    <Typography>New Product</Typography>
                  </Grid>
                  <Grid
                    container
                    justify="center"
                    alignItems="center"
                    spacing={2}
                  >
                    <Grid item xs={12} lg={6}>
                      <TextField
                        fullWidth
                        className={classes.margin}
                        id="name"
                        label="Name"
                        value={values.name}
                        onChange={(e) => {
                          setFieldValue("name", e.target.value);
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <FastfoodIcon style={{ color: green[500] }} />
                            </InputAdornment>
                          ),
                        }}
                      ></TextField>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <TextField
                        fullWidth
                        className={classes.margin}
                        id="price"
                        label="Price"
                        value={values.price}
                        onChange={(e) => {
                          setFieldValue("price", e.target.value);
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <FastfoodIcon style={{ color: red[500] }} />
                            </InputAdornment>
                          ),
                        }}
                      ></TextField>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <TextField
                        fullWidth
                        className={classes.margin}
                        id="stockCount"
                        label="Stock Count"
                        value={values.stockCount}
                        disabled={nonEdit}
                        onChange={(e) => {
                          setFieldValue("stockCount", e.target.value);
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <FastfoodIcon style={{ color: blue[500] }} />
                            </InputAdornment>
                          ),
                        }}
                      ></TextField>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <DropdownProductGroupId
                        values={values}
                        name="productGroupId"
                        label="Product Groups"
                        onChange={(e) => {
                          setFieldValue("productGroupId", e.target.value);
                        }}
                      ></DropdownProductGroupId>
                    </Grid>
                  </Grid>
                </Paper>
              </Fade>
            </Modal>
            {/* {JSON.stringify(values)} */}
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ProductManagement;
