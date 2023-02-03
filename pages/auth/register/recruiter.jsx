/* eslint-disable @next/next/no-img-element */
import React from "react";
import Head from "next/head";
import style from "../../../styles/register/recruiter.module.scss";
import { useRouter } from "next/router";
import axios from "axios";
import AuthContent from "@/components/molecules/authContent";
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";

const Login = (props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [position, setPosition] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [ReEnterPassword, SetReEnterPassword] = React.useState("");
  const [isError, setIsError] = React.useState(false);
  const [errMsg, setErrMsg] = React.useState("");

  const handleLogin = () => {
    router.push("/auth/login/");
  };

  React.useEffect(() => {
    const validateAcc = props.profile;
    if (validateAcc) {
      router.replace("/");
    }
  }, []);

  const handleRegister = async () => {
    try {
      if (!document.getElementById("terms").checked) {
        setIsError(true);
        setErrMsg("Please agree to the terms and conditions to continue.");
        return;
      }
      if (!ReEnterPassword) {
        setIsError(true);
        setErrMsg("Re-enter password cannot be blank.");
        return;
      }
      if (ReEnterPassword !== password) {
        setIsError(true);
        setErrMsg("Re-entered password does not match the password.");
        return;
      }

      setIsLoading(true);

      const connect = await axios.post("/api/registerRecruiter", {
        fullname: username,
        email,
        company,
        position,
        phone_number: phoneNumber,
        password,
      });
      setIsLoading(false);
      setIsError(false);
      router.push("/auth/login/");
    } catch (error) {
      // console.log(error?.response);
      setIsLoading(false);
      setIsError(true);
      setErrMsg(
        error?.response?.data?.messages ??
          error?.response?.data?.message?.fullname?.message ??
          error?.response?.data?.message?.email?.message ??
          error?.response?.data?.message?.company?.message ??
          error?.response?.data?.message?.position?.message ??
          error?.response?.data?.message?.password?.message ??
          "Internal server error, please try again later"
      );
    }
  };

  return (
    <>
      <Head>
        <title>Register Recruiter</title>
        <meta name="description" content="hire job" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <main id={style["register-page-users"]}>
        <div className="container-fluid">
          <div className="row">
            {/* left content */}
            <AuthContent />
            {/* end of left content */}
            {/* right content */}
            <div className={`col-lg-6 col-12 d-flex ${style["right-side"]}`}>
              <div className="form-group">
                <h2>Hello, Recruiter !</h2>
                <p>Create new account to access all features</p>
                {/* <p>Create new account to access all features</p> */}

                {isError ? (
                  <div class="alert alert-danger" role="alert">
                    {errMsg}
                  </div>
                ) : null}

                <label for="text">Name</label>
                <input
                  type="text"
                  className="mb-3 form-control"
                  id="name"
                  placeholder="Enter your Name"
                  onChange={(event) => setUsername(event.target.value)}
                />

                <label for="email">E-mail</label>
                <input
                  type="email"
                  className="mb-3 form-control"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="Enter your Email"
                  onChange={(event) => setEmail(event.target.value)}
                />

                <label for="text">Company</label>
                <input
                  type="text"
                  className="mb-3 form-control"
                  id="company"
                  placeholder="Enter your Company"
                  onChange={(event) => setCompany(event.target.value)}
                />

                <label for="text">Position</label>
                <input
                  type="text"
                  className="mb-3 form-control"
                  id="position"
                  placeholder="Enter your Position"
                  onChange={(event) => setPosition(event.target.value)}
                />

                <label for="phone-number">Phone Number</label>
                <input
                  type="number"
                  className="mb-3 form-control"
                  id="phone-number"
                  placeholder="Enter your Phone Number"
                  onChange={(event) => setPhoneNumber(event.target.value)}
                />

                <label for="password">Password</label>
                <input
                  type="password"
                  className="mb-3 form-control"
                  id="password"
                  autocomplete="current-password"
                  placeholder="Enter Password"
                  onChange={(event) => setPassword(event.target.value)}
                />

                <label for="re-enter-password">Confirm Password</label>
                <input
                  type="password"
                  className="mb-4 form-control"
                  id="re-enter-password"
                  placeholder="Re-Enter Password"
                  onChange={(event) => SetReEnterPassword(event.target.value)}
                />

                <div className="mb-2 form-check">
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
                    disabled={isLoading}
                    onClick={handleRegister}>
                    {isLoading ? (
                      <span
                        class="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"></span>
                    ) : (
                      ""
                    )}
                    {isLoading ? "Loading..." : "Sign Up"}
                  </button>
                </div>

                <p className={`mt-4 ${style["no-account"]}`}>
                  Already have an account? &nbsp;
                  <a onClick={handleLogin}>
                    <span>Log in here</span>
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
