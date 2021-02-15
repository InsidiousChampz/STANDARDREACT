/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-imports */
import * as React from "react";
import * as ProductAxios from "../../../modules/Product/_redux/productAxios";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
//import { Form, Formik, Field, useFormik } from "formik";
import { Grid } from "@material-ui/core";

function TextAuditAmount(props) {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    let productId = props.productId;

    if (productId > 0) {
      ProductAxios.getProduct(productId)
        .then((res) => {
          setData(res.data.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  }, [props.productId]);

  React.useEffect(() => {
    if (data.stockCount > 0) {
      // props.setFieldvalues(`${props.name}_stockCount`, data.stockCount);
      props.setFieldvalue(`${props.name}_stockCount`, data.stockCount);
    } else {
      props.setFieldvalue(`${props.name}_stockCount`, 0);
    }
  }, [data.stockCount]);

  const handleChange = (value) => {
    if (typeof value !== "undefined") {
      props.setFieldvalue(`${props.name}_stockCount`, value);
    } else {
      props.setFieldvalue(`${props.name}_stockCount`, 0);
    }
  };

  return (
    <Grid container justify="center" direction="row">
      <FormControl
        fullWidth
        error={
          props.errors[`${props.name}_isError`] &&
          props.touched[`${props.name}`]
        }
      >
        <TextField
          disabled
          id={`${props.name}_stockCount`}
          label={props.label}
          defaultValue={0}
          InputProps={{
            readOnly: true,
          }}
          value={data.stockCount}
          onChange={handleChange.bind(data.stockCount)}
        ></TextField>
      </FormControl>
    </Grid>
  );
}

TextAuditAmount.propTypes = {
  // touched: PropTypes.object,
  // values: PropTypes.object,
  // errors: PropTypes.object,
  // name: PropTypes.string,
  // label: PropTypes.string,
};

// Same approach for defaultProps too
TextAuditAmount.defaultProps = {
  touched: {},
  values: {},
  errors: {},
  name: "",
  label: "",
};

export default TextAuditAmount;
