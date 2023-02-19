/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from "react";
import Head from "next/head";
import axios from "axios";
import { useRouter } from "next/router";
import style from "@/styles/profile/user.module.scss";
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";
import {
  FaRegBell,
  FaRegEnvelope,
  FaMapMarkerAlt,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";
import Navbar from "@/components/organisms/navbar";
import Spinner from "@/components/atoms/spinner";
import Link from "next/link";
import nextConfig from "@/next.config";
import * as auth from "@/store/reducer/auth";
import { useSelector, useDispatch } from "react-redux";

const Jobs = (props) => {
  const router = useRouter();

  const auth = useSelector((state) => state);
  console.log("auth", auth);

  const [isAuth, setIsAuth] = React.useState(false);
  const [getToken, setGetToken] = React.useState(null);
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [getJobList, setGetJobList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [selectedTab, setSelectedTab] = React.useState("portfolios");
  const [specificData, setSpecificData] = React.useState([]);

  console.log(getJobList);

  React.useEffect(() => {
    let token = props.token;

    if (props.token && props.profile) {
      const convertData = JSON.parse(props.profile);

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
    setGetJobList(memoizedJobList[0]);

    setIsLoading(false);
  }, [memoizedJobList]);

  // const handleOptionChange = (event) => {
  //   setSelectedOption(event.target.value);
  //   setOther("");
  // };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   console.log(fullName, email, phone, description, selectedOption, other);
  // };

  const [fullname, setFullname] = React.useState("");
  const [job, setJob] = React.useState("");
  const [domicile, setDomicile] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [description, setDescription] = React.useState("");

  const editProfile = () => {
    event.preventDefault();
    setIsLoading(true);
    const config = {
      headers: {
        Authorization: `Bearer ${getToken}`,
      },
    };

    let data = {
      fullname,
      job,
      domicile,
      company,
      description,
    };

    axios
      .patch(`${process.env.NEXT_PUBLIC_API_URL}/v1/user/profile`, data, config)
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          console.log(response.status)
          // res.status(200).json("successfully!");
          window.location.reload();
        }

        // Swal.fire({
        //   icon: "success",
        //   title: `${response.data.message}`,
        // });
        // navigate("/");
      })
      .catch((error) => {
        // err?.response?.data?.messages ??
        // res.status(err?.response?.status ?? 500).json(errorMsg);
        console.log(error);
        // if (error.response.status === 401) {
        //   localStorage.removeItem("persist:root");
        //   navigate("/login");
        // } else {
        //   Swal.fire({
        //     icon: "error",
        //     title: `${error.response.data.message}`,
        //   });
        // }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const capitalize = (str) => {
    return str.replace(/(^\w|\s\w)/g, function (letter) {
      return letter.toUpperCase();
    });
  };

  return (
    <>
      <Head>
        <title>Profile</title>
        <meta name="description" content="hire job" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <main id={`${style["hire-page"]}`}>
        <Navbar />

        <section id={style["main-content"]}>
          <div className={`container ${style["container"]}`}>
            {/* left-content */}
            <div className={`${style["left-content"]}`}>
              <img src={getJobList?.user?.photo_profile} alt="user pp" />
              <div className={style["text-content"]}>
                <h2>{getJobList?.user?.fullname}</h2>
                <p>{getJobList?.job}</p>
                <div
                  className={`d-flex align-items-center gap-2 ${style["card-icon"]}`}>
                  <FaMapMarkerAlt className={style["react-icons-3"]} />
                  <p className="">{getJobList?.domicile}</p>
                </div>
                <p className={`${style["description"]}`}>
                  {getJobList?.description}
                </p>
                <h4>Skill</h4>
                {getJobList?.skills &&
                JSON.parse(getJobList.skills)?.length !== 0 ? (
                  <React.Fragment>
                    <div className={`${style["skill-badges"]}`}>
                      {JSON.parse(getJobList.skills).map((item, key) => (
                        <span
                          className={`badge text-bg-warning ${style["skill-badge"]}`}
                          key={key}>
                          {item}
                        </span>
                      ))}
                    </div>
                  </React.Fragment>
                ) : (
                  "-"
                )}

                {/* <span
                  className={`badge text-bg-warning mx-1 ${style["skill-badge"]}`}>
                  +{job?.skills.slice(3, job?.skills?.length)?.length}
                </span> */}

                <div className={style["left-icons"]}>
                  <p>
                    <span>
                      <FaRegEnvelope />
                    </span>
                    {getJobList?.user?.email}
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
            {/* right-content */}
            <div className={style["right-content"]}>
              <div className={`${style["personal-data-container"]}`}>
                <div className={style["personal-data"]}>
                  <h3>Personal Data</h3>
                  <hr />
                  <form>
                    <label for="text">Name</label>
                    <input
                      type="text"
                      className="mb-3 form-control"
                      placeholder="Enter your Name"
                      onChange={(event) => setFullname(event.target.value)}
                    />
                    <label for="text">Job Desk</label>
                    <input
                      type="text"
                      className="mb-3 form-control"
                      placeholder="Enter your Job Desk"
                      onChange={(event) => setJob(event.target.value)}
                    />
                    <label for="text">Domicile</label>
                    <input
                      type="text"
                      className="mb-3 form-control"
                      placeholder="Enter your Domicile"
                      onChange={(event) => setDomicile(event.target.value)}
                    />
                    <label for="text">Workplace</label>
                    <input
                      type="text"
                      className="mb-3 form-control"
                      placeholder="Enter your Workplace"
                      onChange={(event) => setCompany(event.target.value)}
                    />
                    <label for="text">Descriptions</label>
                    <textarea
                      className="mb-3 form-control"
                      placeholder="Enter your Descriptions. (A Specialist Developer, Problem Solver, etc)"
                      onChange={(event) => setDescription(event.target.value)}
                    />

                    {/* <button
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
                    </button> */}

                    <div className={`mt-5 ${style["button"]}`}>
                      <button
                        className="btn btn-primary"
                        // type="submit"
                        onClick={editProfile}>
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              <div className={`${style["skill-container"]}`}>
                <div className={`${style["skill"]}`}>
                  <h3>Skill</h3>
                  <hr />
                  <form>
                    <input
                      type="text"
                      className="mt-3 form-control"
                      placeholder="C++"
                      // onChange={(event) => setUsername(event.target.value)}
                    />
                    <div className={`mt-3 ${style["button"]}`}>
                      <button className="btn btn-primary" type="submit">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              <div className={`${style["experience-container"]}`}>
                <div className={`${style["experience"]}`}>
                  <h3>Job Experience</h3>
                  <hr />
                  <form>
                    <label for="text">Position</label>
                    <input
                      type="text"
                      className="mb-3 form-control"
                      placeholder="Mobile Dev, Web Dev, Data Scientist"
                      // onChange={(event) => setUsername(event.target.value)}
                    />
                    <div className={style["exp-inline"]}>
                      <div className={style["inline-1"]}>
                        <label for="text">Company Name</label>
                        <input
                          type="text"
                          className="mb-3 form-control"
                          placeholder="PT. Ada Saja"
                          // onChange={(event) => setUsername(event.target.value)}
                        />
                      </div>
                      <div className={style["inline-2"]}>
                        <label for="text">Date Start & End</label>
                        <input
                          type="text"
                          className="mb-3 form-control"
                          placeholder="DD-MMM-YYYY - DD-MMM-YYYY"
                          // onChange={(event) => setUsername(event.target.value)}
                        />
                      </div>
                    </div>
                    <label for="text">Descriptions</label>
                    <textarea
                      className="mb-3 form-control"
                      placeholder="Short Descriptions"
                      // onChange={(event) => setUsername(event.target.value)}
                    />
                    <div className={`mt-3 ${style["button"]}`}>
                      <button className="btn btn-primary" type="submit">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              <div className={`${style["portfolio-container"]}`}>
                <div className={`${style["portfolio"]}`}>
                  <h3>Portfolio</h3>
                  <hr />
                  <form>
                    {/* <label className={style["top-label"]} htmlFor="reason">
                      Type of Portfolio ?
                    </label> */}

                    <label for="text">Project Name</label>
                    <input
                      type="text"
                      className="mb-3 form-control"
                      placeholder="Enter your Project Name"
                      // onChange={(event) => setUsername(event.target.value)}
                    />
                    <label for="text">Repository Link</label>
                    <input
                      type="text"
                      className="mb-3 form-control"
                      placeholder="Enter your Repository Link"
                      // onChange={(event) => setUsername(event.target.value)}
                    />

                    <div className={style["exp-row"]}>
                      <div className={style["row-1"]}>
                        <input
                          className={`mx-3 my-2 ${style["form-check-input"]}`}
                          type="radio"
                          name="reason"
                          id="projects"
                          value="Projects"
                        />
                        <label className="form-check-label" htmlFor="projects">
                          Web App
                        </label>
                      </div>
                      <div className={style["row-2"]}>
                        <input
                          className={`mx-3 my-3 ${style["form-check-input"]}`}
                          type="radio"
                          name="reason"
                          id="projects"
                          value="Projects"
                        />
                        <label className="form-check-label" htmlFor="projects">
                          Mobile App
                        </label>
                      </div>
                    </div>

                    <label for="text">Descriptions</label>
                    <textarea
                      className="mb-3 form-control"
                      placeholder="Short Descriptions"
                      // onChange={(event) => setUsername(event.target.value)}
                    />
                    <div className={`mt-3 ${style["button"]}`}>
                      <button className="btn btn-primary" type="submit">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
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
  const { slug } = context.query;

  const connect = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/v1/user/detail/${slug}`
  );

  const convertData = connect.data;
  // console.log(convertData)

  const token = getCookie("token", context) || "";
  const profile = getCookie("profile", context) || "";

  return {
    props: {
      JobList: convertData,
      token,
      profile,
    },
  };
};

export default Jobs;