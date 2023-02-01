/* eslint-disable @next/next/no-img-element */
import React from "react";
import Head from "next/head";
import style from "../../../styles/register/main.module.scss";
import { useRouter } from "next/router";


const Login = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleRegisterUsers = () => {
    router.push("/auth/register/user");
  };

  const handleRegisterRecruiters = () => {
    router.push("/auth/register/recruiter");
  };

  const handleLogin = () => {
    router.push("/auth/login/main");
  };

  return (
    <>
      <Head>
        <title>Register</title>
        <meta name="description" content="hire job" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <main id={style["login-page-users"]}>
        <div className="container-fluid">
          <div className="row">
            <div className={`col-lg-6 col-12 ${style["left-side"]}`}>
              <h1 className="col-7">
                Discover talented and skilled developers in various fields of
                expertise
              </h1>
              <div className={style.logo}>
                <img
                  src="/images/logo-text.png"
                  width="100px"
                  alt="main-logo"
                />
              </div>
              <div className={style["left-side-overlay"]}></div>
            </div>
            {/* end of left content */}
            {/* right content */}
            <div className={`col-lg-6 col-12 d-flex ${style["right-side"]}`}>
              {/* input email */}
              <div className="button-group">
                <h2>Let's get started !</h2>
                <p>So, which one are you ?</p>
                <div className="d-grid">
                  <button
                    type="button"
                    className={`${style.button} mb-4 btn btn-primary`}
                    onClick={handleRegisterUsers}>
                    <strong>Sign Up </strong>as Developer
                  </button>
                  {/* <hr className={`my-4 ${style["button-line"]}`} /> */}
                  <button
                    type="button"
                    className={`${style.button} btn btn-primary`}
                    onClick={handleRegisterRecruiters}>
                    <strong>Sign Up </strong>as Recruiter
                  </button>
                </div>
                <p className={`my-3 ${style["no-account"]}`}>
                  Already have an account? &nbsp;
                  <a onClick={handleLogin}>
                    <span>Sign In</span>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Login;
