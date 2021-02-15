/* eslint-disable no-restricted-imports */
import React from "react";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";

function EditButton(props) {
  return (
    <Button
      {...props}
      variant="contained"
      startIcon={<EditIcon />}
      color="primary"
    >
      {props.children}
    </Button>
  );
}

export default EditButton;
