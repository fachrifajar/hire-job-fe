/* eslint-disable @next/next/no-img-element */
import React from "react";
import Head from "next/head";
import style from "../../../styles/register/user.module.scss";
import { useRouter } from "next/router";
import AuthContent from "@/components/molecules/authContent";
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";

const Login = (props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    const validateAcc = props.profile;
    if (validateAcc) {
      router.replace("/");
    }
  }, []);

  const handleLogin = () => {
    router.push("/auth/login/");
  };

  return (
    <>
      <Head>
        <title>Register User</title>
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
                <h2>Hello, Developer !</h2>
                <p>Create new account to access all features</p>

                <label for="text">Name</label>
                <input
                  type="text"
                  className="mb-3 form-control"
                  id="name"
                  placeholder="Enter your Name"
                  onChange={(event) => SetUsername(event.target.value)}
                />

                <label for="email">E-mail</label>
                <input
                  type="email"
                  className="mb-3 form-control"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  onChange={(event) => setEmail(event.target.value)}
                />

                <label for="phone-number">Phone Number</label>
                <input
                  type="number"
                  className="mb-3 form-control"
                  id="phone-number"
                  placeholder="Enter your Phone Number"
                  onChange={(event) => Setphone_number(event.target.value)}
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
                    // onClick={login}
                  >
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

                <p className={`my-4 ${style["no-account"]}`}>
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
