/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-imports */
import React, { useEffect, useState } from "react";
//Axios
import * as ProductGroupAxios from "../../Product/_redux/productGroupAxios";
//Grid
import Grid from "@material-ui/core/Grid";
//Card
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
//Bottom Navigation
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import LocalBarIcon from "@material-ui/icons/LocalBar";
import KitchenIcon from "@material-ui/icons/Kitchen";

function OrderMenu(props) {
  const [value, setValue] = useState(0);
  const [productGroupData, setProductGroupData] = useState([]);
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

  const handleToSelectProductGroups = (e) => {
    props.SelectGroup(e);
  };

  useEffect(() => {
    ProductGroupAxios.getProductGroupFilter(
      paginated.page,
      paginated.recordsPerPage,
      paginated.searchValues.name,
      paginated.searchValues.createBy,
      paginated.searchValues.status
    ).then((res) => {
      if (res.data.isSuccess) {
        if (res.data.data.length > 0) {
          setProductGroupData(res.data.data);
        } else {
          alert(res.data.message);
        }
      }
    });
  }, []);
  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid item xs={12} lg={12}>
        <Card>
          <CardContent>
            <BottomNavigation
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
                handleToSelectProductGroups(newValue);
              }}
              showLabels
            >
              {productGroupData.map((item) => {
                if (item.status === true)
                  if (item.id === 1)
                    return (
                      <BottomNavigationAction
                        key={item.id}
                        value={item.id}
                        label={item.name}
                        icon={<FastfoodIcon />}
                      />
                    );
                if (item.id === 2)
                  return (
                    <BottomNavigationAction
                      key={item.id}
                      value={item.id}
                      label={item.name}
                      icon={<LocalBarIcon />}
                    />
                  );
                if (item.id === 3)
                  return (
                    <BottomNavigationAction
                      key={item.id}
                      value={item.id}
                      label={item.name}
                      icon={<KitchenIcon />}
                    />
                  );
              })}
            </BottomNavigation>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default OrderMenu;
