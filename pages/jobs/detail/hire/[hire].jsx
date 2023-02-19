/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from "react";
import Head from "next/head";
import axios from "axios";
import { useRouter } from "next/router";
import style from "@/styles/jobs/hire.module.scss";
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

  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [other, setOther] = React.useState("");
  const [selectedOption, setSelectedOption] = React.useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setOther("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(fullName, email, phone, description, selectedOption, other);
  };

  return (
    <>
      <Head>
        <title>Hire</title>
        <meta name="description" content="hire job" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <main id={`${style["hire-page"]}`}>
        <Navbar />

        <section id={style["hire-content"]}>
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
              <div className={`${style["input-content"]}`}>
                <h3>Get in touch with Prospective Employees</h3>
                <p>
                  Kindly provide the necessary information to proceed with
                  connecting you to the jobseeker
                </p>
                <form onSubmit={handleSubmit}>
                  <div className={style["form-group"]}>
                    <label className={style["top-label"]} htmlFor="reason">
                      What is the purpose of contacting the jobseeker?
                    </label>
                    <div className={`form-check ${style["form-check"]}`}>
                      <input
                        className={style["form-check-input"]}
                        type="radio"
                        name="reason"
                        id="projects"
                        value="Projects"
                        checked={selectedOption === "Projects"}
                        onChange={handleOptionChange}
                      />
                      <label className="form-check-label" htmlFor="projects">
                        Projects
                      </label>
                    </div>
                    <div className={`form-check ${style["form-check"]}`}>
                      <input
                        className={style["form-check-input"]}
                        type="radio"
                        name="reason"
                        id="offer"
                        value="Offer"
                        checked={selectedOption === "Offer"}
                        onChange={handleOptionChange}
                      />
                      <label className="form-check-label" htmlFor="offer">
                        Offer
                      </label>
                    </div>
                    <div className={`form-check ${style["form-check"]}`}>
                      <input
                        className={style["form-check-input"]}
                        type="radio"
                        name="reason"
                        id="other"
                        value="Other"
                        checked={selectedOption === "Other"}
                        onChange={handleOptionChange}
                      />
                      <label className="form-check-label" htmlFor="other">
                        Other
                      </label>
                    </div>
                    {selectedOption === "Other" && (
                      <div className="form-group mx-2">
                        <input
                          type="text"
                          className={`form-control ${style["form-control"]}`}
                          id="other"
                          placeholder="Enter other reason"
                          value={other}
                          onChange={(e) => setOther(e.target.value)}
                        />
                      </div>
                    )}
                  </div>
                  <div className={`form-input ${style["form-group"]}`}>
                    <label htmlFor="fullName">Full Name</label>
                    <input
                      type="text"
                      className={`form-control ${style["form-control"]}`}
                      id="fullName"
                      placeholder="Enter your full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                  <div className={`form-group ${style["form-group"]}`}>
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      className={`form-control ${style["form-control"]}`}
                      id="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className={`form-group ${style["form-group"]}`}>
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="number"
                      className={`form-control ${style["form-control"]}`}
                      id="phone"
                      placeholder="Enter your phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div className={`form-group ${style["form-group"]}`}>
                    <label htmlFor="description">Description</label>
                    <textarea
                      className={`form-control ${style["form-control"]}`}
                      id="description"
                      rows="5"
                      placeholder="Enter description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>

                  <button
                    type="submit"
                    className={`btn btn-primary ${style["btn"]}`}>
                    Submit
                  </button>
                </form>
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
