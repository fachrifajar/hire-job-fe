/* eslint-disable @next/next/no-img-element */
import React from "react";
import Head from "next/head";
import axios from "axios";
import { useRouter } from "next/router";
import style from "../../styles/jobs/index.module.scss";
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";
import { BsFillBellFill, BsEnvelope } from "react-icons/bs";
import { GrLocation } from "react-icons/gr";
import Navbar from "@/components/organisms/navbar";

const Jobs = (props) => {
  const router = useRouter();
  // const JobList = props.JobList;
  // console.log(JobList.data.rows[0]);

  const [isAuth, setIsAuth] = React.useState(false);
  const [getData, setGetData] = React.useState(null);
  const [getToken, setGetToken] = React.useState(null);
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [getJobList, setGetJobList] = React.useState([]);

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
      return props.JobList.data.rows;
    }
    return [];
  }, [props.JobList]);

  React.useEffect(() => {
    setGetJobList(memoizedJobList);
  }, [memoizedJobList]);

  console.log("test");
  console.log(getJobList);
  console.log(Array.isArray(getJobList));
  console.log("test2");

  // const skills = getJobList
  // console.log(skills);

  const profPict = getData?.photo_profile;

  const handleLogout = () => {
    deleteCookie("profile");
    deleteCookie("token");
    router.push("/jobs");
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

  return (
    <>
      <Head>
        <title>Top Jobs</title>
        <meta name="description" content="hire job" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <main id={`${style["all-pages"]}`}>
        <nav
          className={`${style["navbar"]} navbar navbar-expand-lg bg-body-tertiary ${style["main-nav"]}`}>
          <div className="container">
            <button
              className="navbar-toggler"
              data-bs-toggle="collapse"
              data-bs-target="#nav"
              aria-controls="nav"
              aria-label="Expand Navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <a className={`${style["navbar-brand"]} navbar-brand`} href="#">
              <img src="/images/logo-text-2.png" alt="hire logo" />
            </a>
            {isAuth ? (
              <div
                className={`${style["navbar-right-side"]} d-flex align-items-center`}>
                <div className={style["navbar-icons"]}>
                  {/* <BsFillBellFill />
                  <BsEnvelope /> */}
                  <img
                    src="/images/bell-icon.png"
                    alt="default user pp"
                    className="mx-4"
                  />
                  <img
                    src="/images/mail-icon.png"
                    alt="default user pp"
                    className="mx-1"
                  />
                </div>
                <div
                  className={`${style["navbar-profile-picture"]} dropdown`}
                  onClick={() => setShowDropdown(!showDropdown)}>
                  <img src={profPict} alt="default user pp" />
                  {showDropdown && (
                    <ul
                      className={`dropdown-menu-dark ${style["dropdown-menu"]}`}>
                      <li
                        className={`${style["dropdown-item"]} d-flex align-items-center`}>
                        <a href="#">Profile</a>
                      </li>
                      <li
                        className={`${style["dropdown-item"]} d-flex align-items-center`}>
                        <a href="/jobs" onClick={handleLogout}>
                          Logout
                        </a>
                      </li>
                    </ul>
                  )}
                </div>
              </div>
            ) : (
              <div className={style["btn-group"]}>
                <div id={style["signup-button"]}>
                  <button
                    type="button"
                    className="btn btn-outline-light"
                    onClick={handleSignup}>
                    Sign Up
                  </button>
                </div>
                <div id={style["login-button"]} className="mx-3">
                  <button
                    type="button"
                    className="btn btn-outline-light"
                    onClick={handleLogin}>
                    Log In
                  </button>
                </div>
              </div>
            )}
          </div>
        </nav>

        <section id={style["jobs-content"]}>
          <div className={style["block-color"]}>
            <h2>Top Jobs</h2>
          </div>
          <div className="content">
            <div className="container">
              <div className={`${style["search-content"]} my-5`}>
                <div className="row">
                  <div className="col-12">
                    <div class="input-group mb-3">
                      <input
                        type="search"
                        class="form-control"
                        aria-label="Search"
                        placeholder="Search for any skills"
                      />
                      <button
                        class="btn btn-outline-secondary dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false">
                        Category
                      </button>
                      <ul class="dropdown-menu dropdown-menu-end">
                        <li>
                          <a class="dropdown-item" href="#">
                            Sort By Name
                          </a>
                        </li>
                        <li>
                          <a class="dropdown-item" href="#">
                            Sort By Skills
                          </a>
                        </li>
                        <li>
                          <a class="dropdown-item" href="#">
                            Sort By Locations
                          </a>
                        </li>
                      </ul>
                      <button class="btn btn-outline-secondary" type="button">
                        Search
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`card shadow ${style["card-style"]}`}>
                {getJobList?.map((job, key) => (
                  <React.Fragment key={key}>
                    <div className="card-body">
                      <div className="row align-items-center">
                        <div className="col-md-1 mx-4">
                          <img
                            src={job["user.photo_profile"]}
                            alt="profile"
                            className={style["profile-image"]}
                          />
                        </div>
                        <div class={`col-md-8 ${style["card-text"]}`}>
                          <h2>{capitalize(job["user.fullname"])}</h2>
                          <p>{capitalize(job?.job)}</p>

                          <div
                            className={`d-flex align-items-center gap-2 ${style["card-icon"]}`}>
                            <GrLocation />
                            <p>{capitalize(job?.domicile)}</p>
                          </div>

                          <div className="d-flex align-items-center gap-2">
                            {job?.skills
                              .map((item) => (
                                <span
                                  class={`badge text-bg-warning mx-1 ${style["skill-badge"]}`}
                                  key={item}>
                                  {item}
                                </span>
                              ))
                              .slice(0, 3)}

                            <span
                              class={`badge text-bg-warning mx-1 ${style["skill-badge"]}`}>
                              +
                              {
                                job?.skills.slice(3, job?.skills?.length)
                                  ?.length
                              }
                            </span>
                          </div>
                        </div>
                        <div className="col-md-2">
                          <button
                            className={`btn btn-primary btn-lg ${style["button-content"]}`}
                            type="button">
                            See Profile
                          </button>
                        </div>
                      </div>
                    </div>
                    <hr className={style["content-line"]} />
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer
        className={`${style["footer"]} d-flex align-items-center`}
        style={{ backgroundColor: "#5e50a1", color: "white" }}>
        <div className="container">
          <div className="row">
            <div className={`${style["logo"]} col-3`}>
              <img src="/images/logo-text.png" alt="logo" />
              {/* <p className={style["random-word"]}>THE BEST JOB SOCIAL MEDIA</p> */}
              <hr className={style["white-line"]} />
              <p className={style["copyright"]}>
                2023 Pewworld. All Right Reserved
              </p>
            </div>
            <div
              className={`${style["contact-details"]} col-9 d-flex align-items-end`}>
              <div className="d-flex justify-content-end">
                <p className={`${style["contact"]} mx-4`}>Contact</p>
                <p className={style["email"]}>Email</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export const getServerSideProps = async (context) => {
  const connect = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/v1/user/list`
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