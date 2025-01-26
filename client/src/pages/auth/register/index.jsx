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

const RegisterPage = () => {
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const registrationAPICall = useMutation({
    mutationFn: (payload) => AuthService().registrationAPI(payload),

    onSuccess: (response) => {
      showSnackbar("Registration successful!", "success");
      if (response.data.message === "User registered successfully") {
        navigate("/login");
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
    if (form.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (form.confirmPassword !== form.password)
      newErrors.confirmPassword = "Passwords do not match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      registrationAPICall.mutate(form);
    }
  };

  return (
    <Stack height="100vh" width="100vw" display="flex" justifyContent="center" alignItems="center" bgcolor="black">
      <Card sx={{ width: { sm: 400, md: 500, lg: 500 } }}>
        <CardHeader title="Registration" />
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
              <TextField
                variant="outlined"
                fullWidth
                placeholder="Confirm Password"
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
              />
              <Typography align="right" variant="body2">
                Already have an account?{" "}
                <Link href="/login" underline="hover">
                  Login
                </Link>
              </Typography>
              <Button
                variant="contained"
                fullWidth
                type="submit"
                disabled={registrationAPICall.isLoading}
              >
                {registrationAPICall.isPending ? "Registering..." : "Register"}
              </Button>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default RegisterPage;
