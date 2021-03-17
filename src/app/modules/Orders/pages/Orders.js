import React from "react";

import { Grid } from "@material-ui/core";
//Component
import OrderSearch from "../components/OrderSearch";
import OrderTable from "../components/OrderTable";

function Orders(props) {
  const [flgSearch, setflgSearch] = React.useState(false);
  const handleSearch = (value) => {
    setflgSearch(value);
  };

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={2}
    >
      <Grid item xs={12} lg={12}>
        <OrderSearch setSearch={handleSearch.bind(this)}></OrderSearch>
      </Grid>
      <Grid item xs={12} lg={12}>
        <OrderTable getSearch={flgSearch}></OrderTable>
      </Grid>
    </Grid>
  );
}

export default Orders;
