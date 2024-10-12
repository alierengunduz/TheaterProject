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
import { login } from "../../redux/features/userSlice"; // Import the login action
import { RootState } from "../../redux/store";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppDispatch } from "../../redux/store"; // Import the AppDispatch type
import { images } from "../../assets/images/assets";
const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Giriş işlemi için dispatch çağrısını bekle
    const resultAction = await dispatch(login({ email, password }));

    // Eğer giriş başarılı olduysa
    if (login.fulfilled.match(resultAction)) {
      toast.success("Logged in successfully");
      navigate("/"); // Başarılı girişte dashboard'a yönlendir
    }

    // Eğer giriş başarısız olduysa
    if (login.rejected.match(resultAction)) {
      toast.error("Login failed. Please check your credentials."); // Hata mesajı göster
    }
  };

  return (
    <div className="w-full h-screen flex items-center">
      <div className="w-full flex items-center justify-center">
        <div className="border-8 rounded-sm border-double w-[80%] flex flex-col items-center justify-start p-10 gap-y-10 h-[500px] border-gray-500">
          <div className="flex flex-col gap-y-2">
            <h1 className="font-bold text-4xl">Sign In</h1>
            <p>Please fill in your information below</p>
          </div>
          <form
            className="flex flex-col gap-y-5 w-full"
            onSubmit={handleSubmit}
          >
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
              Sign In
            </Button>
            {error && <p className="text-red-500">{error}</p>}
            <div className="flex items-center justify-between text-xs">
              <p>
                Don't have an account?{" "}
                <Link to="/register" className="text-yellow-500 underline">
                  Sign Up
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

export default LoginPage;
