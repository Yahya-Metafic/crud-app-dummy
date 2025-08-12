import React from "react";
import { Button } from "@mui/material";

interface PropsTypes {
  text: string;
  bgCol: string;
  textCol: string;
  onClick: () => void;
}

export default function ButtonX({ text, bgCol, textCol, onClick }: PropsTypes) {
  return (
    <>
      <Button sx={{ bgcolor: bgCol, color: textCol }} onClick={onClick}>
        {text}
      </Button>
    </>
  );
}
