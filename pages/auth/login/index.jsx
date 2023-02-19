/* eslint-disable @next/next/no-img-element */
import React from "react";
import Head from "next/head";
import style from "../../../styles/auth/login.module.scss";
import { useRouter } from "next/router";
import axios from "axios";
import AuthContent from "@/components/molecules/authContent";
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";
import { useSelector, useDispatch } from "react-redux";
import * as auth from "@/store/reducer/auth";

const Login = (props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isError, setIsError] = React.useState(false);
  const [errMsg, setErrMsg] = React.useState("");

  //REDUX
  const dispatch = useDispatch();
  // const auth = useSelector((state) => state);
  // console.log(auth);

  React.useEffect(() => {
    const validateAcc = props.profile;
    if (validateAcc) {
      router.replace("/");
    }
  }, []);

  const handleSubmit = async () => {
    try {
      if (!document.getElementById("terms").checked) {
        setIsError(true);
        setErrMsg("Please agree to the terms and conditions to continue.");
        return;
      }

      setIsLoading(true);

      const connect = await axios.post("/api/login", {
        email,
        password,
      });

      setCookie("token", connect?.data?.token, {
        maxAge: 60 * 6 * 24,
      });
      setCookie("profile", JSON.stringify(connect?.data?.data), {
        maxAge: 60 * 6 * 24,
      });

      //REDUX
      const isRecruiter = connect?.data?.data?.recruiter_id !== 0;

      dispatch(auth.setAuthToken(connect?.data?.token));
      dispatch(auth.setAuthProfile(connect?.data?.data));
      dispatch(auth.setAuthIsRecruiter(isRecruiter));

      setIsLoading(false);
      setIsError(false);
      router.push("/jobs");
    } catch (error) {
      // console.log(error?.response);
      setIsLoading(false);
      setIsError(true);
      setErrMsg(
        error?.response?.data?.messages ??
          error?.response?.data?.message?.email?.message ??
          error?.response?.data?.message?.password?.message ??
          "Internal server error, please try again later"
      );
    }
  };

  const handleForgotPassword = () => {
    router.push("/forgot-password");
  };

  const handleSignUp = () => {
    router.push("/auth/register/");
  };

  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="hire job" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <main id={style["login-page-users"]}>
        <div className="container-fluid">
          <div className="row">
            {/* left content */}

            <AuthContent />

            {/* end of left content */}
            {/* right content */}
            <div className={`col-lg-6 col-12 d-flex ${style["right-side"]}`}>
              {/* input email */}
              <div className="form-group">
                <h2>Hello, Pewpeople</h2>
                <p>Log in into your existing account</p>

                {isError ? (
                  <div className="alert alert-danger" role="alert">
                    {errMsg}
                  </div>
                ) : null}

                <label for="email">E-mail</label>
                <input
                  type="email"
                  className="mb-3 form-control"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  onChange={(event) => setEmail(event.target.value)}
                />
                {/* end of input email */}
                {/* input password */}
                <label for="password">Password</label>
                <input
                  type="password"
                  className="mb-3 form-control"
                  id="password"
                  autocomplete="current-password"
                  placeholder="Enter password"
                  onChange={(event) => setPassword(event.target.value)}
                />
                {/* end of input password */}
                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="terms"
                  />
                  <label className="form-check-label" for="terms">
                    I agree to the terms & conditions
                  </label>
                </div>
                <div className="d-grid">
                  <button
                    type="button"
                    className={`${style.button} btn btn-primary ${
                      isLoading ? "btn-loading" : ""
                    }`}
                    onClick={handleSubmit}
                    disabled={isLoading}>
                    {isLoading ? (
                      <span
                        class="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"></span>
                    ) : (
                      ""
                    )}
                    {isLoading ? "Loading..." : "Log in"}
                  </button>
                </div>
                <a
                  className={style["forgot-password"]}
                  onClick={handleForgotPassword}>
                  Forgot Password?
                </a>
                <p className={style["no-account"]}>
                  Don&apos;t have an account? &nbsp;
                  <a onClick={handleSignUp}>
                    <span>Sign Up</span>
                  </a>
                </p>
              </div>
              {/* end of right content*/}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export const getServerSideProps = async (context) => {
  const token = getCookie("token", context) || "";
  const profile = getCookie("profile", context) || "";

  return {
    props: {
      token,
      profile,
    },
  };
};

export default Login;
