/* eslint-disable no-restricted-imports */
import React, { useState, useEffect } from "react";
//Grid
import Grid from "@material-ui/core/Grid";
//Card
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

//Axios
import * as ProductAxios from "../../Product/_redux/productAxios";
//Component
import OrderMenu from "../components/OrderMenu";
import OrderProduct from "../components/OrderProduct";
import OrderCart from "../components/OrderCart";

function NewOrders(props) {
  const [orderMenuId, setOrderMenuId] = useState(0);
  const [productList, setProductList] = useState([]);

  const handleSelectGroup = (Value) => {
    //3. if want to change page Click menu and re-set ProductId
    setOrderMenuId(Value);
  };

  useEffect(() => {
    //1. First load set Default page
    setOrderMenuId(1);
  }, []);

  useEffect(() => {
    //2. after got ProductID Re-render product
    //GET Product and Render
    ProductAxios.getProductByGroup(orderMenuId)
      .then((res) => {
        setProductList(res.data.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, [orderMenuId]);

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="flex-start"
      spacing={2}
    >
      <Grid item xs={12} lg={8}>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={12} lg={12}>
            <OrderMenu SelectGroup={handleSelectGroup.bind(this)}></OrderMenu>
          </Grid>
          <Grid item xs={12} lg={12}>
            <Card>
              <CardContent>
                <Grid
                  container
                  direction="row"
                  justify="flex-start"
                  alignItems="center"
                  spacing={1}
                >
                  {productList.map((item, index) => {
                    // if (item.status === true)
                    return (
                      <Grid item xs={12} lg={4} key={item.id + item.name}>
                        <OrderProduct
                          disabled={item.status}
                          key={item.id + item.name}
                          value={item.id}
                          loadProduct={item.id}
                        ></OrderProduct>
                      </Grid>
                    );
                  })}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} lg={4}>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={12} lg={12}>
            <OrderCart></OrderCart>
          </Grid>
          <Grid item xs={12} lg={12}></Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default NewOrders;
