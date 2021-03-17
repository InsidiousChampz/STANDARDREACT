/* eslint-disable no-restricted-imports */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as orderListRedux from "../_redux/orderListRedux";
//formik
import { useFormik } from "formik";
//Grid
import Grid from "@material-ui/core/Grid";
//Typo
import Typography from "@material-ui/core/Typography";
//Card
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
//Button
import Button from "@material-ui/core/Button";
//TextField
import TextField from "@material-ui/core/TextField";
//

//Icon
//import AddIcon from "@material-ui/icons/Add";
//import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/AddCircleTwoTone";
import RemoveIcon from "@material-ui/icons/RemoveCircleTwoTone";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
//Axios
import * as ProductAxios from "../../Product/_redux/productAxios";
//Image
import imgPath1 from "../../../image/1.jpg";
import imgPath2 from "../../../image/2.jpg";
import imgPath3 from "../../../image/3.png";
import imgPath4 from "../../../image/4.png";
import imgPath5 from "../../../image/5.jpg";
import imgPath6 from "../../../image/6.jpg";
import imgPath7 from "../../../image/7.png";
import imgPath8 from "../../../image/8.jpg";
import imgPath9 from "../../../image/9.png";
import imgPath10 from "../../../image/10.jpg";
import imgPath11 from "../../../image/11.jpg";
import imgPath12 from "../../../image/12.png";
import imgPath13 from "../../../image/13.png";
import imgPath14 from "../../../image/14.png";
import imgPath15 from "../../../image/15.png";
import imgPath16 from "../../../image/16.jpg";
import imgPath17 from "../../../image/17.jpg";
import imgPath18 from "../../../image/18.jpg";
import imgPath19 from "../../../image/19.jpg";
import imgPath20 from "../../../image/20.png";
import imgPath21 from "../../../image/21.png";
import imgPath22 from "../../../image/22.png";
import imgPath23 from "../../../image/23.png";
//import wpp from "../../../image/wallpaper.jpeg";
//Snackbar
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
// Sweet Alert
import * as swal from "../../Common/components/SweetAlert";

//Style
import { makeStyles } from "@material-ui/core/styles";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles({
  root: {
    maxWidth: 1000, //345
  },
  media: {
    width: "100%",
    objectFit: "cover",
  },
});

function OrderProduct(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const orderListReducer = useSelector(({ orderList }) => orderList);
  const [disabled, setDisabled] = useState(false);
  const [productId, setProductId] = useState(0);
  const [productList, setProductList] = useState([]);
  const [imagePath, setImagePath] = useState();
  const [showHide, setShowHide] = useState("inline");
  const [openAdd, setOpenAdd] = React.useState(false);

  const handleAddClick = () => {
    setOpenAdd(true);
  };

  const handleAddClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAdd(false);
  };

  const formik = useFormik({
    initialValues: {
      id: "",
      name: "",
      price: 0,
      quantity: 0,
      stockcount: 0,
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const loadProductList = () => {
    ProductAxios.getProduct(productId)
      .then((res) => {
        setProductList(res.data.data);
        formik.setFieldValue("id", res.data.data.id);
        formik.setFieldValue("name", res.data.data.name);
        formik.setFieldValue("price", res.data.data.price);
        formik.setFieldValue("stockcount", res.data.data.stockCount);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const handleCalcAddQuantity = () => {
    let qty = formik.values.quantity;
    let stc = formik.values.stockcount;
    if (qty < stc) {
      qty = qty + 1;
    }
    formik.setFieldValue("quantity", qty);
  };

  const handleCalcRemoveQuantity = () => {
    let qty = formik.values.quantity;
    if (qty > 0) {
      qty = qty - 1;
    }
    formik.setFieldValue("quantity", qty);
  };

  const handlePutIntoCart = () => {
    //check old order is already have it.
    var orderObj = [...orderListReducer.Detail];
    var index = orderObj.filter((item) => item.productId === formik.values.id);

    if (index.length === 0) {
      if (formik.values.quantity > 0) {
        //Calc ToTal Price
        let calctotalprice = formik.values.price * formik.values.quantity;
        //Set Object to Save into redux
        let objPayload = {
          productId: formik.values.id,
          name: formik.values.name,
          quantity: formik.values.quantity,
          price: formik.values.price,
          totalprice: calctotalprice,
        };
        //Assign to Array
        let objPayloadArray = [...orderListReducer.Detail];
        objPayloadArray.push(objPayload);
        //Save to redux
        dispatch(orderListRedux.actions.KeepDetailValues(objPayloadArray));
        //Clear Formik
        formik.values.quantity = 0;
        handleAddClick();
      }
    } else {
      //Clear Formik
      formik.values.quantity = 0;
      swal
        .swalError(
          "This order is already have. Please Remove before add a new one. "
        )
        .then((value) => {});
    }
  };

  useEffect(() => {
    if (props.loadProduct !== 0) {
      setProductId(props.loadProduct);
    }
  }, [props.loadProduct]);

  useEffect(() => {
    if (props.disabled === true) {
      setDisabled(false);
      setShowHide("none");
    } else {
      setDisabled(true);
      setShowHide("inline");
    }
  }, [props.disabled]);

  useEffect(() => {
    if (productId > 0) {
      loadProductList();
    }
  }, [productId]);

  useEffect(() => {
    //Render Image
    switch (formik.values.id) {
      case 1:
        setImagePath(imgPath1);
        break;
      case 2:
        setImagePath(imgPath2);
        break;
      case 3:
        setImagePath(imgPath3);
        break;
      case 4:
        setImagePath(imgPath4);
        break;
      case 5:
        setImagePath(imgPath5);
        break;
      case 6:
        setImagePath(imgPath6);
        break;
      case 7:
        setImagePath(imgPath7);
        break;
      case 8:
        setImagePath(imgPath8);
        break;
      case 9:
        setImagePath(imgPath9);
        break;
      case 10:
        setImagePath(imgPath10);
        break;
      case 11:
        setImagePath(imgPath11);
        break;
      case 12:
        setImagePath(imgPath12);
        break;
      case 13:
        setImagePath(imgPath13);
        break;
      case 14:
        setImagePath(imgPath14);
        break;
      case 15:
        setImagePath(imgPath15);
        break;
      case 16:
        setImagePath(imgPath16);
        break;
      case 17:
        setImagePath(imgPath17);
        break;
      case 18:
        setImagePath(imgPath18);
        break;
      case 19:
        setImagePath(imgPath19);
        break;
      case 20:
        setImagePath(imgPath20);
        break;
      case 21:
        setImagePath(imgPath21);
        break;
      case 22:
        setImagePath(imgPath22);
        break;
      case 23:
        setImagePath(imgPath23);
        break;
      default:
        break;
    }
  }, [formik.values.id]);

  return (
    <Grid
      container
      direction="row"
      justify="flex-start"
      alignItems="center"
      spacing={2}
    >
      <Grid item xs={12} lg={12}>
        <Card className={classes.root}>
          <Card>
            <CardActionArea>
              <CardMedia
                key={formik.values.id + formik.values.name}
                className={classes.media}
                component="img"
                image={imagePath}
                title={formik.values.name}
                alt={formik.values.name}
                id={formik.values.id + formik.values.name}
                name={formik.values.id + formik.values.name}
              />
              <CardContent>
                <Grid
                  container
                  direction="row"
                  justify="flex-start"
                  alignItems="center"
                >
                  <Grid item xs={12} lg={12}>
                    <Typography variant="caption" display="block" gutterBottom>
                      {formik.values.id}:{formik.values.name}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="row"
                  justify="flex-start"
                  alignItems="center"
                >
                  <Grid item xs={12} lg={6}>
                    <Typography variant="caption" display="block" gutterBottom>
                      {formik.values.price} Baht.
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    lg={6}
                    style={{ display: showHide, textAlign: "right" }}
                  >
                    <Typography variant="caption" display="block" color="error">
                      Out of Stock!!!!
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="center"
              >
                <Grid item xs={12} lg={3}>
                  <TextField
                    disabled={disabled}
                    label="Quantity"
                    id="quantity"
                    value={formik.values.quantity}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} lg={3}>
                  <Button
                    disabled={disabled}
                    id="qtyadd"
                    size="small"
                    color="primary"
                    onClick={handleCalcAddQuantity.bind()}
                  >
                    <AddIcon></AddIcon>
                  </Button>
                </Grid>
                <Grid item xs={12} lg={3}>
                  <Button
                    disabled={disabled}
                    id="qtyremove"
                    size="small"
                    color="secondary"
                    onClick={handleCalcRemoveQuantity.bind()}
                  >
                    <RemoveIcon></RemoveIcon>
                  </Button>
                </Grid>
                <Grid item xs={12} lg={3}>
                  <Button
                    size="small"
                    color="primary"
                    disabled={disabled}
                    id="btncart"
                    onClick={handlePutIntoCart}
                  >
                    <ShoppingCartIcon></ShoppingCartIcon>
                  </Button>
                </Grid>
              </Grid>
            </CardActions>
          </Card>
        </Card>
      </Grid>
      <Snackbar open={openAdd} autoHideDuration={1000} onClose={handleAddClose}>
        <Alert onClose={handleAddClose} severity="success">
          {formik.values.name} added to cart!!
        </Alert>
      </Snackbar>
    </Grid>
  );
}

export default OrderProduct;
