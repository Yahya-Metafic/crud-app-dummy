import React from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

interface Props {
  onClickDelete: () => void;
}

export default function DeleteBtn({ onClickDelete }: Props) {
  return (
    <>
      <IconButton aria-label="delete" onClick={onClickDelete}>
        <DeleteIcon sx={{ color: "red" }} />
      </IconButton>
    </>
  );
}
