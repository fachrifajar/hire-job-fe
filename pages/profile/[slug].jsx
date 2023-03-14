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
import moment from "moment";
//MUI
import {
  Card,
  CardContent,
  Modal,
  Button,
  Typography,
  Alert,
  Checkbox,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Grid,
  Input,
  Stack,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { styled } from "@mui/material/styles";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const MyButton = styled(Button)({
  width: "200px",
  borderRadius: "10px",
  marginTop: "20px",
  background: "#5e50a1",
  color: "white",
  "&:hover": {
    background: "#5e50a1c4",
    border: "none",
  },
});

const MyTextField = styled(TextField)({
  "& label": {
    // color: "#46505c",
    marginTop: "-6px",
  },
  "& label.Mui-focused": {
    color: "#5e50a1",
  },
  "& .MuiOutlinedInput-root": {
    height: "40px",
    "& fieldset": {
      borderColor: "#8692a6",
    },
    "&:hover fieldset": {
      borderColor: "#5e50a1",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#5e50a1",
    },
  },
});

const MySelectInput = styled(FormControl)`
  && {
    width: 100%;
    margin: 10px 0;
    & label {
      // color: "#46505c",
      margin-top: -5px;
    }
    & label.Mui-focused {
      color: #5e50a1;
    }
    & .MuiOutlinedInput-root {
      height: 40px;
      & fieldset {
        border-color: #8692a6;
      }
      &:hover fieldset {
        border-color: #5e50a1;
      }
      &.Mui-focused fieldset {
        border-color: #5e50a1;
      }
    }
  }
`;

const MyMenuItem = styled(MenuItem)`
  && {
    font-size: 14px;
  }
`;

const MyInputLabel = styled(InputLabel)`
  && {
    font-size: 14px;
  }
`;

const MySelect = styled(Select)`
  && {
    font-size: 14px;
    min-width: 100px;
  }
`;

const MyCard = styled(Card)({
  margin: "auto",
  marginTop: "10%",
  maxWidth: 500,
  textAlign: "center",
  borderRadius: "20px",
  padding: "25px",
  borderColor: "red",
});

const MyModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderColor: "red",
});

const jobTitles = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Mobile Developer",
  "DevOps Engineer",
  "Data Engineer",
  "Data Science",
  "Data Analyst",
  "Game Developer",
  "Other",
];

const Jobs = (props) => {
  const router = useRouter();

  const auth = useSelector((state) => state);

  const [isAuth, setIsAuth] = React.useState(false);
  const [getToken, setGetToken] = React.useState(null);
  const [getJobList, setGetJobList] = React.useState([]);
  const [showModalSuccess, setShowModalSuccess] = React.useState(false);

  const handleCloseSuccess = () => {
    setShowModalSuccess(false);
  };

  React.useEffect(() => {
    let token = props.token;

    if (props.token && props.profile) {
      const convertData = JSON.parse(props.profile);

      setGetToken(token);
      setIsAuth(true);
    }
  }, []);

  React.useEffect(() => {
    if (props.JobList) {
      setGetJobList(props.JobList);
    }
  }, []);

  //@PERSONAL DATA FORM
  const [isLoadingPersonalData, setIsLoadingPersonalData] =
    React.useState(false);
  let isDisabledPersonalData = true;

  const [fullname, setFullname] = React.useState(null);
  const [isErrName, setIsErrName] = React.useState(false);
  const [errMsgName, setErrMsgName] = React.useState("");

  const [job, setJob] = React.useState(null);
  const [isErrJob, setIsErrJob] = React.useState(false);
  const [errMsgJob, setErrMsgJob] = React.useState("");

  const [domicile, setDomicile] = React.useState(null);
  const [isErrDomicile, setIsErrDomicile] = React.useState(false);
  const [errMsgDomicile, setErrMsgDomicile] = React.useState("");

  const [company, setCompany] = React.useState(null);
  const [isErrCompany, setIsErrCompany] = React.useState(false);
  const [errMsgCompany, setErrMsgCompany] = React.useState("");

  const [description, setDescription] = React.useState(null);
  const [isErrDescription, setIsErrDescription] = React.useState(false);
  const [errMsgDescription, setErrMsgDescription] = React.useState("");

  const handleChangeName = (event) => {
    const name = event.target.value;
    const strRegex = /^(?=.*\S)[A-Za-z ]{5,20}$/;
    if (!strRegex.test(name)) {
      setErrMsgName(
        "Name must contain only letters and spaces, and be between 5-20 characters long."
      );
      setIsErrName(true);
      setFullname(null);
      return;
    }
    setIsErrName(false);
    setFullname(name);
  };

  const handleChangeJob = (event) => {
    const job = event.target.value;
    const strRegex = /^(?=.*\S)[A-Za-z ]{5,20}$/;
    if (!strRegex.test(job)) {
      setErrMsgJob(
        "Job must contain only letters and spaces, and be between 5-20 characters long."
      );
      setIsErrJob(true);
      setJob(null);
      return;
    }
    setIsErrJob(false);
    setJob(job);
  };

  const handleChangeDomicile = (event) => {
    const domicile = event.target.value;
    const strRegex = /^(?=.*\S)[A-Za-z ]{5,20}$/;
    if (!strRegex.test(domicile)) {
      setErrMsgDomicile(
        "Domicile must contain only letters and spaces, and be between 5-20 characters long."
      );
      setIsErrDomicile(true);
      setDomicile(null);
      return;
    }
    setIsErrDomicile(false);
    setDomicile(domicile);
  };

  const handleChangeCompany = (event) => {
    const company = event.target.value;
    const strRegex = /^(?=.*\S)[A-Za-z ]{5,20}$/;
    if (!strRegex.test(company)) {
      setErrMsgCompany(
        "Company must contain only letters and spaces, and be between 5-20 characters long."
      );
      setIsErrCompany(true);
      setCompany(null);
      return;
    }
    setIsErrCompany(false);
    setCompany(company);
  };

  const handleChangeDescription = (event) => {
    const description = event.target.value;
    const strRegex = /^(?=.*\S)[A-Za-z ]{5,50}$/;
    if (!strRegex.test(description)) {
      setErrMsgDescription(
        "Description must contain only letters and spaces, and be between 5-50 characters long."
      );
      setIsErrDescription(true);
      setDescription(null);
      return;
    }
    setIsErrDescription(false);
    setDescription(description);
  };

  if (fullname || job || domicile || company || description) {
    isDisabledPersonalData = false;
  }

  const editProfile = async () => {
    try {
      setIsLoadingPersonalData(true);
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
        description: description
          ? description
          : getJobList?.data?.[0]?.description,
      };

      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/user/profile`,
        data,
        config
      );

      const connect = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/user/profile`,
        config
      );
      const convertData = connect.data;

      setGetJobList(convertData);
      setIsLoadingPersonalData(false);
      // setShowModalSuccess(true);
    } catch (error) {
      console.log("error---", error);
      setIsLoadingPersonalData(false);
    }
  };
  //@END OF PERSONAL DATA FORM

  //@SKILL FORM
  const [isLoadingSkill, setIsLoadingSkill] = React.useState(false);
  const [isDisabledSkill, setIsDisabledSkill] = React.useState(true);

  const [isErrorSkill, setIsErrorSkill] = React.useState(false);
  const [errMsgSkill, setErrMsgSkill] = React.useState("");
  const [skill, setSkill] = React.useState(null);

  const handleChangeSkill = (event) => {
    const skill = event.target.value;
    const convertArr = skill.split(",");

    for (let i = 0; i < convertArr.length; i++) {
      const trimmedSkill = convertArr[i].trim();
      if (!/^[a-zA-Z ]{3,100}$/.test(trimmedSkill)) {
        setErrMsgSkill(
          "Skill must contain only letters and spaces, and be between 3-100 characters long and each SKILLS Separated by Comma"
        );
        setIsErrorSkill(true);
        setSkill(null);
        setIsDisabledSkill(true);
        return;
      }
      convertArr[i] = trimmedSkill;
    }

    setIsDisabledSkill(false);
    setIsErrorSkill(false);
    setSkill(convertArr);
  };

  const editSkill = async () => {
    try {
      setIsLoadingSkill(true);
      const config = {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      };

      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/user/skills`,
        {
          skills: skill,
        },
        config
      );

      const connect = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/user/profile`,
        config
      );
      const convertData = connect.data;

      setGetJobList(convertData);
      setIsLoadingSkill(false);
      setShowModalSuccess(true);
    } catch (error) {
      console.log("error---", error);
      setIsLoadingSkill(false);
    }
  };
  //@END OF SKILL FORM

  //@JOB EXPERIENCE FORM
  const capitalize = (str) => {
    return str.replace(/(^\w|\s\w)/g, function (letter) {
      return letter.toUpperCase();
    });
  };

  const [isLoadingJobExp, setIsLoadingJobExp] = React.useState(false);
  let isDisabledJobExp = true;

  const [jobTitle, setJobTitle] = React.useState("");
  const [jobTitleManual, setJobTitleManual] = React.useState("");
  const [isErrorJobTitle, setIsErrorJobTitle] = React.useState(false);
  const [errMsgJobTitle, setErrMsgJobTitle] = React.useState("");

  const [companyName, setCompanyName] = React.useState("");
  const [isErrorCompanyName, setIsErrorCompanyName] = React.useState(false);
  const [errMsgCompanyName, setErrMsgCompanyName] = React.useState("");

  const handleJobTitleChange = (event) => {
    setJobTitle(event.target.value);
  };

  const handleJobTitleManualChange = (event) => {
    const JobTitle = event.target.value;
    const strRegex = /^(?=.*\S)[A-Za-z ]{5,50}$/;
    if (!strRegex.test(JobTitle)) {
      setErrMsgJobTitle(
        "Job Title must contain only letters and spaces, and be between 5-50 characters long."
      );
      setIsErrorJobTitle(true);
      setJobTitleManual(null);
      return;
    }
    setIsErrorJobTitle(false);
    setJobTitleManual(JobTitle);
  };

  const handleChangeCompanyName = (event) => {
    const company = event.target.value;
    if (company.length < 5 || company.length > 50) {
      setErrMsgCompanyName(
        "Company Name must contain only letters and spaces, and be between 5-50 characters long."
      );
      setIsErrorCompanyName(true);
      setCompanyName(null);
      return;
    }
    setIsErrorCompanyName(false);
    setCompanyName(company);
  };

  const [selectedDate, setSelectedDate] = React.useState(null);
  const [selectedDateEnd, setSelectedDateEnd] = React.useState(null);

  const handleChangeDate = (newSelectedDate) => {
    // console.log("newSelectedDate---", newSelectedDate);

    setSelectedDate(moment(newSelectedDate).format("YYYY-MM-DD"));
  };

  const handleChangeDateEnd = (newSelectedDateEnd) => {
    // console.log("newSelectedDateEnd---", newSelectedDateEnd);

    setSelectedDateEnd(moment(newSelectedDateEnd).format("YYYY-MM-DD"));
  };

  const [jobDescription, setJobDescription] = React.useState(null);
  const [isErrorJobDescription, setIsErrorJobDescription] =
    React.useState(false);
  const [errMsgJobDescription, setErrMsgJobDescription] = React.useState("");

  const handleChangejobDescription = (event) => {
    const jobDesc = event.target.value;
    const strRegex = /^(?=.*\S)[A-Za-z ]{5,100}$/;
    if (!strRegex.test(jobDesc)) {
      setErrMsgJobDescription(
        "Description must contain only letters and spaces, and be between 5-100 characters long."
      );
      setIsErrorJobDescription(true);
      setJobDescription(null);
      return;
    }
    setIsErrorJobDescription(false);
    setJobDescription(jobDesc);
  };

  if (
    (jobTitle || jobTitleManual) &&
    companyName &&
    selectedDate &&
    selectedDateEnd &&
    companyName &&
    jobDescription &&
    selectedDate &&
    selectedDateEnd
  ) {
    isDisabledJobExp = false;
  }

  const editJobExp = async () => {
    try {
      const newDate = `${selectedDate}${selectedDateEnd}`;
      setIsLoadingJobExp(true);
      const config = {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      };
      let data = {
        position: jobTitle == "Other" ? jobTitleManual : jobTitle,
        company: companyName,
        date: newDate,
        description: jobDescription,
      };

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/user/work-experience`,
        data,
        config
      );

      const connect = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/user/profile`,
        config
      );
      const convertData = connect.data;

      setGetJobList(convertData);
      setIsLoadingJobExp(false);
      setShowModalSuccess(true);
    } catch (error) {
      console.log("error---", error);
      setIsLoadingJobExp(false);
    }
  };
  //@ END OF JOB EXPERIENCE FORM

  //@ PORTFOLIO FORM
  let isDisabledPortfolio = true;
  const [isLoadingPortfolio, setIsLoadingPortfolio] = React.useState(false);

  const [projectName, setProjectName] = React.useState(null);
  const [isErrorProjectName, setIsErrorProjectName] = React.useState(false);
  const [errMsgProjectName, setErrMsgProjectName] = React.useState("");

  const [repository, setRepository] = React.useState(null);
  const [isErrorRepository, setIsErrorRepository] = React.useState(false);
  const [errMsgRepository, setErrMsgRepository] = React.useState("");

  const [projectType, setProjectType] = React.useState(null);

  const [repositoryPhoto, setRepositoryPhoto] = React.useState(null);
  const [isErrorRepositoryPhoto, setIsErrorRepositoryPhoto] =
    React.useState(false);
  const [errMsgRepositoryPhoto, setErrMsgRepositoryPhoto] = React.useState("");

  if (projectName && repository && projectType && repositoryPhoto) {
    isDisabledPortfolio = false;
  }

  const handleChangeProjectName = (event) => {
    const projName = event.target.value;
    const strRegex = /^(?=.*\S)[A-Za-z ]{5,100}$/;
    if (!strRegex.test(projName)) {
      setErrMsgProjectName(
        "Project Name must contain only letters and spaces, and be between 5-100 characters long."
      );
      setIsErrorProjectName(true);
      setProjectName(null);
      return;
    }
    setIsErrorProjectName(false);
    setProjectName(projName);
  };

  const handleChangeRepository = (event) => {
    const repo = event.target.value;
    const urlRegex = /^(https?|http):\/\/[^\s/$.?#].[^\s]*$/;
    if (!urlRegex.test(repo)) {
      setErrMsgRepository(
        "Please enter a valid URL starting with http:// or https://."
      );
      setIsErrorRepository(true);
      setRepository(null);
      return;
    }
    setIsErrorRepository(false);
    setRepository(repo);
  };

  const handleChangeRepoPhoto = (event) => {
    const repoPhoto = event.target.value;
    const urlRegex = /^(https?|http):\/\/[^\s/$.?#].[^\s]*$/;
    if (!urlRegex.test(repoPhoto)) {
      setErrMsgRepositoryPhoto(
        "Please enter a valid URL starting with http:// or https://."
      );
      setIsErrorRepositoryPhoto(true);
      setRepositoryPhoto(null);
      return;
    }
    setIsErrorRepositoryPhoto(false);
    setRepositoryPhoto(repoPhoto);
  };

  const editPortfolio = async () => {
    try {
      setIsLoadingPortfolio(true);
      const config = {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      };
      let data = {
        name: projectName,
        photo: repositoryPhoto,
        link: repository,
        type: projectType,
      };

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/user/portfolio`,
        data,
        config
      );

      const connect = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/user/profile`,
        config
      );
      const convertData = connect.data;

      setGetJobList(convertData);
      setIsLoadingPortfolio(false);
      setShowModalSuccess(true);
    } catch (error) {
      console.log("error---", error);
      setIsLoadingPortfolio(false);
    }
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
        <MyModal open={showModalSuccess} onClose={handleCloseSuccess}>
          <MyCard>
            <CardContent>
              <Alert
                variant="filled"
                severity="success"
                sx={{ justifyContent: "center" }}>
                <strong style={{ fontSize: "16px" }}>
                  Success update data!
                </strong>
              </Alert>
            </CardContent>
          </MyCard>
        </MyModal>
        <section id={style["main-content"]}>
          <div className={`container ${style["container"]}`}>
            {/* left-content */}
            <div className={`${style["left-content"]}`}>
              <img
                src={getJobList?.data?.[0]?.user?.photo_profile}
                alt="user pp"
              />
              <div className={style["text-content"]}>
                <h2>{getJobList?.data?.[0]?.user?.fullname}</h2>
                <p>{getJobList?.data?.[0]?.job}</p>
                <div
                  className={`d-flex align-items-center gap-2 ${style["card-icon"]}`}>
                  <FaMapMarkerAlt className={style["react-icons-3"]} />
                  <p className="">{getJobList?.data?.[0]?.domicile}</p>
                </div>
                <p className={`${style["description"]}`}>
                  {getJobList?.data?.[0]?.description}
                </p>
                <h4>Skill</h4>
                {getJobList?.data?.[0]?.skills &&
                JSON.parse(getJobList?.data?.[0]?.skills)?.length !== 0 ? (
                  <React.Fragment>
                    <div className={`${style["skill-badges"]}`}>
                      {JSON.parse(getJobList?.data?.[0]?.skills).map(
                        (item, key) => (
                          <span
                            className={`badge text-bg-warning ${style["skill-badge"]}`}
                            key={key}>
                            {item}
                          </span>
                        )
                      )}
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
                    {getJobList?.data?.[0]?.user?.email}
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

                  {isErrName ? (
                    <MyTextField
                      error
                      id="standard-error-helper-text"
                      helperText={errMsgName}
                      label="Name"
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      placeholder="Enter your Name"
                      value={fullname}
                      onChange={handleChangeName}
                      InputProps={{
                        inputProps: {
                          maxLength: 20,
                        },
                      }}
                    />
                  ) : (
                    <MyTextField
                      label="Name"
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      placeholder="Enter your Name"
                      value={fullname}
                      onChange={handleChangeName}
                      InputProps={{
                        inputProps: {
                          maxLength: 20,
                        },
                      }}
                    />
                  )}

                  {isErrJob ? (
                    <MyTextField
                      error
                      id="standard-error-helper-text"
                      helperText={errMsgJob}
                      label="Job"
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      placeholder="Enter your Job Desk"
                      value={job}
                      onChange={handleChangeJob}
                      InputProps={{
                        inputProps: {
                          maxLength: 20,
                        },
                      }}
                    />
                  ) : (
                    <MyTextField
                      label="Job"
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      placeholder="Enter your Job Desk"
                      value={job}
                      onChange={handleChangeJob}
                      InputProps={{
                        inputProps: {
                          maxLength: 20,
                        },
                      }}
                    />
                  )}

                  {isErrDomicile ? (
                    <MyTextField
                      error
                      id="standard-error-helper-text"
                      helperText={errMsgDomicile}
                      label="Domicile"
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      placeholder="Enter your Domicile"
                      value={domicile}
                      onChange={handleChangeDomicile}
                      InputProps={{
                        inputProps: {
                          maxLength: 20,
                        },
                      }}
                    />
                  ) : (
                    <MyTextField
                      label="Domicile"
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      placeholder="Enter your Domicile"
                      value={domicile}
                      onChange={handleChangeDomicile}
                      InputProps={{
                        inputProps: {
                          maxLength: 20,
                        },
                      }}
                    />
                  )}

                  {isErrCompany ? (
                    <MyTextField
                      error
                      id="standard-error-helper-text"
                      helperText={errMsgCompany}
                      label="Workplace"
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      placeholder="Enter your Workplace"
                      value={company}
                      onChange={handleChangeCompany}
                      InputProps={{
                        inputProps: {
                          maxLength: 20,
                        },
                      }}
                    />
                  ) : (
                    <MyTextField
                      label="Workplace"
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      placeholder="Enter your Workplace"
                      value={company}
                      onChange={handleChangeCompany}
                      InputProps={{
                        inputProps: {
                          maxLength: 20,
                        },
                      }}
                    />
                  )}

                  {isErrDescription ? (
                    <MyTextField
                      error
                      id="standard-error-helper-text"
                      helperText={errMsgDescription}
                      label="Description"
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      placeholder="Enter short Descriptions about your self. (A Specialist Developer, Problem Solver, etc)"
                      value={description}
                      onChange={handleChangeDescription}
                      InputProps={{
                        inputProps: {
                          maxLength: 50,
                        },
                      }}
                    />
                  ) : (
                    <MyTextField
                      label="Description"
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      placeholder="Enter short Descriptions about your self. (A Specialist Developer, Problem Solver, etc)"
                      value={description}
                      onChange={handleChangeDescription}
                      InputProps={{
                        inputProps: {
                          maxLength: 50,
                        },
                      }}
                    />
                  )}

                  <div style={{ display: "flex", justifyContent: "center" }}>
                    {isDisabledPersonalData ? (
                      <MyButton
                        disabled
                        variant="contained"
                        color="primary"
                        // fullWidth
                        onClick={editProfile}>
                        Submit
                      </MyButton>
                    ) : isLoadingPersonalData ? (
                      <LoadingButton
                        loading={isLoadingPersonalData}
                        variant="contained"
                        color="primary"
                        // fullWidth
                        sx={{
                          borderRadius: "20px",
                          marginTop: "20px",
                          background: "#5e50a1",
                          color: "black",
                        }}
                        onClick={editProfile}>
                        {isLoadingPersonalData ? "Loading..." : "Submit"}
                      </LoadingButton>
                    ) : (
                      <MyButton
                        variant="contained"
                        color="primary"
                        // fullWidth
                        onClick={editProfile}>
                        Submit
                      </MyButton>
                    )}
                  </div>
                </div>
              </div>

              <div className={`${style["skill-container"]}`}>
                <div className={`${style["skill"]}`}>
                  <h3>Skill</h3>
                  <hr />

                  <div>
                    {isErrorSkill ? (
                      <MyTextField
                        error
                        id="standard-error-helper-text"
                        helperText={errMsgSkill}
                        label="Skill"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        placeholder="Enter skills separated by commas"
                        value={skill}
                        onChange={handleChangeSkill}
                        InputProps={{
                          inputProps: {
                            maxLength: 100,
                          },
                        }}
                      />
                    ) : (
                      <MyTextField
                        label="Skill"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        placeholder="Enter skills separated by commas"
                        value={skill}
                        onChange={handleChangeSkill}
                        InputProps={{
                          inputProps: {
                            maxLength: 100,
                          },
                        }}
                      />
                    )}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginLeft: "10px",
                      }}>
                      {isDisabledSkill ? (
                        <MyButton
                          disabled
                          variant="contained"
                          color="primary"
                          onClick={editSkill}>
                          Submit
                        </MyButton>
                      ) : isLoadingSkill ? (
                        <LoadingButton
                          loading={isLoadingSkill}
                          variant="contained"
                          color="primary"
                          sx={{
                            borderRadius: "20px",
                            marginTop: "20px",
                            background: "#5e50a1",
                            color: "black",
                          }}
                          onClick={editSkill}>
                          {isLoadingSkill ? "Loading..." : "Submit"}
                        </LoadingButton>
                      ) : (
                        <MyButton
                          variant="contained"
                          color="primary"
                          onClick={editSkill}>
                          Submit
                        </MyButton>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className={`${style["experience-container"]}`}>
                <div className={`${style["experience"]}`}>
                  <h3>Job Experience</h3>
                  <hr />
                  {jobTitle !== "Other" ? (
                    <MySelectInput variant="outlined">
                      <MyInputLabel id="job-title-label">Position</MyInputLabel>
                      <MySelect
                        labelId="job-title-label"
                        id="job-title-select"
                        value={jobTitle}
                        label="Position"
                        onChange={handleJobTitleChange}>
                        {jobTitles.map((title) => (
                          <MyMenuItem key={title} value={title}>
                            {title}
                          </MyMenuItem>
                        ))}
                      </MySelect>
                    </MySelectInput>
                  ) : (
                    <>
                      <MySelectInput variant="outlined">
                        <MyInputLabel id="job-title-label">
                          Position
                        </MyInputLabel>
                        <MySelect
                          labelId="job-title-label"
                          id="job-title-select"
                          value={jobTitle}
                          label="Position"
                          onChange={handleJobTitleChange}>
                          {jobTitles.map((title) => (
                            <MyMenuItem key={title} value={title}>
                              {title}
                            </MyMenuItem>
                          ))}
                        </MySelect>
                      </MySelectInput>
                      {isErrorJobTitle ? (
                        <MyTextField
                          error
                          id="standard-error-helper-text"
                          helperText={errMsgJobTitle}
                          label="Position (manual)"
                          fullWidth
                          margin="normal"
                          variant="outlined"
                          placeholder="Enter your Position"
                          value={jobTitleManual}
                          onChange={handleJobTitleManualChange}
                          InputProps={{
                            inputProps: {
                              maxLength: 20,
                            },
                          }}
                        />
                      ) : (
                        <MyTextField
                          label="Position (manual)"
                          fullWidth
                          margin="normal"
                          variant="outlined"
                          placeholder="Enter your Position"
                          value={jobTitleManual}
                          onChange={handleJobTitleManualChange}
                          InputProps={{
                            inputProps: {
                              maxLength: 20,
                            },
                          }}
                        />
                      )}
                    </>
                  )}

                  {isErrorCompanyName ? (
                    <MyTextField
                      error
                      id="standard-error-helper-text"
                      helperText={errMsgCompanyName}
                      label="Company Name"
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      placeholder="PT. XXX"
                      value={companyName}
                      onChange={handleChangeCompanyName}
                      InputProps={{
                        inputProps: {
                          maxLength: 20,
                        },
                      }}
                    />
                  ) : (
                    <MyTextField
                      label="Company Name"
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      placeholder="PT. XXX"
                      value={companyName}
                      onChange={handleChangeCompanyName}
                      InputProps={{
                        inputProps: {
                          maxLength: 20,
                        },
                      }}
                    />
                  )}

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}>
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                      <DatePicker
                        format="DD/MM/YYYY"
                        label="Date Start"
                        // value={selectedDate}
                        sx={{
                          "& label": {
                            // color: "#46505c",
                            marginTop: "-6px",
                          },
                          "& label.Mui-focused": {
                            color: "#5e50a1",
                          },
                          "& .MuiOutlinedInput-root": {
                            height: "40px",
                            "& fieldset": {
                              borderColor: "#8692a6",
                            },
                            "&:hover fieldset": {
                              borderColor: "#5e50a1",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "#5e50a1",
                            },
                          },
                          marginTop: "20px",
                        }}
                        onChange={handleChangeDate}
                      />
                    </LocalizationProvider>

                    <LocalizationProvider dateAdapter={AdapterMoment}>
                      <DatePicker
                        format="DD/MM/YYYY"
                        label="Date End"
                        // value={selectedDateEnd}
                        sx={{
                          "& label": {
                            // color: "#46505c",
                            marginTop: "-6px",
                          },
                          "& label.Mui-focused": {
                            color: "#5e50a1",
                          },
                          "& .MuiOutlinedInput-root": {
                            height: "40px",
                            "& fieldset": {
                              borderColor: "#8692a6",
                            },
                            "&:hover fieldset": {
                              borderColor: "#5e50a1",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "#5e50a1",
                            },
                          },
                          marginTop: "20px",
                        }}
                        onChange={handleChangeDateEnd}
                      />
                    </LocalizationProvider>
                  </div>

                  {isErrorJobDescription ? (
                    <MyTextField
                      error
                      id="standard-error-helper-text"
                      helperText={errMsgJobDescription}
                      label="Description"
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      placeholder="Short Descriptions about your Jobs"
                      value={jobDescription}
                      onChange={handleChangejobDescription}
                      InputProps={{
                        inputProps: {
                          maxLength: 100,
                        },
                      }}
                    />
                  ) : (
                    <MyTextField
                      label="Description"
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      placeholder="Short Descriptions about your Jobs"
                      value={jobDescription}
                      onChange={handleChangejobDescription}
                      InputProps={{
                        inputProps: {
                          maxLength: 100,
                        },
                      }}
                    />
                  )}

                  <div style={{ display: "flex", justifyContent: "center" }}>
                    {isDisabledJobExp ? (
                      <MyButton
                        disabled
                        variant="contained"
                        color="primary"
                        onClick={editSkill}>
                        Submit
                      </MyButton>
                    ) : isLoadingJobExp ? (
                      <LoadingButton
                        loading={isLoadingJobExp}
                        variant="contained"
                        color="primary"
                        sx={{
                          borderRadius: "20px",
                          marginTop: "20px",
                          background: "#5e50a1",
                          color: "black",
                        }}
                        onClick={editJobExp}>
                        {isLoadingJobExp ? "Loading..." : "Submit"}
                      </LoadingButton>
                    ) : (
                      <MyButton
                        variant="contained"
                        color="primary"
                        onClick={editJobExp}>
                        Submit
                      </MyButton>
                    )}
                  </div>
                </div>
              </div>

              <div className={`${style["portfolio-container"]}`}>
                <div className={`${style["portfolio"]}`}>
                  <h3>Portfolio</h3>
                  <hr />

                  {isErrorProjectName ? (
                    <MyTextField
                      error
                      id="standard-error-helper-text"
                      helperText={errMsgProjectName}
                      label="Project Name"
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      placeholder="Enter your Project Name"
                      value={projectName}
                      onChange={handleChangeProjectName}
                      InputProps={{
                        inputProps: {
                          maxLength: 100,
                        },
                      }}
                    />
                  ) : (
                    <MyTextField
                      label="Project Name"
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      placeholder="Enter your Project Name"
                      value={projectName}
                      onChange={handleChangeProjectName}
                      InputProps={{
                        inputProps: {
                          maxLength: 100,
                        },
                      }}
                    />
                  )}

                  {isErrorRepository ? (
                    <MyTextField
                      error
                      id="standard-error-helper-text"
                      helperText={errMsgRepository}
                      label="Repository Link"
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      placeholder="Enter your Repository Link"
                      value={repository}
                      onChange={handleChangeRepository}
                      InputProps={{
                        inputProps: {
                          maxLength: 100,
                        },
                      }}
                    />
                  ) : (
                    <MyTextField
                      label="Repository Link"
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      placeholder="Enter your Repository Link"
                      value={repository}
                      onChange={handleChangeRepository}
                      InputProps={{
                        inputProps: {
                          maxLength: 100,
                        },
                      }}
                    />
                  )}

                  <form>
                    <div className={style["exp-row"]}>
                      <div className={style["row-1"]}>
                        <input
                          className={`mx-3 my-2 ${style["form-check-input"]}`}
                          type="radio"
                          name="reason"
                          id="projects"
                          value="Web App"
                          onClick={() => setProjectType("Web App")}
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
                          value="Mobile App"
                          onClick={() => setProjectType("Mobile App")}
                        />
                        <label className="form-check-label" htmlFor="projects">
                          Mobile App
                        </label>
                      </div>
                    </div>
                  </form>

                  {isErrorRepositoryPhoto ? (
                    <MyTextField
                      error
                      id="standard-error-helper-text"
                      helperText={errMsgRepositoryPhoto}
                      label="Repository Photo Link"
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      placeholder="Enter your Repository Photo Link"
                      value={repositoryPhoto}
                      onChange={handleChangeRepoPhoto}
                      InputProps={{
                        inputProps: {
                          maxLength: 100,
                        },
                      }}
                    />
                  ) : (
                    <MyTextField
                      label="Repository Photo Link"
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      placeholder="Enter your Repository Photo Link"
                      value={repositoryPhoto}
                      onChange={handleChangeRepoPhoto}
                      InputProps={{
                        inputProps: {
                          maxLength: 100,
                        },
                      }}
                    />
                  )}

                  <div style={{ display: "flex", justifyContent: "center" }}>
                    {isDisabledPortfolio ? (
                      <MyButton
                        disabled
                        variant="contained"
                        color="primary"
                        onClick={editPortfolio}>
                        Submit
                      </MyButton>
                    ) : isLoadingPortfolio ? (
                      <LoadingButton
                        loading={isLoadingPortfolio}
                        variant="contained"
                        color="primary"
                        sx={{
                          borderRadius: "20px",
                          marginTop: "20px",
                          background: "#5e50a1",
                          color: "black",
                        }}
                        onClick={editPortfolio}>
                        {isLoadingPortfolio ? "Loading..." : "Submit"}
                      </LoadingButton>
                    ) : (
                      <MyButton
                        variant="contained"
                        color="primary"
                        onClick={editPortfolio}>
                        Submit
                      </MyButton>
                    )}
                  </div>
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

  const token = getCookie("token", context) || "";
  const profile = getCookie("profile", context) || "";

  const connect = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/v1/user/profile`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const convertData = connect.data;
  // console.log(convertData);

  return {
    props: {
      JobList: convertData,
      token,
      profile,
    },
  };
};

export default Jobs;
