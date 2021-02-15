/* eslint-disable no-restricted-imports */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import MUIDataTable from "mui-datatables";
//import Grid from "@material-ui/core/Grid";
//import * as swal from "../../Common/components/SweetAlert";
import * as ProductAuditAxios from "../_redux/productAuditAxios";
//import * as productAuditRedux from "../_redux/productAuditRedux";

// Flatten and DayJS //
var flatten = require("flat");
require("dayjs/locale/th");
var dayjs = require("dayjs");
dayjs.locale("th");

function ProductAuditManagement(props) {
  const [muiData, setMuiData] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [paginated, setPaginated] = useState({
    page: 1,
    recordsPerPage: 5,
    orderingField: "",
    ascendingOrder: true,
    searchValues: {
      name: "",
      remark: "",
      createBy: "",
      productGroupId: "",
    },
  });

  const loadAuditProduct = () => {
    ProductAuditAxios.getAuditFilter(
      paginated.page,
      paginated.recordsPerPage,
      paginated.searchValues.name,
      paginated.searchValues.remark,
      paginated.searchValues.createBy,
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
            setMuiData(flatData);
          } else {
            //swal.swalError("Not Found a Results Please Try again.");
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
  useEffect(() => {
    if (props.loadSearchData.length !== 0) {
      if (props.loadSearchData.productGroupId === 0) {
        props.loadSearchData.productGroupId = "";
      }
      setPaginated({
        ...paginated,
        page: 1,
        searchValues: props.loadSearchData,
      });
    }
  }, [props.loadSearchData]);
  useEffect(() => {
    loadAuditProduct();
  }, [paginated]);
  const columns = [
    {
      name: "createDate",
      label: "วันที่ออดิท",
    },
    {
      name: "product.productGroup.name",
      label: "หมวดหมู่",
    },
    {
      name: "product.name",
      label: "สินค้า",
    },
    {
      name: "stockCount",
      label: "จำนวนสินค้า",
    },
    {
      name: "auditAmount",
      label: "จำนวนที่ออดิทสินค้า",
    },
    {
      name: "auditTotalAmount",
      label: "จำนวนสินค้า ณ ปัจจุบัน",
    },
    {
      name: "createBy",
      label: "ผู้นำเข้าข้อมูล",
    },
    {
      name: "remark",
      label: "หมายเหตุ",
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
      {/* Table */}
      <MUIDataTable
        title={<Typography variant="h6">Audit Product List</Typography>}
        data={muiData}
        columns={columns}
        options={options}
      ></MUIDataTable>
    </div>
  );
}

export default ProductAuditManagement;
