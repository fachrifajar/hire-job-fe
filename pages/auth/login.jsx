import React from "react";
import Head from "next/head";

const Login = () => {
  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="hire job" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <section id="login-page">
        <div className="container-fluid">
          <div className="row">
            <div className="col-6 left-side">
              <div className="left-side-overlay">
                {/* <img src="/auth/auth-image.jpeg" alt="auth background" /> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
