import React from "react";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";

export default function EditBtn() {
  return (
    <>
      <IconButton aria-label="edit">
        <EditIcon sx={{ color: "purple" }} />
      </IconButton>
    </>
  );
}
