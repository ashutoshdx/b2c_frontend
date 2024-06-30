import LoginImage from "../../static/file.png";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import SnackbarCustom from "../Snackbar";

const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;

const LoginPage = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [passwordInputFieldType, setPasswordInputFieldType] =
    useState("password");
  const [loginData, setLoginData] = useState(null);
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [snackBarData, setSnackBarData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setShowSnackBar(false);
    }, 1200);
  }, [showSnackBar]);

  const PasswordVisible = () => {
    if (isPasswordVisible)
      return (
        <IoEye className="absolute right-[20px] top-[53px] cursor-pointer" />
      );
    return (
      <IoEyeOff className="absolute right-[20px] top-[53px] cursor-pointer" />
    );
  };

  const handlePasswordVisiblity = () => {
    if (isPasswordVisible) {
      setIsPasswordVisible(false);
      setPasswordInputFieldType("password");
    } else {
      setIsPasswordVisible(true);
      setPasswordInputFieldType("text");
    }
  };

  const handleLoginClick = async () => {
    try {
      const response = await fetch(`${REACT_APP_SERVER_URL}/login`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        method: "POST",
        credentials: "include",
        body: new URLSearchParams({
          email: loginData.email,
          password: loginData.password,
        }),
      });
      const data = await response.json();
      if (!data.success) {
        setShowSnackBar(true);
        setSnackBarData({
          message: data.message,
          success: data.success,
        });
        return;
      }
      navigate("/dashboard/email-accounts");
      return;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container flex">
        <div className="left-container w-1/2 h-screen">
          <img src={LoginImage} alt="Login Image" className="h-5/6 ml-auto" />
        </div>
        <div className="right-container w-1/2 flex justify-center items-center">
          <div
            className="card flex items-center justify-center flex-col w-3/4 h-2/3 rounded-[40px]"
            style={{ boxShadow: "rgba(50, 47, 85, 0.1) 0px 32px 100px" }}
          >
            <h1 className="text-[32px] font-[700] font-[HK Nova, sans-serif] mb-[32px]">
              Hey Welcome back!
            </h1>
            <div className="input-fields flex flex-col w-[55%]">
              <div className="email-info flex flex-col">
                <label className="text-[14px] font-[600] font-[Inter, sans-serif] pb-[8px]">
                  Email
                </label>
                <input
                  type="text"
                  placeholder="Enter Your Email"
                  className="py-[16.5px] px-[14px] bg-[#9491ad1a] rounded mb-[24px]"
                  required
                  onChange={(e) => {
                    setLoginData((prevValue) => ({
                      ...prevValue,
                      email: e.target.value,
                    }));
                  }}
                />
              </div>
              <div className="password-info flex flex-col relative">
                <label className="text-[14px] font-[600] font-[Inter, sans-serif] pb-[8px]">
                  Password
                </label>
                <input
                  type={passwordInputFieldType}
                  placeholder="Enter Your Password"
                  className="py-[16.5px] px-[14px] bg-[#9491ad1a] rounded"
                  required
                  onChange={(e) => {
                    setLoginData((prevValue) => ({
                      ...prevValue,
                      password: e.target.value,
                    }));
                  }}
                />
                <span onClick={handlePasswordVisiblity}>
                  <PasswordVisible />
                </span>
              </div>
              <div className="forgot-pass flex justify-end pt-[8px]">
                <p className="text-[14px] font-[500] font-[Inter, sans-serif] cursor-pointer">
                  Forgot Password
                </p>
              </div>
              <button
                className="p-[16px] bg-[#481beb] rounded text-white text-[14px] font-[700] font-[HK Nova, sans-serif] mt-[16px] leading-[1.75]"
                onClick={handleLoginClick}
              >
                Login
              </button>
              <p className="mt-[16px] font-[HK Nova, sans-serif]">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-[#3d17c6] font-[14px] font-[700]"
                >
                  Sign Up Here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      {showSnackBar ? (
        <SnackbarCustom
          message={snackBarData.message}
          sucess={snackBarData.success}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default LoginPage;
