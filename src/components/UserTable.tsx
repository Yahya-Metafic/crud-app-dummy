import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteBtn from "./DeleteBtn";
import EditBtn from "./EditBtn";
import { useState } from "react";
import { useContext } from "react";
import { MyContext } from "../hook/context";
import { Link } from "react-router-dom";
import DeleteConfirmationModal from "../modal/DeleteConfirmationModal";
import { useTranslation } from "react-i18next";

interface UserType {
  id: string;
  name: string;
  company: string;
  age: string;
  mobile: string;
  email: string;
}

export default function UserTable() {
  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] =
    useState(false);
  const [userId, setUserId] = useState<string | undefined>(undefined);

  const { t } = useTranslation();

  const tableHead = [
    t("table.heading.name"),
    t("table.heading.company"),
    t("table.heading.age"),
    t("table.heading.mobile"),
    t("table.heading.email"),
    t("table.heading.actions"),
  ];
  const { data, fetchData } = useContext(MyContext);

  const handleDeleteBtn = (id: string) => {
    setIsDeleteConfirmationModalOpen(true);
    setUserId(id);
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ bgcolor: "lightgray" }}>
              {tableHead.map((item, index) => (
                <TableCell key={index} sx={{ fontWeight: "bolder" }}>
                  {item}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {[...data]?.reverse().map((item: UserType, index: number) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {item.name}
                </TableCell>
                <TableCell align="left">{item.company}</TableCell>
                <TableCell align="left">{item.age}</TableCell>
                <TableCell align="left">{item.mobile}</TableCell>
                <TableCell align="left">{item.email}</TableCell>
                <TableCell align="left">
                  <Link to={`/editUser/${item.id}`}>
                    <EditBtn />
                  </Link>
                  <DeleteBtn onClickDelete={() => handleDeleteBtn(item.id)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {isDeleteConfirmationModalOpen && (
        <DeleteConfirmationModal
          setIsDeleteConfirmationModalOpen={setIsDeleteConfirmationModalOpen}
          userId={userId}
          fetchData={fetchData}
        />
      )}
    </>
  );
}
