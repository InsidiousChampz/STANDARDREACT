/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-imports */
import * as React from "react";
import PropTypes from "prop-types";
import { Field } from "formik";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { Select } from "formik-material-ui";
import * as ProductAuditTypeAxios from "../../../modules/Product/_redux/productAuditTypesAxios";

var flatten = require("flat");

function DropdownAuditType(props) {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    ProductAuditTypeAxios.getAllAuditTypes().then((res) => {
      //bind Data
      if (res.data.isSuccess) {
        //setData(res.data.data);
        let flatData = [];
        res.data.data.forEach((element) => {
          flatData.push(flatten(element));
        });
        setData(flatData);
      } else {
        //internal error
        alert(res.data.message);
      }
    });
  }, []);

  return (
    <FormControl
      fullWidth
      error={
        props.errors[`${props.name}_isError`] && props.touched[`${props.name}`]
      }
    >
      <InputLabel htmlFor="titleId-simple">{props.label}</InputLabel>
      <Field
        component={Select}
        name={props.name}
        inputProps={{
          id: "titleId-simple",
        }}
      >
        <MenuItem disabled value={0}>
          การจัดการ
        </MenuItem>
        {data.map((item) => (
          <MenuItem key={`${props.name}_${item.id}`} value={item.id}>
            {item.nametype}
          </MenuItem>
        ))}
      </Field>
      {props.touched[`${props.name}`] && (
        <FormHelperText>
          {props.errors[`${props.name}_errorText`]}
        </FormHelperText>
      )}
    </FormControl>
  );
}

DropdownAuditType.propTypes = {
  touched: PropTypes.object,
  values: PropTypes.object,
  errors: PropTypes.object,
  name: PropTypes.string,
  label: PropTypes.string,
};

// Same approach for defaultProps too
DropdownAuditType.defaultProps = {
  touched: {},
  values: {},
  errors: {},
  name: "",
  label: "",
};

export default DropdownAuditType;
