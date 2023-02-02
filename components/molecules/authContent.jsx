import React from "react";
import style from "../../styles/components/authContent.module.scss"

const AuthContent = () => {
  return (
    <div className={`col-lg-6 col-12 ${style["left-side"]}`}>
      <h1 className="col-7">
        Discover talented and skilled developers in various fields of expertise
      </h1>
      <div className={style.logo}>
        <img src="/images/logo-text.png" width="100px" alt="main-logo" />
      </div>
      <div className={style["left-side-overlay"]}></div>
    </div>
  );
};

export default AuthContent;
