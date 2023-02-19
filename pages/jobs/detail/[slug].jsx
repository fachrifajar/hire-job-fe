/* eslint-disable @next/next/no-img-element */
import React from "react";
import Head from "next/head";
import axios from "axios";
import { useRouter } from "next/router";
import style from "@/styles/jobs/detail.module.scss";
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";
import {
  FaRegBell,
  FaRegEnvelope,
  FaMapMarkerAlt,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";
import Navbar from "@/components/organisms/navbar";
import * as user from "@/store/reducer/user";
import { useSelector, useDispatch } from "react-redux";

const Jobs = (props) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = React.useState(true);
  const [selectedTab, setSelectedTab] = React.useState("portfolios");

  const user = useSelector((state) => state);

  // console.log(user?.user?.data);

  const capitalize = (str) => {
    return str.replace(/(^\w|\s\w)/g, function (letter) {
      return letter.toUpperCase();
    });
  };

  const nameFilter = (str) => {
    return str.replace(
      /^(\b\w+\b)\s+(\b\w+\b)(?:\s+(\b\w+\b))?.*$/i,
      function (match, firstWord, secondWord, thirdWord = "") {
        return (
          firstWord.charAt(0).toUpperCase() +
          firstWord.slice(1) +
          " " +
          secondWord.charAt(0).toUpperCase() +
          secondWord.slice(1) +
          (thirdWord ? " " + thirdWord.charAt(0).toUpperCase() : "")
        );
      }
    );
  };

  return (
    <>
      <Head>
        <title>Detail</title>
        <meta name="description" content="hire job" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <main id={`${style["detail-page"]}`}>
        <Navbar />

        <section id={style["detail-content"]}>
          <div className={`container ${style["container"]}`}>
            <div className={`${style["left-content"]}`}>
              <img
                src={user?.user?.data?.data?.user?.photo_profile}
                alt="user pp"
              />
              <div className={style["text-content"]}>
                <h2>
                  {nameFilter(
                    capitalize(user?.user?.data?.data?.user?.fullname)
                  )}
                </h2>
                <p>{capitalize(user?.user?.data?.data?.job)}</p>
                <div
                  className={`d-flex align-items-center gap-2 ${style["card-icon"]}`}>
                  <FaMapMarkerAlt className={style["react-icons-3"]} />
                  <p className="">
                    {capitalize(user?.user?.data?.data?.domicile)}
                  </p>
                </div>
                <p className={`${style["description"]}`}>
                  {user?.user?.data?.data?.description}
                </p>
                <button
                  className={`btn btn-primary`}
                  type="button"
                  onClick={() => {
                    router.push(`/jobs/detail/hire/${user?.id}`);
                  }}>
                  Hire
                </button>
                <h4>Skill</h4>

                {JSON.parse(user?.user?.data?.data?.skills).length !== 0 ? (
                  <React.Fragment>
                    <div className={`${style["skill-badges"]}`}>
                      {JSON.parse(user?.user?.data?.data?.skills).length <= 3
                        ? JSON.parse(user?.user?.data?.data?.skills).map(
                            (item, key) => (
                              <span
                                className={`badge text-bg-warning ${style["skill-badge"]}`}
                                key={key}>
                                {item}
                              </span>
                            )
                          )
                        : JSON.parse(user?.user?.data?.data?.skills)
                            .slice(0, 3)
                            .map((item, key) => (
                              <span
                                className={`badge text-bg-warning ${style["skill-badge"]}`}
                                key={key}>
                                {item}
                              </span>
                            ))}
                      {JSON.parse(user?.user?.data?.data?.skills).length >
                        3 && (
                        <span
                          className={`badge text-bg-warning mx-1 ${style["skill-badge"]}`}>
                          +
                          {
                            JSON.parse(user?.user?.data?.data?.skills).slice(
                              3,
                              JSON.parse(user?.user?.data?.data?.skills).length
                            ).length
                          }
                        </span>
                      )}
                    </div>
                  </React.Fragment>
                ) : (
                  "-"
                )}

                <div className={style["left-icons"]}>
                  <p>
                    <span>
                      <FaRegEnvelope />
                    </span>
                    {user?.user?.data?.data?.user?.email}
                  </p>
                  <p>
                    <span>
                      <FaGithub />
                    </span>
                    github.com/xxx
                  </p>
                  <p>
                    <span>
                      <FaLinkedin />
                    </span>
                    linkedin.com/xxx
                  </p>
                </div>
              </div>
            </div>

            <div className={`${style["right-content"]}`}>
              <div className={style["top"]}>
                <div
                  className={`${
                    selectedTab === "portfolios" ? style["active"] : ""
                  } ${style["portfolios"]}`}
                  onClick={() => setSelectedTab("portfolios")}>
                  <h2>Portfolios</h2>
                </div>
                <div
                  className={`${
                    selectedTab === "experiences" ? style["active"] : ""
                  } ${style["experiences"]}`}
                  onClick={() => setSelectedTab("experiences")}>
                  <h2>Experiences</h2>
                </div>
              </div>
              {selectedTab === "portfolios" ? (
                <div className={`${style["portfolio-container"]}`}>
                  {user?.user?.data?.data?.portfolios.map((item, key) => (
                    <React.Fragment key={key}>
                      <div className={`card ${style["card-container"]}`}>
                        <img
                          src={item?.photo}
                          className="card-img-top"
                          alt="..."
                        />
                        <div className={`${style["card-body"]}`}>
                          <a href="#">
                            <h5 className="card-title">{item?.name}</h5>
                          </a>
                        </div>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              ) : (
                <div className={`${style["exp-container"]}`}>
                  {user?.user?.data?.data?.work_experiences.map((item, key) => (
                    <React.Fragment key={key}>
                      <div className={style["exp-detail"]}>
                        <div className={style["exp-text"]}>
                          <h5>{item?.position}</h5>
                          <p>{item?.company}</p>
                          <p>{item?.test}</p>
                          <p>{item?.description}</p>
                          <hr />
                        </div>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className={style.footer}>
        <img className={style.logo} src="/images/logo-text.png" alt="logo" />
        <hr className={style.hr} />
        <div className={style.info}>
          <p>Copyright © 2023 Peworld</p>
          <p>All rights reserved</p>
        </div>
      </footer>
    </>
  );
};

export default Jobs;
