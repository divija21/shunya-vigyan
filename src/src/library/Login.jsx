import { BsFillShieldLockFill, BsTelephoneFill, BsX } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import OtpInput from "otp-input-react";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "../firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import GoogleLogo from "../assets/GoogleLogo.png";
import { useNavigate } from "react-router-dom";
import Gitlogo from '../assets/Gitlogo.png'
const Login = () => {
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);
  const googleProvider = new GoogleAuthProvider();
  const navigate = useNavigate();
  // const githubProvider = new GithubAuthProvider();

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignup();
          },
          "expired-callback": () => {},
        }
      );
    }
  }

  const signWithGoogle = () => {
    signInWithPopup(auth, googleProvider).then((res) => {
      setUser(res.user);
      localStorage.setItem("libuser", JSON.stringify(res.user));
      navigate('/');
    })
  }

  // const signWithGithub = () => {
  //   signInWithPopup(auth, githubProvider).then((res) => {
  //     setUser(res.user);
  //     localStorage.setItem("libuser", JSON.stringify(res.user));
  //     navigate('/');
  //   })
  // }

  function onSignup() {
    setLoading(true);
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;

    const formatPh = "+" + ph;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("OTP sent successfully!");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
        setUser(res.user);
        localStorage.setItem("libuser", JSON.stringify(res.user));
        setLoading(false);
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  const handleClose = () => {
    // Handle closing the login page
    // For example, navigate away or close a modal
    navigate('/')
  };

  return (
    <section className="flex items-center justify-center h-screen">
      <div className="relative bg-white p-8 rounded-lg shadow-xl w-[40vw]">
        <Toaster toastOptions={{ duration: 4000 }} />
        <button
          className="absolute top-1 right-1 text-gray-500 hover:text-gray-700 transition duration-300"
          onClick={handleClose}
        >
          <BsX size={44} />
        </button>
        <div id="recaptcha-container"></div>
        {user ? (
          ''
        ) : (
          <div className="flex flex-col gap-4">
            <h1 className="text-center text-3xl font-medium text-[rgb(13,110,253)] mb-6">
              Welcome to <br /> Shuniya Vigyan
            </h1>
            {showOTP ? (
              <>
                <div className="bg-[rgb(13,110,253)] text-black rounded-full w-max mx-auto p-4">
                  <BsFillShieldLockFill size={30}/>
                </div>
                <label className="text-xl font-bold text-[rgb(13,110,253)] text-center">
                  Enter your OTP
                </label>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  OTPLength={6}
                  otpType="number"
                  disabled={false}
                  autoFocus
                  className="opt-container "
                ></OtpInput>
                <button
                  onClick={onOTPVerify}
                  className="bg-[rgb(13,110,253)] w-full flex items-center justify-center py-2.5 text-white rounded"
                >
                  {loading && (
                    <CgSpinner size={20} className="animate-spin" />
                  )}
                  <span>Verify OTP</span>
                </button>
              </>
            ) : (
              <>
                <div className="bg-[rgb(13,110,253)] text-white rounded-full w-max mx-auto p-4">
                  <BsTelephoneFill size={30} />
                </div>
                <label className="text-xl font-bold text-[rgb(13,110,253)] text-center">
                  Verify your phone number
                </label>
                <PhoneInput country={"in"} value={ph} onChange={setPh} />
                <button
                  onClick={onSignup}
                  className="bg-[rgb(13,110,253)] w-full flex items-center justify-center py-2.5 text-white rounded"
                >
                  {loading && (
                    <CgSpinner size={20} className="animate-spin" />
                  )}
                  <span>Send code via SMS</span>
                </button>
              </>
            )}
            <div className="text-center my-2">Or?</div>
            <div className="text-center mt-1">
              <button
                className="border border-gray-300 rounded px-3 py-2 shadow-sm flex items-center justify-center w-full bg-white text-gray-600 transition duration-300 hover:bg-gray-100"
                onClick={signWithGoogle}
              >
                <img src={GoogleLogo} className="w-5 mr-2" alt="" />
                <span>Sign In with Google</span>
              </button>
            </div>
            {/* <div className="text-center mt-1">
              <button
                className="border border-gray-300 rounded px-3 py-2 shadow-sm flex items-center justify-center w-full bg-white text-gray-600 transition duration-300 hover:bg-gray-100"
                onClick={signWithGithub}
              >
                <img src={Gitlogo} className="w-5 mr-2" alt="" />
                <span>Sign In with Github</span>
              </button>
            </div> */}
          </div>
        )}
      </div>
    </section>
  );
};

export default Login;
