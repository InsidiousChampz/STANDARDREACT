/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-imports */
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import * as orderListRedux from "../_redux/orderListRedux";
import * as orderListAxios from "../_redux/orderListAxios";
import * as ProductAxios from "../../Product/_redux/productAxios";
//Grid
import Grid from "@material-ui/core/Grid";
//Card
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
//List + Divide
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
//AppBar
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import DeleteIcon from "@material-ui/icons/Delete";
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import DoneIcon from "@material-ui/icons/Done";
//color
import { red, blue } from "@material-ui/core/colors";
//Dialog
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
//TextField
import TextField from "@material-ui/core/TextField";
//Sweet Alert
import * as swal from "../../Common/components/SweetAlert";
//Snackbar
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import wpp from "../../../image/wallpaper.jpeg";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    height: "auto",
  },
  title: {
    marginLeft: theme.spacing(2),
    flexGrow: 1,
  },
  appBar: {
    position: "relative",
  },
  chip: {
    //background: "linear-gradient(to right bottom, #EB6B9D, #EE8C68)",
    backgroundImage: `url(${wpp})`,
    backgroundPosition: "center",
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function OrderCart(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const orderListReducer = useSelector(({ orderList }) => orderList);
  const [open, setOpen] = useState(false);
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [openRemove, setOpenRemove] = useState(false);
  const [limitStock, setlimitStock] = useState();
  const [nameProduct, setNameProduct] = useState(false);
  const [modifiedId, setModifiedId] = useState(0);
  const [flgSave, setFlgSave] = useState(false);

  const formik = useFormik({
    enableReinitialize: "true",
    initialValues: {
      itemCount: 0,
      totalPrice: 0,
      disCount: 0,
      netAmount: 0,
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  useEffect(() => {
    if (orderListReducer.Detail.length > 0) {
      formik.setFieldValue("totalPrice", handleCalctotalPrice());
      formik.setFieldValue("itemCount", handleCalcItemCount());
    } else {
      formik.setFieldValue("totalPrice", 0);
      formik.setFieldValue("itemCount", 0);
    }
  }, [orderListReducer]);

  useEffect(() => {
    if (flgSave === true) {
      let objAllSave = {
        ...orderListReducer,
      };

      //Debug
      //alert(JSON.stringify(objAllSave));

      orderListAxios
        .AddBothOrder(objAllSave)
        .then((res) => {
          dispatch(orderListRedux.actions.resetOrderListDetail());
          dispatch(orderListRedux.actions.resetOrderListHeader());
          formik.values.itemCount = 0;
          formik.values.disCount = 0;
          formik.values.netAmount = 0;
          swal.swalSuccess(
            "your order : " +
              res.data.data.orderNumber +
              "  Thank you very much for your Order."
          );
        })
        .catch((err) => {
          swal.swalError("Error", err.message);
        });
      setFlgSave(false);
    } else {
      //RESET REDUX
      dispatch(orderListRedux.actions.resetOrderListDetail());
      dispatch(orderListRedux.actions.resetOrderListHeader());
      formik.values.itemCount = 0;
      formik.values.disCount = 0;
      formik.values.netAmount = 0;
      handleClose();
    }
  }, [flgSave]);

  const handleClickOpen = () => {
    if (orderListReducer.Detail.length > 0) {
      //Set NetAmount = ToTalPrice
      formik.setFieldValue("netAmount", formik.values.totalPrice);
      setOpen(true);
    } else {
      swal.swalInfo("Check Out", "Please Select Order First!!");
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenFormDialog = (id) => {
    ProductAxios.getProduct(id)
      .then((res) => {
        setlimitStock(res.data.data.stockCount);
      })
      .catch((err) => {
        alert("Can not get Stock Count. Please Check Stock Count");
      });
    setModifiedId(id);
    setOpenFormDialog(true);
  };

  const handleCloseFormDialog = () => {
    handleAdjustOrder();
    setOpenFormDialog(false);
  };

  const handleRemoveClick = () => {
    setOpenRemove(true);
  };

  const handleRemoveClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenRemove(false);
  };

  const handleChangeDisCount = (e) => {
    if (e.target.value <= formik.values.totalPrice) {
      formik.setFieldValue("disCount", e.target.value);
    } else {
      alert("Please Check your discount is over totalprice.");
    }
  };

  const handleCalcDisCount = (e) => {
    let _netamount = formik.values.totalPrice - e.target.value;
    formik.setFieldValue("netAmount", _netamount);
  };

  const handleCheckOut = () => {
    let objSave = {
      itemCount: formik.values.itemCount,
      total: formik.values.totalPrice,
      disCount: formik.values.disCount,
      net: formik.values.netAmount,
    };

    dispatch(orderListRedux.actions.KeepHeaderValues(objSave));
    setFlgSave(true);
  };

  const handleCalctotalPrice = () => {
    //Loop for Calc totalPrice
    return orderListReducer.Detail.map((item) => item.totalprice).reduce(
      (a, b) => a + b
    );
  };

  const handleCalcItemCount = () => {
    //Loop for Calc totalPrice
    return orderListReducer.Detail.map((item) => item.quantity).reduce(
      (a, b) => a + b
    );
  };

  const handleRemoveOrder = (item) => () => {
    let deleteId = item.productId;
    var standardObject = [...orderListReducer.Detail];
    //find index by productId
    var index = standardObject.filter((item) => item.productId !== deleteId);
    if (index !== -1) {
      standardObject.splice(index, 1);
      let objPayUpdateArray = [...standardObject];
      // save to redux
      dispatch(orderListRedux.actions.KeepDetailValues(objPayUpdateArray));
      setNameProduct(item.name);
      handleRemoveClick();
    }
  };

  const handleSetNewItemCount = (e) => {
    if (e.target.value.match(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/)) {
      formik.setFieldValue("itemCount", formik.values.itemCount);
    } else {
      if (parseInt(e.target.value) > limitStock) {
        formik.setFieldValue("itemCount", limitStock);
      } else {
        formik.setFieldValue("itemCount", e.target.value);
      }
    }
  };

  const handleAdjustOrder = () => {
    var standardObject = [...orderListReducer.Detail];
    //find index by productId
    var index = standardObject.findIndex(
      (item) => item.productId === modifiedId
    );
    if (index !== -1) {
      let price = standardObject[index].price;
      standardObject[index] = {
        ...standardObject[index],
        quantity: parseInt(formik.values.itemCount),
        totalprice: parseInt(formik.values.itemCount) * parseInt(price),
      };
      let objPayUpdateArray = [...standardObject];
      dispatch(orderListRedux.actions.KeepDetailValues(objPayUpdateArray));
    }
  };

  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid item xs={12} lg={12}>
        <Card style={{ width: "100%" }}>
          <CardContent>
            <AppBar position="static">
              <Toolbar>
                <IconButton
                  edge="start"
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="menu"
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                  Your Order
                </Typography>
              </Toolbar>
            </AppBar>
            <List
              component="nav"
              className={classes.root}
              aria-label="mailbox folders"
            >
              {orderListReducer.Detail.map((item) => {
                return (
                  <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="center"
                    key={item.productId + ". " + item.name}
                  >
                    <Grid item xs={12} lg={12}>
                      <ListItem button>
                        <Grid
                          container
                          direction="row"
                          justify="flex-start"
                          alignItems="center"
                        >
                          <Grid item xs={12} lg={8}>
                            <ListItemText
                              primary={item.productId + ". " + item.name}
                              secondary={
                                " Quantity : " +
                                item.quantity +
                                "     Price : " +
                                item.price
                              }
                            />
                          </Grid>
                          <Grid item xs={12} lg={2}>
                            <Button
                              id="btnAdjust"
                              fullWidth
                              onClick={(e) => {
                                handleClickOpenFormDialog(item.productId);
                              }}
                            >
                              <EditTwoToneIcon
                                style={{ color: blue[700] }}
                              ></EditTwoToneIcon>
                            </Button>
                          </Grid>
                          <Grid item xs={12} lg={2}>
                            <Button
                              id="btnDelete"
                              fullWidth
                              onClick={handleRemoveOrder(item)}
                            >
                              <DeleteIcon
                                style={{ color: red[700] }}
                              ></DeleteIcon>
                            </Button>
                          </Grid>
                        </Grid>
                      </ListItem>
                      <Divider />
                    </Grid>
                  </Grid>
                );
              })}
            </List>
            <Grid container direction="row" justify="flex-start">
              <Grid item xs={12} lg={12}>
                <b>Total Price : </b>
                {formik.values.totalPrice} Baht.
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              onClick={handleClickOpen}
            >
              <ShoppingCartIcon></ShoppingCartIcon>Check Out
            </Button>
          </CardContent>
        </Card>
        <Snackbar
          open={openRemove}
          autoHideDuration={1000}
          onClose={handleRemoveClose}
        >
          <Alert severity="warning">{nameProduct} Removed from cart!!</Alert>
        </Snackbar>
      </Grid>

      {/* Form Dialog */}
      <Dialog
        open={openFormDialog}
        onClose={handleCloseFormDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Change Quantity</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="quantity"
            label="Quantity"
            fullWidth
            value={formik.values.itemCount}
            onChange={(e) => {
              handleSetNewItemCount(e);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseFormDialog} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog */}
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Your Order.
            </Typography>
            <Button autoFocus color="inherit" onClick={handleCheckOut}>
              <ShoppingCartIcon></ShoppingCartIcon> CheckOut
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="flex-start"
            spacing={1}
            style={{ padding: 50, height: "91vh" }}
            className={classes.chip}
          >
            {/* <Card>
              <CardContent> */}
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="flex-start"
              spacing={1}
              style={{ padding: 50 }}
            >
              <Grid item xs={12} lg={3}></Grid>
              <Grid item xs={12} lg={3}>
                <Card>
                  <CardContent>
                    <Grid
                      container
                      direction="row"
                      justify="center"
                      alignItems="center"
                      spacing={1}
                    >
                      {orderListReducer.Detail.map((item) => {
                        return (
                          <Grid
                            item
                            xs={12}
                            lg={12}
                            key={"G" + item.id + item.name}
                          >
                            <ListItemText
                              button="true"
                              style={{
                                border: "solid",
                                color: blue[500],
                                padding: 5,
                              }}
                              key={"lit" + item.id + item.name}
                            >
                              <ListItemText
                                primary={item.productId + ". " + item.name}
                                secondary={
                                  " Quantity : " +
                                  item.quantity +
                                  "     Price : " +
                                  item.price
                                }
                                key={"lits" + item.id + item.name}
                              />
                            </ListItemText>
                          </Grid>
                        );
                      })}
                      <Grid item xs={12} lg={12}>
                        <Grid
                          container
                          direction="row"
                          justify="flex-end"
                          alignItems="center"
                          style={{
                            border: "solid",
                            color: blue[500],
                            padding: 5,
                          }}
                        >
                          <Grid
                            item
                            xs={1}
                            lg={1}
                            style={{
                              textAlign: "left",
                            }}
                          >
                            <DoneIcon style={{ color: red[700] }}></DoneIcon>
                          </Grid>
                          <Grid
                            item
                            xs={7}
                            lg={7}
                            style={{
                              textAlign: "left",
                            }}
                          >
                            All Quantity
                          </Grid>
                          <Grid
                            item
                            xs={4}
                            lg={4}
                            style={{
                              //border: "solid",
                              //color: blue[500],
                              textAlign: "right",
                            }}
                          >
                            {formik.values.itemCount} ea.
                          </Grid>
                          <Grid
                            item
                            xs={1}
                            lg={1}
                            style={{
                              //border: "solid",
                              //color: blue[500],
                              textAlign: "left",
                            }}
                          >
                            <DoneIcon style={{ color: red[700] }}></DoneIcon>
                          </Grid>
                          <Grid
                            item
                            xs={7}
                            lg={7}
                            style={{
                              //border: "solid",
                              //color: blue[500],
                              textAlign: "left",
                            }}
                          >
                            Total Price
                          </Grid>
                          <Grid
                            item
                            xs={4}
                            lg={4}
                            style={{
                              //border: "solid",
                              //color: blue[500],
                              textAlign: "right",
                            }}
                          >
                            {formik.values.totalPrice} Baht.
                          </Grid>
                          <Grid
                            item
                            xs={1}
                            lg={1}
                            style={{
                              //border: "solid",
                              //color: blue[500],
                              textAlign: "left",
                            }}
                          >
                            <DoneIcon style={{ color: red[700] }}></DoneIcon>
                          </Grid>
                          <Grid
                            item
                            xs={7}
                            lg={7}
                            style={{
                              //border: "solid",
                              //color: blue[500],
                              textAlign: "left",
                            }}
                          >
                            Net Amount
                          </Grid>
                          <Grid
                            item
                            xs={4}
                            lg={4}
                            style={{
                              //border: "solid",
                              //color: blue[500],
                              textAlign: "right",
                            }}
                          >
                            {formik.values.netAmount} Baht.
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} lg={3}>
                <Card>
                  <CardContent>
                    <Grid
                      container
                      direction="row"
                      justify="center"
                      alignItems="center"
                      spacing={1}
                    >
                      <Grid item xs={12} lg={12}>
                        <TextField
                          fullWidth
                          id="totalPrice"
                          label="Total Price"
                          helperText="please make sure this price is correct."
                          variant="outlined"
                          value={formik.values.totalPrice}
                          disabled={true}
                        />
                      </Grid>
                      <Grid item xs={12} lg={12}>
                        <TextField
                          fullWidth
                          id="disCount"
                          label="DisCount"
                          helperText="depend on promotions."
                          variant="outlined"
                          value={formik.values.disCount}
                          onChange={(e) => {
                            handleChangeDisCount(e);
                            handleCalcDisCount(e);
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} lg={12}>
                        <TextField
                          fullWidth
                          id="netAmount"
                          label="Net Amount"
                          helperText="price after discount"
                          variant="outlined"
                          value={formik.values.netAmount}
                          onChange={formik.handleChange}
                          disabled={true}
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} lg={3}></Grid>
            </Grid>
            {/* </CardContent>
            </Card> */}
          </Grid>
        </List>
      </Dialog>
    </Grid>
  );
}

export default OrderCart;
