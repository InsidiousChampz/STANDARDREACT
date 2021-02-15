/* eslint-disable no-restricted-imports */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form, Field } from "formik";
import MUIDataTable from "mui-datatables";
import * as ProductGroupAxios from "../_redux/productGroupAxios";
import * as productGroupRedux from "../_redux/productGroupRedux";
import ProductGroupSearch from "./ProductGroupSearch";
import Typography from "@material-ui/core/Typography";
import * as swal from "../../Common/components/SweetAlert";
import { red } from "@material-ui/core/colors";
//-- Components --
import Grid from "@material-ui/core/Grid";
import DeleteButton from "../../Common/components/Buttons/DeleteButton";
import EditButton from "../../Common/components/Buttons/EditButton";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import InputAdornment from "@material-ui/core/InputAdornment";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
//import { TextField } from "formik-material-ui";
import Button from "@material-ui/core/Button";
//-- Redirect --
import { Link } from "react-router-dom";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

var flatten = require("flat");
require("dayjs/locale/th");
var dayjs = require("dayjs");
dayjs.locale("th");

function ProductGroupManagement(props) {
  const dispatch = useDispatch();
  const ProductGroupReducer = useSelector(({ productGroup }) => productGroup);
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
  const [newProduct, setNewProduct] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openSelect, setOpenSelect] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);
  const [data, setData] = useState([]);
  const [paginated, setPaginated] = useState({
    page: 1,
    recordsPerPage: 5,
    orderingField: "",
    ascendingOrder: true,
    searchValues: {
      name: "",
      createBy: "",
      status: "",
    },
  });

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleOpenSelect = () => {
    setOpenSelect(true);
  };
  const handleCloseSelect = () => {
    setOpenSelect(false);
  };
  const handleTextChange = (e) => {
    setNewProduct(e.target.value);
  };
  const handleToNewgroup = (values) => {
    if (values === true) {
      setOpenModal(true);
    }
  };
  const handleDelete = (id) => {
    swal.swalConfirm("Confirm delete?", `Confirm delete ${id}?`).then((res) => {
      if (res.isConfirmed) {
        //delete
        ProductGroupAxios.deleteProductGroup(id)
          .then((res) => {
            if (res.data.isSuccess) {
              //reload
              swal.swalSuccess("Success", `Delete ${id} success.`).then(() => {
                loadProductGroupData();
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
    ProductGroupAxios.getProductGroup(id)
      .then((res) => {
        //Assign to redux
        let apiData = res.data.data;

        let objPayload = {
          ...ProductGroupReducer.ProductGroupsUpdateValue,
          id: id,
          name: apiData.name,
          status: apiData.status,
        };

        // save to redux
        dispatch(productGroupRedux.actions.updateProductGroups(objPayload));
      })
      .catch((err) => {
        //Error
      });
  };
  const handleSearch = (values) => {
    setPaginated({
      ...paginated,
      page: 1,
      searchValues: values,
    });
  };
  const loadProductGroupData = () => {
    ProductGroupAxios.getProductGroupFilter(
      paginated.page,
      paginated.recordsPerPage,
      paginated.searchValues.name,
      paginated.searchValues.createBy,
      paginated.searchValues.status
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
  const SubmitNewProductGroup = () => {
    ProductGroupAxios.addProductGroup(newProduct)
      .then((res) => {
        if (res.data.isSuccess) {
          //reload
          swal
            .swalSuccess(
              "Success",
              `Add New Product group ${newProduct} success.`
            )
            .then(() => {
              loadProductGroupData();
              setOpenModal(false);
            });
        }
      })
      .catch((err) => {
        //network error
        swal.swalError("Error", err.message);
        setOpenModal(false);
      });
    setOpenModal(false);
  };
  useEffect(() => {
    //load data from api
    loadProductGroupData();
  }, [paginated]);

  const columns = [
    {
      name: "name",
      label: "รายการอาหาร",
    },
    {
      name: "createBy",
      label: "ผู้นำเข้าระบบ",
    },
    {
      name: "createDate",
      label: "วันที่นำเข้าระบบ",
    },
    {
      name: "status",
      label: "สถานะ",
      options: {
        customBodyRenderLite: (dataIndex, rowIndex) => {
          return (
            <Grid
              style={{ padding: 0, margin: 0 }}
              container
              direction="row"
              justify="flex-start"
              alignItems="center"
            >
              {data[dataIndex].status.toString()}
            </Grid>
          );
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
        customBodyRenderLite: (dataIndex, rowIndex) => {
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
                  handleOpenDialog();
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
        },
      },
    },
  ];
  const options = {
    filterType: "checkbox",
    print: false,
    download: false,
    filter: false,
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
      setPaginated({ ...paginated, recordsPerPage: action });
    },
  };

  return (
    <div>
      {/* Search */}
      <ProductGroupSearch
        newgroup={handleToNewgroup.bind(this)}
        submit={handleSearch.bind(this)}
      ></ProductGroupSearch>
      {/* Table */}
      <MUIDataTable
        title={<Typography variant="h6">Product Group</Typography>}
        data={data}
        columns={columns}
        options={options}
      ></MUIDataTable>
      {/* Add Product Group */}
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
          <div className={classes.paper}>
            <table className={classes.tbl}>
              <thead></thead>
              <tbody>
                <tr>
                  <td>
                    <Typography>New Product Groups</Typography>
                  </td>
                </tr>
                <tr>
                  <td>
                    <TextField
                      fullWidth
                      className={classes.margin}
                      id="name"
                      label="Name"
                      onChange={handleTextChange.bind(this)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <FastfoodIcon />
                          </InputAdornment>
                        ),
                      }}
                    ></TextField>
                  </td>
                </tr>
                <tr>
                  <td>
                    <br></br>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={SubmitNewProductGroup}
                    >
                      Submit
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <br></br>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Button
                      component={Link}
                      to="/product"
                      fullWidth
                      variant="contained"
                      color="secondary"
                    >
                      Move to Product
                    </Button>
                  </td>
                </tr>
              </tbody>
              <tfoot></tfoot>
            </table>
          </div>
        </Fade>
      </Modal>
      {/* Update Product Group */}
      <Formik
        enableReinitialize
        //Form fields and default values
        initialValues={{
          id: ProductGroupReducer.ProductGroupsUpdateValue.id,
          name: ProductGroupReducer.ProductGroupsUpdateValue.name,
          status: ProductGroupReducer.ProductGroupsUpdateValue.status,
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
            ...ProductGroupReducer.ProductGroupsUpdateValue,
            name: values.name,
            status: values.status,
          };
          // save to redux
          dispatch(productGroupRedux.actions.updateProductGroups(objPayload));
          // Save data to axios
          ProductGroupAxios.editProductGroup(objPayload, values.id)
            .then((res) => {
              if (res.data.isSuccess) {
                //Success
                swal
                  .swalSuccess("Update Completed", `Update id: ${values.id}`)
                  .then(() => {
                    loadProductGroupData();
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

          setSubmitting(false);
          setOpenDialog(false);
        }}
      >
        {/* Render form */}
        {({ submitForm, isSubmitting, values, setFieldValue }) => (
          <Form>
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className={classes.modal}
              open={openDialog}
              onClose={() => {
                setOpenDialog(false);
              }}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={openDialog}>
                <div className={classes.paper}>
                  <table className={classes.tbl}>
                    <thead></thead>
                    <tbody>
                      <tr>
                        <td>
                          <Typography>Edit Product Groups</Typography>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Field
                            fullWidth
                            component={TextField}
                            required
                            type="text"
                            label="Name"
                            name="name"
                            value={values.name}
                            onChange={(e) => {
                              setFieldValue("name", e.target.value);
                            }}
                          ></Field>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Select
                            fullWidth
                            labelId="demo-controlled-open-select-label"
                            id="demo-controlled-open-select"
                            open={openSelect}
                            onClose={handleCloseSelect}
                            onOpen={handleOpenSelect}
                            value={values.status}
                            onChange={(e) => {
                              setFieldValue("status", e.target.value);
                            }}
                          >
                            <MenuItem value={true}>true</MenuItem>
                            <MenuItem value={false}>false</MenuItem>
                          </Select>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <br></br>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            disabled={isSubmitting}
                            onClick={submitForm}
                          >
                            Save
                          </Button>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <br></br>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Button
                            onClick={handleCloseDialog}
                            to="/product"
                            fullWidth
                            variant="contained"
                            color="secondary"
                          >
                            Cancel
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                    <tfoot></tfoot>
                  </table>
                </div>
              </Fade>
            </Modal>
            {/* values :{JSON.stringify(values)} */}
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ProductGroupManagement;
