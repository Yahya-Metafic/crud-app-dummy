import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  useTheme,
} from "@mui/material";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { useTranslation } from "react-i18next";

interface DeleteConfirmationModalProps {
  setIsDeleteConfirmationModalOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  userId: string | undefined;
  fetchData: () => void;
}

const DeleteConfirmationModal = ({
  setIsDeleteConfirmationModalOpen,
  userId,
  fetchData,
}: DeleteConfirmationModalProps) => {
  const theme = useTheme();
  const handleCancle = () => {
    setIsDeleteConfirmationModalOpen(false);
  };
  const handleDelete = () => {
    const a = doc(db, "data", userId!);
    deleteDoc(a);
    fetchData();
    setIsDeleteConfirmationModalOpen(false);
  };
  const { t } = useTranslation();
  return (
    <Dialog
      open={true}
      sx={{
        "& .MuiBackdrop-root": {
          backgroundColor: "rgba(0, 0, 0, 0.4)", // semi-transparent dark
          backdropFilter: "blur(6px)", // blur effect
        },
        "& .MuiPaper-root": {
          borderRadius: 3,
          padding: 2,
          minWidth: 350,
          background: theme.palette.background.paper,
        },
      }}
    >
      <DialogTitle>{t("deleteModal.heading")}</DialogTitle>
      <DialogContent>
        <DialogContentText>{t("deleteModal.text")}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancle} variant="outlined">
          {t("deleteModal.cancelBtn")}
        </Button>
        <Button onClick={handleDelete} variant="contained" color="error">
          {t("deleteModal.deleteBtn")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationModal;
