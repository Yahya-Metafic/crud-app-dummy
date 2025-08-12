import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ButtonX from "./ButtonX.jsx";
import { Link } from "react-router-dom";
import LanguageSelector from "./LanguageSelector.js";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const handleLogOutClick = () => {
    localStorage.removeItem("token");
  };
  const { t } = useTranslation();
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="transparents">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {t("navbar.heading")}
            </Typography>
            <LanguageSelector />
            <Link to="/login">
              <ButtonX
                text={t("navbar.logOutBtn")}
                bgCol="Red"
                textCol="white"
                onClick={handleLogOutClick}
              />
            </Link>
            <Link to="/addUser">
              <ButtonX
                text={t("navbar.addBtn")}
                bgCol="green"
                textCol="white"
              />
            </Link>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
