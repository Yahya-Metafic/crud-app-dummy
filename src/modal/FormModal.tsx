import React, { useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import ButtonX from "../components/ButtonX";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { collection, addDoc, doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { MyContext } from "../hook/context";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { TFunction } from "i18next";

const getSchema = (t: TFunction) => {
  return z.object({
    name: z.string().min(3, { message: t("formModal.error.name") }),
    company: z.string().min(1, { message: t("formModal.error.company") }),
    email: z.string().email({ message: t("formModal.error.email") }),
    age: z.string().regex(/^\d+$/, { message: t("formModal.error.age") }),
    mobile: z
      .string()
      .regex(/^\d{10}$/, { message: t("formModal.error.mobile") }),
  });
};

const userSchema = z.object({
  name: z.string().min(3),
  company: z.string().min(1),
  email: z.string().email(),
  age: z.string().regex(/^\d+$/),
  mobile: z.string().regex(/^\d{10}$/),
});

type FormData = z.infer<typeof userSchema>;

export default function FormModal() {
  const { id } = useParams();
  const isEditMode = !!id;
  const { fetchData } = useContext(MyContext);
  const navigate = useNavigate();

  const { t } = useTranslation();
  const userSchema = getSchema(t);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSchema),
  });
  useEffect(() => {
    const func = async () => {
      const docRef = doc(db, "data", id!);
      const selectedUser = await getDoc(docRef);
      // console.log(id);
      if (selectedUser.data()) {
        reset(selectedUser.data());
      }
    };
    func();
  }, [id, reset]);

  const handleSub = async (data: FormData) => {
    if (isEditMode) {
      try {
        const a = doc(db, "data", id);
        await updateDoc(a, data);
        fetchData();
        navigate("/dashboard");
      } catch (error) {
        console.log("Error in updation : ", error);
      }
    } else {
      try {
        const doc = await addDoc(collection(db, "data"), data);
        fetchData();
        navigate("/dashboard");
      } catch (error) {
        console.log("Error in adding data : ", error);
      }
      reset();
    }
  };
  return (
    <>
      <div className="boxDiv">
        <div className="modalContainer">
          <div className="modalHeader" onClick={() => navigate("/dashboard")}>
            <h1 className="modalText">{t("formModal.heading")}</h1>
            <span className="closeBtn">X</span>
          </div>

          <Box
            component="form"
            sx={{ "& > :not(style)": { m: 1 } }}
            noValidate
            className="formBox"
            onSubmit={handleSubmit(handleSub)}
          >
            <TextField
              fullWidth
              label={t("formModal.name")}
              error={!!errors.name}
              helperText={errors.name?.message}
              variant="filled"
              {...register("name")}
            />
            <TextField
              fullWidth
              label={t("formModal.company")}
              error={!!errors.company}
              helperText={errors.company?.message}
              variant="filled"
              {...register("company")}
            />

            <div className="row">
              <TextField
                label={t("formModal.age")}
                variant="filled"
                error={!!errors.age}
                helperText={errors.age?.message}
                {...register("age")}
              />
              <TextField
                label={t("formModal.mobile")}
                error={!!errors.mobile}
                helperText={errors.mobile?.message}
                variant="filled"
                {...register("mobile")}
              />
            </div>

            <TextField
              fullWidth
              label={t("formModal.email")}
              error={!!errors.email}
              helperText={errors.email?.message}
              variant="filled"
              {...register("email")}
            />

            <div className="btnContainer">
              <ButtonX
                text={t("formModal.saveBtn")}
                bgCol="green"
                textCol="white"
                onClick={handleSubmit(handleSub)}
              />
            </div>
          </Box>
        </div>
      </div>
    </>
  );
}
