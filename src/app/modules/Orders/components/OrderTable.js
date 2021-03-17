/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-imports */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import * as ordersRedux from "../_redux/ordersRedux";
import * as orderAxios from "../../Orders/_redux/ordersAxios";
//Datatable
import MUIDataTable from "mui-datatables";
//Grid
import Grid from "@material-ui/core/Grid";
//Acordian
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
//Buton Card CardContent
import { Card, CardContent, Divider, TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
//Dialog
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import Slide from "@material-ui/core/Slide";
//Typo
import Typography from "@material-ui/core/Typography";
//Switch
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Switch from "@material-ui/core/Switch";
//Chip
import Chip from "@material-ui/core/Chip";
import FaceIcon from "@material-ui/icons/Face";
//Icon
import VisibilityIcon from "@material-ui/icons/Visibility";
import CancelTwoToneIcon from "@material-ui/icons/CancelTwoTone";
import * as swal from "../../Common/components/SweetAlert";
//AppBar
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
//color
import red from "@material-ui/core/colors/red";

var flatten = require("flat");
require("dayjs/locale/th");
var dayjs = require("dayjs");
dayjs.locale("th");

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

function OrderTable(props) {
  const classes = useStyles();
  const ordersReducer = useSelector(({ orders }) => orders);
  const [data, setData] = useState([]);
  const [childData, setChildData] = useState([]);
  const [orderListData, setOrderListData] = useState([]);
  const [open, setOpen] = useState(false);
  const [flgSearch, setflgSearch] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);
  const [paginated, setPaginated] = useState({
    page: 1,
    recordsPerPage: 5,
    orderingField: "",
    ascendingOrder: true,
    search: {
      dateFrom: ordersReducer.search.dateFrom,
      dateTo: ordersReducer.search.dateTo,
    },
    order: {
      dateorder: ordersReducer.order.dateorder,
      itemcount: ordersReducer.order.itemcount,
      total: ordersReducer.order.total,
      discount: ordersReducer.order.discount,
      net: ordersReducer.order.net,
      ordernumber: ordersReducer.order.ordernumber,
      status: ordersReducer.order.status,
    },
  });
  const columns = [
    {
      name: "dateOrder",
      label: "วันที่สั่งของ",
      options: {
        textAlign: "center",
      },
    },
    {
      name: "itemCount",
      label: "จำนวนที่สั่ง",
      options: {
        textAlign: "center",
      },
    },
    {
      name: "total",
      label: "รวม",
      options: {
        textAlign: "center",
      },
    },
    {
      name: "discount",
      label: "ส่วนลด",
      options: {
        textAlign: "center",
      },
    },
    {
      name: "net",
      label: "ราคาสุทธิ",
      options: {
        textAlign: "center",
      },
    },
    {
      name: "orderNumber",
      label: "หมายเลยการสั่งซื้อ",
      options: {
        textAlign: "center",
      },
    },
    {
      name: "status",
      label: "สถานะ",
      options: {
        textAlign: "center",
        customBodyRender: (value, dataIndex, updateValue) => (
          <Grid
            style={{ padding: 0, margin: 0 }}
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
          >
            <FormControl component="fieldset">
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  control={
                    <Chip
                      size="small"
                      variant="outlined"
                      icon={<FaceIcon />}
                      label={
                        //value === true ? "Completed Order" : "Cancel Order"
                        value === true
                          ? "Completed Order"
                          : value === "555"
                          ? "Test"
                          : "Cancel Order"
                      }
                      clickable
                      color={value === true ? "primary" : "secondary"}
                    />
                  }
                  labelPlacement="top"
                  name="status"
                />
              </FormGroup>
            </FormControl>
          </Grid>
        ),
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
          return (
            <Grid
              style={{ padding: 0, margin: 0 }}
              container
              direction="row"
              justify="flex-start"
              alignItems="center"
            >
              <Grid item xs={12} lg={6}>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginRight: 5 }}
                  onClick={() => {
                    loadOrderbyId(data[dataIndex].id);
                    handleClickOpen();
                  }}
                >
                  <VisibilityIcon></VisibilityIcon>
                </Button>
              </Grid>
              <Grid item xs={12} lg={6}>
                <Button
                  variant="contained"
                  color="default"
                  onClick={(e) => {
                    handleCancelOrder(data[dataIndex].id);
                  }}
                >
                  <CancelTwoToneIcon
                    style={{ color: red[700] }}
                  ></CancelTwoToneIcon>
                </Button>
              </Grid>
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCancelOrder = (id) => {
    swal
      .swalConfirm("Cancel Order", "Are you sure for cancel this order?")
      .then((res) => {
        if (res.isConfirmed === true) {
          let statusOrder = {
            orderStatus: false,
            orderListStatus: true,
          };
          orderAxios
            .updateStatusOrderById(statusOrder, id)
            .then((res) => {
              loadOrderbyFillter();
              swal.swalSuccess("Cancel Order", "Success.");
            })
            .catch((err) => {
              swal.swalError("Cancel Order", err.message);
            });
        }
      });
  };

  useEffect(() => {
    //load data from api
    loadOrderbyFillter();
  }, [paginated]);

  useEffect(() => {
    if (props.getSearch) {
      loadOrderbyDateFillter();
    } else {
      loadOrderbyFillter();
    }
  }, [props.getSearch]);

  useEffect(() => {
    if (flgSearch) {
    }
  }, [flgSearch]);

  useEffect(() => {
    if (childData.length !== 0) {
      setOrderListData([...childData.orderLists]);
    }
  }, [childData]);

  const loadOrderbyId = (id) => {
    orderAxios
      .getOrderbyId(id)
      .then((res) => {
        setChildData(res.data.data);
      })
      .catch((err) => {
        swal.swalError("Error", err.message);
      });
  };

  const loadOrderbyFillter = () => {
    orderAxios
      .getOrderFilter(
        paginated.page,
        paginated.recordsPerPage,
        paginated.order.dateorder,
        paginated.order.itemcount,
        paginated.order.total,
        paginated.order.discount,
        paginated.order.net,
        paginated.order.ordernumber,
        paginated.order.status
      )
      .then((res) => {
        let flatData = [];
        res.data.data.forEach((element) => {
          flatData.push(flatten(element));
        });
        setData(flatData);
        setTotalRecords(res.data.totalAmountRecords);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const loadOrderbyDateFillter = () => {
    orderAxios
      .GetOrderWithFilterByDate(
        paginated.search.dateFrom,
        paginated.search.dateTo,
        paginated.page,
        paginated.recordsPerPage
      )
      .then((res) => {
        let flatData = [];
        res.data.data.forEach((element) => {
          flatData.push(flatten(element));
        });
        setData(flatData);
        setTotalRecords(res.data.totalAmountRecords);
        setflgSearch(false);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid item xs={12} lg={12}>
        <Card>
          <CardContent>
            <MUIDataTable
              title={<Typography variant="h6">Order Transactions.</Typography>}
              data={data}
              columns={columns}
              options={options}
            ></MUIDataTable>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} lg={12}>
        <Button variant="contained" color="">
          Test
        </Button>
      </Grid>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
        >
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
              <Typography variant="h6">
                Order Number : {childData.orderNumber}
              </Typography>
            </Toolbar>
          </AppBar>

          {orderListData.map((item, index) => {
            return (
              <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="center"
                key={item.productId + ". " + item.name}
              >
                <Grid item xs={12} lg={12}>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls={"panel" + index}
                      id={"panel" + index}
                    >
                      <Typography className={classes.heading}>
                        {item.name}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="caption" display="block">
                        Price : {item.price} Quantity : {item.quantity}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Divider></Divider>
                </Grid>
              </Grid>
            );
          })}
          <Card>
            <CardContent>
              <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="center"
              >
                <Grid
                  container
                  item
                  xs={12}
                  lg={12}
                  style={{ textAlign: "right" }}
                >
                  <Grid item xs={12} lg={12}>
                    <TextField
                      label="Quantity"
                      id="childData.itemCount"
                      defaultValue="Default Value"
                      className={classes.textField}
                      value={childData.itemCount}
                      margin="dense"
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  item
                  xs={12}
                  lg={12}
                  style={{ textAlign: "right" }}
                >
                  <Grid item xs={12} lg={12}>
                    <TextField
                      label="Total"
                      id="childData.total"
                      defaultValue="Default Value"
                      className={classes.textField}
                      value={childData.total}
                      margin="dense"
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  item
                  xs={12}
                  lg={12}
                  style={{ textAlign: "right" }}
                >
                  <Grid item xs={12} lg={12}>
                    <TextField
                      label="Discount"
                      id="childData.discount"
                      defaultValue="Default Value"
                      className={classes.textField}
                      value={childData.discount}
                      margin="dense"
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  item
                  xs={12}
                  lg={12}
                  style={{ textAlign: "right" }}
                >
                  <Grid item xs={12} lg={12}>
                    <TextField
                      label="Net Amount"
                      id="childData.net"
                      defaultValue="Default Value"
                      className={classes.textField}
                      value={childData.net}
                      margin="dense"
                    />
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

export default OrderTable;
