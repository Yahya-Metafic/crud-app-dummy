import React from "react";
import Navbar from "../components/Navbar.tsx";
import UserTable from "../components/UserTable.js";

function HomePage() {
  return (
    <>
      <Navbar />
      <UserTable />
    </>
  );
}

export default HomePage;
