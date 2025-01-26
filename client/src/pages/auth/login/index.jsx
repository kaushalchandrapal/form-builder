import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { AuthService } from "../../../api";
import { useSnackbar } from "../../../contexts/snackbar";

const LoginPage = () => {
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const loginAPICall = useMutation({
    mutationFn: (payload) => AuthService().loginAPI(payload),

    onSuccess: (response) => {
      showSnackbar("Login successful!", "success");
      if (response.data.token) {
        localStorage.setItem("authToken", response.data.token);
        navigate("/dashboard");
      }
    },
    onError: (error) => {
      showSnackbar(error.response?.data?.message || "Something went wrong!", "error");
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.username) newErrors.username = "Username is required";
    if (!form.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      loginAPICall.mutate(form);
    }
  };

  return (
    <Stack height="100vh" width="100vw" display="flex" justifyContent="center" alignItems="center" bgcolor="black">
      <Card sx={{ width: { sm: 400, md: 500, lg: 500 } }}>
        <CardHeader title="Login" />
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                variant="outlined"
                fullWidth
                placeholder="Username"
                label="Username"
                name="username"
                value={form.username}
                onChange={handleChange}
                error={!!errors.username}
                helperText={errors.username}
              />
              <TextField
                variant="outlined"
                fullWidth
                placeholder="Password"
                label="Password"
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
              />
              <Typography align="right" variant="body2">
                New user?{" "}
                <Link href="/register" underline="hover">
                  Register
                </Link>
              </Typography>
              <Button
                variant="contained"
                fullWidth
                type="submit"
                disabled={loginAPICall.isLoading}
              >
                {loginAPICall.isPending ? "Logging in..." : "Login"}
              </Button>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default LoginPage;
