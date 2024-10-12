// RegisterPage.tsx

import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  FilledInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/features/userSlice";
import { RootState } from "../../redux/store";
import { Link, useNavigate } from "react-router-dom";
import { RegisterUserType } from "../../types/type";
import type { AppDispatch } from "../../redux/store"; // Import the AppDispatch type
import { toast } from "react-toastify";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>(); // Use AppDispatch type here
  const { user, error } = useSelector((state: RootState) => state.user);

  if (user) {
    return (window.location.href = "/");
  }

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => event.preventDefault();
  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) =>
    event.preventDefault();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userData: RegisterUserType = { name, email, password };
    dispatch(register(userData) as any); // Type assertion to `any` as a workaround
    toast.success("User registered successfully");
    navigate("/login");
  };

  return (
    <div className="w-full h-screen flex items-center">
      <div className="w-full flex items-center justify-center">
        <div className="border-8 rounded-sm border-double w-[80%] flex flex-col items-center justify-start p-10 gap-y-10 h-[500px] border-gray-500">
          <div className="flex flex-col gap-y-2">
            <h1 className="font-bold text-4xl">Sign Up</h1>
            <p>Please fill your information below</p>
          </div>
          <form
            className="flex flex-col gap-y-5 w-full"
            onSubmit={handleSubmit}
          >
            <TextField
              id="name"
              label="Name"
              variant="filled"
              color="warning"
              sx={{ width: "100%" }}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              id="email"
              label="Email"
              variant="filled"
              color="warning"
              sx={{ width: "100%" }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormControl className="w-full" variant="filled" color="warning">
              <InputLabel htmlFor="password">Password</InputLabel>
              <FilledInput
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      onMouseUp={handleMouseUpPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Button color="warning" variant="outlined" type="submit">
              Sign Up
            </Button>
            {error && <p className="text-red-500">{error}</p>}
            <div className="flex items-center justify-between text-xs">
              <p>
                Already have an account?{" "}
                <Link to="/login" className="text-yellow-500 underline">
                  Login
                </Link>
              </p>
              <p>
                Forgot your password?{" "}
                <Link
                  to="/forgot-password"
                  className="text-yellow-500 underline"
                >
                  Reset
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
