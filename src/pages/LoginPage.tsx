import React, { useState } from "react";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { TFunction } from "i18next";

const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const { t } = useTranslation();
  const getLoginSchema = (t: TFunction) => {
    return z.object({
      username: z.string().min(1, t("login.usernameReq")),
      password: z.string().min(1, t("login.passwordReq")),
    });
  };
  const loginSchema = getLoginSchema(t);
  const [statusMessage, setStatusMessage] = useState<string>("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormInputs) => {
    const { username, password } = data;
    if (username === "ansari" && password === "ansari") {
      localStorage.setItem("token", "#12121");
      navigate("/dashboard");
    } else {
      setStatusMessage(t("login.error"));
    }
  };
  return (
    <Paper elevation={3} sx={{ maxWidth: 400, mx: "auto", mt: 8, p: 4 }}>
      <Typography variant="h5" gutterBottom>
        {t("login.heading")}
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label={t("login.username")}
          variant="outlined"
          {...register("username")}
          error={!!errors.username}
          helperText={errors.username?.message}
          fullWidth
        />

        <TextField
          label={t("login.password")}
          type="password"
          variant="outlined"
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
          fullWidth
        />

        <Button variant="contained" color="primary" type="submit">
          Login
        </Button>
      </Box>

      {statusMessage && (
        <Typography sx={{ mt: 2 }} color="error">
          {statusMessage}
        </Typography>
      )}
    </Paper>
  );
};

export default LoginPage;
