/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-imports */
import React, { useState } from "react";
import ProductAuditSearch from "../components/ProductAuditSearch";
import ProductAuditManagement from "../components/ProductAuditManagement";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";

function ProductAudit(props) {
  const [searchDataValue, setsearchDataValue] = useState([]);

  const handleSearchData = (values) => {
    //Send to MuiDataTable Component
    setsearchDataValue(values);
  };

  return (
    <Card elevation={3} style={{ marginBottom: 5 }}>
      {/* Search Section */}
      <CardContent>
        <ProductAuditSearch
          searchData={handleSearchData.bind(this)}
        ></ProductAuditSearch>
      </CardContent>
      {/* New Audit Section */}
      <CardContent>
        <Grid container direction="row" justify="flex-end" alignItems="center">
          <Button
            component={Link}
            to="/productauditdetail"
            variant="contained"
            color="primary"
            style={{ width: 250 }}
          >
            <AddIcon></AddIcon>
            New Audit
          </Button>
        </Grid>
      </CardContent>
      {/* Table Section */}
      <CardContent>
        <ProductAuditManagement
          loadSearchData={searchDataValue}
        ></ProductAuditManagement>
      </CardContent>
    </Card>
  );
}

export default ProductAudit;
