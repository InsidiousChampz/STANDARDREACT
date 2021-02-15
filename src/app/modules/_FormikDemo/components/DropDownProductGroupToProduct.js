/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-imports */
import * as React from "react";
import { Field } from "formik";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { Select } from "formik-material-ui";
import Grid from "@material-ui/core/Grid";
import * as ProductGroupAxios from "../../Product/_redux/productGroupAxios";
import * as ProductAxios from "../../Product/_redux/productAxios";

function DropDownProductGroupToProduct(props) {
  const [productGroupList, setProductGroupList] = React.useState([]);
  const [productList, setProductList] = React.useState([]);

  React.useEffect(() => {
    //Load Productgroup First!!
    ProductGroupAxios.getAllProductGroup()
      .then((res) => {
        if (res.data.isSuccess) {
          setProductGroupList(res.data.data);
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);

  React.useEffect(() => {
    //Load Product Second!!
    let productGroupId = props.value[`${props.name}_productGroupId`];
    if (productGroupId > 0) {
      ProductAxios.getProductByGroup(productGroupId)
        .then((res) => {
          if (res.data.isSuccess) {
            setProductList(res.data.data);
          } else {
            alert(res.data.message);
          }
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  }, [props.value[`${props.name}_productGroupId`]]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} lg={6}>
        <FormControl fullWidth>
          <InputLabel htmlFor="productGroup">หมวดหมู่</InputLabel>
          <Field
            component={Select}
            name={`${props.name}_productGroupId`}
            inputProps={{
              id: "productGroupId",
            }}
            onChange={(event) => {
              props
                .setFieldValue(event.target.name, event.target.value)
                .then(() => {
                  // reset selected ProductID
                  props.setFieldValue(`${props.name}_productId`, 0);
                });
            }}
          >
            <MenuItem disabled value={0}>
              กรุณาเลือก
            </MenuItem>
            {productGroupList.map((item) => (
              <MenuItem key={`${props.name}_p_${item.id}`} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </Field>
        </FormControl>
      </Grid>
      <Grid item xs={12} lg={6}>
        <FormControl fullWidth>
          <InputLabel htmlFor="productId">สินค้า</InputLabel>
          <Field
            component={Select}
            name={`${props.name}_productId`}
            inputProps={{
              id: "productId",
            }}
          >
            <MenuItem disabled value={0}>
              กรุณาเลือก
            </MenuItem>
            {productList.map((item) => (
              <MenuItem key={`${props.name}_sd_${item.id}`} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </Field>
        </FormControl>
      </Grid>
    </Grid>
  );
}

export default DropDownProductGroupToProduct;
