import LoginImage from "../static/file.png";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import SnackbarCustom from "./Snackbar";

const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;

const Register = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [passwordInputFieldType, setPasswordInputFieldType] =
    useState("password");
  const [isTermsAndConditionsChecked, setIsTermsAndConditionsChecked] =
    useState(false);
  const [isPrivacyAndPolicyChecked, setIsPrivacyAndPolicyChecked] =
    useState(false);
  const [userRegisterationData, setUserRegisterationData] = useState({});
  const [snackbarState, setSnackbarState] = useState({
    success: true,
    message: "",
  });
  const [showSnackBar, setShowSnackBar] = useState(false);
  const navigate = useNavigate();

  const PasswordVisible = () => {
    if (isPasswordVisible)
      return (
        <IoEye className="absolute right-[20px] top-[53px] cursor-pointer" />
      );
    return (
      <IoEyeOff className="absolute right-[20px] top-[53px] cursor-pointer" />
    );
  };

  useEffect(() => {
    setTimeout(() => {
      setShowSnackBar(false);
    }, 1200);
  }, [showSnackBar]);

  const handlePasswordVisiblity = () => {
    if (isPasswordVisible) {
      setIsPasswordVisible(false);
      setPasswordInputFieldType("password");
    } else {
      setIsPasswordVisible(true);
      setPasswordInputFieldType("text");
    }
  };

  const handleTermsAndConditionsClick = () => {
    if (isTermsAndConditionsChecked) {
      setIsTermsAndConditionsChecked(false);
    } else {
      setIsTermsAndConditionsChecked(true);
    }
  };

  const handlePrivacyAndPolicyClick = () => {
    if (isPrivacyAndPolicyChecked) {
      setIsPrivacyAndPolicyChecked(false);
    } else {
      setIsPrivacyAndPolicyChecked(true);
    }
  };

  const handleRegisteration = async () => {
    try {
      const response = await fetch(
        `${REACT_APP_SERVER_URL}/register?App_type=Xwarmup`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
          },
          method: "POST",
          credentials: "include",
          body: new URLSearchParams({
            fname: userRegisterationData.fname,
            lname: userRegisterationData.fname,
            password: userRegisterationData.password,
            email: userRegisterationData.email,
            App_type: "Xwarmup",
          }),
        }
      );
      const data = await response.json();
      if (!data.success) {
        setShowSnackBar(true);
        setSnackbarState({ message: data.message, success: data.success });
        return;
      }
      navigate("/login");
      return;
    } catch (error) {
      throw error;
    }
  };

  const RegisterButton = () => {
    if (isTermsAndConditionsChecked && isPrivacyAndPolicyChecked) {
      return (
        <button
          className="p-[16px] bg-[#481beb] rounded text-white text-[14px] font-[700] font-[HK Nova, sans-serif] mt-[16px] leading-[1.75]"
          onClick={handleRegisteration}
        >
          Register With Us
        </button>
      );
    } else {
      return (
        <button
          className="p-[16px] bg-[#00000042] rounded text-white text-[14px] font-[700] font-[HK Nova, sans-serif] mt-[16px] leading-[1.75]"
          disabled
        >
          Register With Us
        </button>
      );
    }
  };

  return (
    <div className="register">
      <div className="login-container flex">
        <div className="left-container w-1/2 h-screen">
          <img src={LoginImage} alt="Login Image" className="h-5/6 ml-auto" />
        </div>
        <div className="right-container w-1/2 flex justify-center items-center h-screen">
          <div
            className="card flex flex-col items-center self-center w-3/4 rounded-[40px] py-[2rem]"
            style={{ boxShadow: "rgba(50, 47, 85, 0.1) 0px 32px 100px" }}
          >
            <h1 className="text-[32px] font-[700] font-[HK Nova, sans-serif] mb-[32px]">
              Create a New Account
            </h1>
            <div className="input-fields flex flex-col w-[60%] h-full">
              <div className="user-info flex w-full">
                <div className="first-name w-1/2">
                  <label className="text-[14px] font-[600] font-[Inter, sans-serif] pb-[8px]">
                    First Name
                  </label>
                  <input
                    type="text"
                    placeholder="First Name"
                    className="py-[16.5px] px-[14px] bg-[#9491ad1a] rounded mb-[24px] w-full"
                    required
                    onChange={(e) => {
                      setUserRegisterationData((prevValue) => ({
                        ...prevValue,
                        fname: e.target.value,
                      }));
                    }}
                  />
                </div>
                <div className="last-name w-1/2 pl-[16px]">
                  <label className="text-[14px] font-[600] font-[Inter, sans-serif] pb-[8px]">
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="py-[16.5px] px-[14px] bg-[#9491ad1a] rounded mb-[24px] w-full"
                    required
                    onChange={(e) => {
                      setUserRegisterationData((prevValue) => ({
                        ...prevValue,
                        lname: e.target.value,
                      }));
                    }}
                  />
                </div>
              </div>
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
                    setUserRegisterationData((prevValue) => ({
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
                    setUserRegisterationData((prevValue) => ({
                      ...prevValue,
                      password: e.target.value,
                    }));
                  }}
                />
                <span onClick={handlePasswordVisiblity}>
                  <PasswordVisible />
                </span>
              </div>
              <br />
              <div className="rules px-[14px]">
                <ul className="list-disc">
                  <li>Password length must be Greater than 5</li>
                  <li>Must have one uppercase character</li>
                  <li>Must have one lowercase character</li>
                </ul>
              </div>
              <div className="terms-conditions mt-[15px] mr-[16px]">
                <span className="pr-[9px]">
                  <input
                    type="radio"
                    className="cursor-pointer"
                    checked={isTermsAndConditionsChecked}
                    onChange={handleTermsAndConditionsClick}
                  />
                </span>
                <label>I agree to Terms and Conditions</label>
              </div>
              <div className="privacy-policy mt-[15px] mr-[16px]">
                <span className="pr-[9px] cursor-pointer">
                  <input
                    type="radio"
                    className="cursor-pointer"
                    checked={isPrivacyAndPolicyChecked}
                    onChange={handlePrivacyAndPolicyClick}
                  />
                </span>
                <label>I agree to Privacy Policy</label>
              </div>
              <RegisterButton />
              <p className="mt-[16px] font-[HK Nova, sans-serif]">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-[#3d17c6] font-[14px] font-[700]"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      {showSnackBar ? (
        <SnackbarCustom
          message={snackbarState.message}
          sucess={snackbarState.success}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Register;
