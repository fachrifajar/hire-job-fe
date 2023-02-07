/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from "react";
import Head from "next/head";
import axios from "axios";
import { useRouter } from "next/router";
import style from "../../styles/jobs/index.module.scss";
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";
import { FaRegBell, FaRegEnvelope, FaMapMarkerAlt } from "react-icons/fa";
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
  const [keyword, setKeyword] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(true);
  const [disablePagination, setDisablePagination] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const fetchBySort = (pageParam, sortValue, orderValue) => {
    const offset = (pageParam - 1) * 10 + 1;
    if (sortValue) {
      setIsLoading(true);
      setGetJobList([]);
    }

    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/user/list?limit=10&page=${pageParam}&sortBy=${sortValue}&order=${orderValue}&offset=${offset}`
      )
      .then(({ data }) => {
        setGetJobList(data?.data?.rows);
        setTotalPage(parseInt(Math.ceil(data?.data?.count / 10)));
        setCurrentPage(pageParam);
        setDisablePagination(false);
      })
      .catch((err) => {
        setGetJobList([]);
        setDisablePagination(true);
      })
      .finally(() => setIsLoading(false));
  };

  const fetchPagination = (pageParam) => {
    const offset = (pageParam - 1) * 10 + 1;
    setIsLoading(true);
    setGetJobList([]);
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/user/list?limit=10&page=${pageParam}&offset=${offset}`
      )
      .then(({ data }) => {
        setGetJobList(data?.data?.rows);
        setTotalPage(parseInt(Math.ceil(data?.data?.count / 10)));
        setCurrentPage(pageParam);
        setDisablePagination(false);
        // console.log("paginate");
        // console.log(data?.data);
        // console.log(data?.data?.rows);
        // console.log(data?.data?.rows?.length);
        // console.log(Math.ceil(data?.data?.count / 10));
        // console.log(pageParam);
        // console.log("paginate");
      })
      .catch((err) => {
        setGetJobList([]);
        setDisablePagination(true);
      })
      .finally(() => setIsLoading(false));
  };

  const fetchByKeyword = () => {
    setGetJobList([]);
    setIsLoading(true);

    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/v1/user/list?keyword=${keyword}`)
      .then(({ data }) => {
        // if (data.length == 0) {
        //   return;
        // }
        setGetJobList(data?.data.rows);
        setDisablePagination(false);
        // console.log("fetchbykeyword");
        // console.log(data?.data?.rows);
        // console.log("fetchbykeyword");
      })
      .catch((err) => {
        setGetJobList([]);
        setDisablePagination(true);
      })
      .finally(() => setIsLoading(false));
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

    setTotalPage(parseInt(Math.ceil(memoizedJobList.count / 10)));
    setIsLoading(false);
    // console.log("memoized");
    // console.log(memoizedJobList.rows);
    // console.log(parseInt(Math.ceil(memoizedJobList.count / 10)));
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

  return (
    <>
      <Head>
        <title>Jobs</title>
        <meta name="description" content="hire job" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <main id={`${style["job-page"]}`}>
        <section id={style["main-nav"]}>
          <nav className={style["main-nav"]}>
            <div className={style["logo"]}>
              <img
                className={style["main-logo"]}
                src="/images/logo-text-2.png"
                alt="main logo"
              />
            </div>

            {isAuth ? (
              <ul>
                <li>
                  <FaRegBell className={`${style["react-icons-1"]}`} />
                </li>
                <li>
                  <FaRegEnvelope className={`${style["react-icons-2"]}`} />
                </li>
                <li className={`nav-item dropdown ${style["nav-item"]}`}>
                  <a
                    className="nav-link dropdown-toggles"
                    href="#"
                    role="button"
                    // data-bs-toggle="dropdown"
                    aria-expanded="false">
                    <img
                      src={profPict}
                      alt="user pp"
                      onClick={handleDropdown}
                    />
                  </a>
                  {showDropdown ? (
                    <div className={style["dropdown-container"]}>
                      <ul className={`dropdown-menu ${style["drop-down"]}`}>
                        <li>
                          <a
                            className={`dropdown-item ${style["dropdown-item"]}`}
                            href="#">
                            Home
                          </a>
                        </li>
                        <li>
                          <a
                            className={`dropdown-item ${style["dropdown-item"]}`}
                            href="#">
                            Profile
                          </a>
                        </li>
                        <li>
                          <a
                            className={`dropdown-item ${style["dropdown-item"]}`}
                            href="#"
                            onClick={handleLogout}>
                            Logout
                          </a>
                        </li>
                      </ul>
                    </div>
                  ) : (
                    ""
                  )}
                </li>
              </ul>
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

            <ul
              className={`${style["hamburger"]} ${
                isMenuOpen ? style["show"] : style["hide"]
              }`}>
              <li>Notifications</li>
              <li>Mail</li>
              <li>Profile</li>
              {isAuth ? (
                <li>
                  <a
                    className={`dropdown-item ${style["dropdown-item"]}`}
                    href="#"
                    onClick={handleLogout}>
                    Logout
                  </a>
                </li>
              ) : (
                <li>
                  <a
                    className={`dropdown-item ${style["dropdown-item"]}`}
                    href="#"
                    onClick={handleLogin}>
                    Login
                  </a>
                </li>
              )}
            </ul>

            <div className={style["menu-toggle"]} onClick={handleClick}>
              {!isMenuOpen ? (
                <>
                  <span></span>
                  <span></span>
                  <span></span>
                </>
              ) : (
                <RxCross1 className={style["toggle-icon"]} />
              )}
            </div>
          </nav>
        </section>

        <section id={style["jobs-content"]}>
          <div className={style["block-color"]}>
            <h2>Top Jobs</h2>
          </div>
          <div className="content">
            <div className="container">
              {/* SORT & SEARCH */}
              <div className={`${style["search-content"]} my-5`}>
                <div className="row">
                  <div className="col-12">
                    <div className="input-group mb-3">
                      <input
                        type="search"
                        className="form-control"
                        aria-label="Search"
                        placeholder="Search for any skills"
                        onChange={(event) => {
                          setKeyword(event.target.value);
                          // console.log(event.target.value);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            fetchByKeyword();
                          }
                        }}
                      />
                      <button
                        className={`btn btn-outline-secondary dropdown-toggle ${style["dropdown-search"]}`}
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        onChange={(event) => {
                          fetchBySort(currentPage, event.target.value);
                        }}>
                        Category
                      </button>
                      <ul className="dropdown-menu dropdown-menu-end">
                        <li>
                          <a
                            className="dropdown-item"
                            href="#"
                            value="id"
                            onClick={() =>
                              fetchBySort(currentPage, "id", "DESC")
                            }>
                            (Default)
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="#"
                            value="skills"
                            onClick={() =>
                              fetchBySort(currentPage, "id", "ASC")
                            }>
                            Sort By Id (ASC)
                          </a>
                        </li>

                        <li>
                          <a
                            className="dropdown-item"
                            href="#"
                            value="skills"
                            onClick={() =>
                              fetchBySort(currentPage, "skills", "DESC")
                            }>
                            Sort By Skills
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="#"
                            value="domicile"
                            onClick={() =>
                              fetchBySort(currentPage, "domicile", "DESC")
                            }>
                            Sort By Locations
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="#"
                            value="job"
                            onClick={() =>
                              fetchBySort(currentPage, "job", "DESC")
                            }>
                            Sort By Job
                          </a>
                        </li>
                      </ul>
                      <button
                        className={`btn btn-outline-secondary ${style["button-search"]}`}
                        type="button"
                        onClick={fetchByKeyword}>
                        Search
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* CARD CONTENT */}
              {isLoading ? <Spinner /> : ""}
              {getJobList.length === 0 && !isLoading ? (
                <h2 className="text-center">Sorry, No Data Found</h2>
              ) : (
                <div
                  className={`${style["card-content"]}${
                    !isLoading && getJobList.length !== 0 ? "" : "hidden"
                  }`}>
                  {getJobList?.map((job, key) => (
                    <React.Fragment key={key}>
                      <div className={style["card-body"]}>
                        <div className={` ${style["image-content"]}`}>
                          <img
                            src={job["user.photo_profile"]}
                            alt="user photo"
                          />
                        </div>
                        <div className={style["text-content"]}>
                          <h2>{capitalize(job["user.fullname"])}</h2>
                          <p>{capitalize(job?.job)}</p>
                          <div
                            className={`d-flex align-items-center gap-2 ${style["card-icon"]}`}>
                            <FaMapMarkerAlt
                              className={style["react-icons-3"]}
                            />
                            <p className="my-1">{capitalize(job?.domicile)}</p>
                          </div>

                          {job?.skills?.length !== 0 ? (
                            <React.Fragment>
                              {job?.skills
                                .map((item) => (
                                  <span
                                    className={`badge text-bg-warning mx-1 ${style["skill-badge"]}`}
                                    key={item}>
                                    {item}
                                  </span>
                                ))
                                .slice(0, 3)}

                              <span
                                className={`badge text-bg-warning mx-1 ${style["skill-badge"]}`}>
                                +
                                {
                                  job?.skills.slice(3, job?.skills?.length)
                                    ?.length
                                }
                              </span>
                            </React.Fragment>
                          ) : null}
                        </div>
                        <div className={style["button-content"]}>
                          <button
                            className={`btn btn-primary btn-lg`}
                            type="button">
                            See Profile
                          </button>
                        </div>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              )}

              {/* PAGINATION */}
              {!isLoading && !disablePagination && getJobList.length !== 0 && (
                <div
                  className={`container d-flex align-items-center justify-content-center ${style["pagination"]}`}>
                  <nav aria-label="Page navigation example">
                    <ul className={`pagination ${style["pagination-nav"]}`}>
                      <li className="page-item">
                        <button
                          className={`page-link ${
                            currentPage === 1 ? "disabled" : ""
                          } ${style["pagination-previous"]}`}
                          onClick={() => {
                            if (currentPage > 1)
                              fetchPagination(currentPage - 1);
                          }}>
                          Previous
                        </button>
                      </li>
                      {[...new Array(totalPage)].map((item, key) => {
                        let position = ++key;
                        return (
                          <li className="page-item" key={key}>
                            <button
                              className={`page-link ${
                                currentPage === position ? "active" : ""
                              } ${style["pagination-number"]}`}
                              onClick={() => {
                                fetchPagination(position);
                              }}>
                              {position}
                            </button>
                          </li>
                        );
                      })}
                      <li className="page-item">
                        <button
                          className={`page-link ${
                            currentPage === totalPage ? "disabled" : ""
                          } ${style["pagination-next"]}`}
                          onClick={() => {
                            if (currentPage < totalPage) {
                              fetchPagination(currentPage + 1);
                            }
                          }}>
                          Next
                        </button>
                      </li>
                    </ul>
                  </nav>
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
