/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from "react";
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
import { BiCodeAlt } from "react-icons/bi";
import { RxCross1 } from "react-icons/rx";
import Navbar from "@/components/organisms/navbar";
import Spinner from "@/components/atoms/spinner";
import Link from "next/link";
import nextConfig from "@/next.config";

const Jobs = (props) => {
  const router = useRouter();
  // const JobList = props.JobList;
  // console.log(JobList.data.rows[0]);

  const [isAuth, setIsAuth] = React.useState(false);
  const [getData, setGetData] = React.useState(null);
  const [getToken, setGetToken] = React.useState(null);
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [getJobList, setGetJobList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [selectedTab, setSelectedTab] = React.useState("portfolios");

  const dummy = {
    portfolios: [
      "/images/auth-image.jpeg",
      "/images/firewatch.jpg",
      "/images/auth-image.jpeg",
      "/images/firewatch.jpg",
      "/images/auth-image.jpeg",
      "/images/firewatch.jpg",
    ],
    portfoliosName: [
      "Project-1",
      "Project-2",
      "Project-3",
      "Project-4",
      "Project-5",
      "Project-6",
    ],

    experiences: ["/images/firewatch.jpg", "/images/auth-image.jpeg"],
  };

  const handleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  React.useEffect(() => {
    let token = props.token;
    let profile = props.profile;

    if (props.token && props.profile) {
      const convertData = JSON.parse(props.profile);

      setGetData(convertData);
      setGetToken(token);
      setIsAuth(true);
    }
  }, []);

  const memoizedJobList = React.useMemo(() => {
    if (props.JobList !== undefined) {
      return props.JobList.data;
    }
    return [];
  }, [props.JobList]);

  React.useEffect(() => {
    setGetJobList(memoizedJobList.rows);

    setIsLoading(false);
    // console.log("memoized");
    // console.log(memoizedJobList.rows);
    // console.log(memoizedJobList.count);
  }, [memoizedJobList]);

  const profPict = getData?.photo_profile;

  const handleLogout = () => {
    deleteCookie("profile");
    deleteCookie("token");
    // router.push("/jobs");
    window.location.reload();
  };

  const handleLogin = () => {
    router.push("/auth/login");
  };

  const handleSignup = () => {
    router.push("/auth/register");
  };

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
              <img src="../../../images/blank-profile.png" alt="user pp" />
              <div className={style["text-content"]}>
                <h2>{nameFilter("fachri fajar firmansyah")}</h2>
                <p>Fullstack Developer</p>
                <div
                  className={`d-flex align-items-center gap-2 ${style["card-icon"]}`}>
                  <FaMapMarkerAlt className={style["react-icons-3"]} />
                  <p className="">Jakarta</p>
                </div>
                <p className={`${style["description"]}`}>
                  A Fullstack Developer, excellent in both Frontend and Backend.
                  Involved in many complicated project such as...
                </p>
                <button className={`btn btn-primary`} type="button">
                  Hire
                </button>
                <h4>Skill</h4>
                <div className={`${style["skill-badges"]}`}>
                  <span
                    className={`badge text-bg-warning ${style["skill-badge"]}`}>
                    Javascript
                  </span>
                  <span
                    className={`badge text-bg-warning ${style["skill-badge"]}`}>
                    Javascript
                  </span>
                  <span
                    className={`badge text-bg-warning ${style["skill-badge"]}`}>
                    Golang
                  </span>
                  <span
                    className={`badge text-bg-warning ${style["skill-badge"]}`}>
                    PHP
                  </span>
                  <span
                    className={`badge text-bg-warning ${style["skill-badge"]}`}>
                    Typescript
                  </span>
                  <span
                    className={`badge text-bg-warning ${style["skill-badge"]}`}>
                    Postgres
                  </span>
                  <span
                    className={`badge text-bg-warning ${style["skill-badge"]}`}>
                    Javascript
                  </span>
                  <span
                    className={`badge text-bg-warning ${style["skill-badge"]}`}>
                    Javascript
                  </span>
                  <span
                    className={`badge text-bg-warning ${style["skill-badge"]}`}>
                    Javascript
                  </span>
                  <span
                    className={`badge text-bg-warning ${style["skill-badge"]}`}>
                    Javascript
                  </span>
                  <span
                    className={`badge text-bg-warning ${style["skill-badge"]}`}>
                    Javascript
                  </span>
                </div>

                {/* <span
                  className={`badge text-bg-warning mx-1 ${style["skill-badge"]}`}>
                  +{job?.skills.slice(3, job?.skills?.length)?.length}
                </span> */}

                <div className={style["left-icons"]}>
                  <p>
                    <span>
                      <FaRegEnvelope />
                    </span>
                    xxx@gmail.com
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
                  {dummy[selectedTab].map((image, index) => (
                    <div className={`card ${style["card-container"]}`}>
                      <img
                        key={index}
                        src={image}
                        className="card-img-top"
                        alt="..."
                      />
                      <div className={`${style["card-body"]}`}>
                        <a href="#">
                          <h5 className="card-title">Card title</h5>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={`${style["exp-container"]}`}>
                  <div className={style["exp-detail"]}>
                    <div className={style["exp-text"]}>
                      <h5>Engineer</h5>
                      <p>Tokopedia</p>
                      <p>1 January 2022 - 1 February 2023</p>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Perferendis amet explicabo delectus facilis reiciendis,
                        officiis temporibus facere quidem ea quibusdam excepturi
                        labore, maxime placeat repellat deleniti consectetur
                        quis ullam ipsum!
                      </p>
                      <hr />
                    </div>
                  </div>
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

export const getServerSideProps = async (context) => {
  const connect = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/v1/user/list?limit=10&page=1`
  );

  const convertData = connect.data;
  // console.log(convertData);

  const token = getCookie("token", context) || "";
  const profile = getCookie("profile", context) || "";
  // console.log(token);
  // console.log(profile);

  return {
    props: {
      JobList: convertData,
      token,
      profile,
    },
  };
};

export default Jobs;
