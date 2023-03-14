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

const Jobs = (props) => {
  const router = useRouter();
  // const JobList = props.JobList;
  // console.log(JobList.data.rows[0]);

  const [specificData, setSpecificData] = React.useState(null);
  const [isAuth, setIsAuth] = React.useState(false);
  const [getData, setGetData] = React.useState(null);
  const [getToken, setGetToken] = React.useState(null);
  const [showModalSuccess, setShowModalSuccess] = React.useState(false);

  const handleCloseSuccess = () => {
    setShowModalSuccess(false);
  };

  React.useEffect(() => {
    let token = props.token;
    let profile = props.profile;

    if (props.token && props.profile) {
      const convertData = JSON.parse(props.profile);

      setGetData(convertData);
      setGetToken(token);
      setIsAuth(true);
      setSpecificData(props.JobList?.data?.[0]);
    }
  }, []);

  console.log("getData=>", getData);

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

  const [isLoading, setIsLoading] = React.useState(false);
  let isDisabled = true;

  const [fullname, setFullname] = React.useState(null);
  const [isErrName, setIsErrName] = React.useState(false);
  const [errMsgName, setErrMsgName] = React.useState("");

  const [other, setOther] = React.useState("");
  const [isErrOther, setIsErrOther] = React.useState(false);
  const [errMsgOther, setErrMsgOther] = React.useState("");

  const [email, setEmail] = React.useState(null);
  const [isErrEmail, setIsErrEmail] = React.useState(false);
  const [errMsgEmail, setErrMsgEmail] = React.useState("");

  const [phone, setPhone] = React.useState(null);
  const [isErrPhone, setIsErrPhone] = React.useState(false);
  const [errMsgPhone, setErrMsgPhone] = React.useState("");

  const [description, setDescription] = React.useState("");
  const [isErrDescription, setIsErrDescription] = React.useState(false);
  const [errMsgDescription, setErrMsgDescription] = React.useState("");

  const [selectedOption, setSelectedOption] = React.useState("");
  console.log("selectedOption---", selectedOption);
  if ((other || selectedOption) && fullname && email && phone && description) {
    isDisabled = false;
  }

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setOther("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(fullname, email, phone, description, selectedOption, other);
  };

  const handleChangeName = (event) => {
    const name = event.target.value;
    const strRegex = /^(?=.*\S)[A-Za-z ]{5,35}$/;
    if (!strRegex.test(name)) {
      setErrMsgName(
        "Name must contain only letters and spaces, and be between 5-35 characters long."
      );
      setIsErrName(true);
      setFullname(null);
      return;
    }
    setIsErrName(false);
    setFullname(name);
  };

  const handleChangeOther = (event) => {
    const otherPurpose = event.target.value;
    const strRegex = /^(?=.*\S)[A-Za-z ]{5,20}$/;
    if (!strRegex.test(otherPurpose)) {
      setErrMsgOther(
        "Purpose must contain only letters and spaces, and be between 5-20 characters long."
      );
      setIsErrOther(true);
      setOther(null);
      return;
    }
    setIsErrOther(false);
    setOther(otherPurpose);
  };

  const handleChangeEmail = (event) => {
    const email = event.target.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrMsgEmail("Please enter a valid email address");
      setIsErrEmail(true);
      setEmail(null);
      return;
    }
    setIsErrEmail(false);
    setEmail(email);
  };

  const handleChangePhone = (event) => {
    const phoneNum = event.target.value.replace(/\D/g, "");
    const phoneRegex = /^[0-9]+$/;
    if (!phoneRegex.test(phoneNum)) {
      setErrMsgPhone("Please enter a valid phone number");
      setIsErrPhone(true);
      setPhone(null);
      return;
    }
    setIsErrPhone(false);
    setPhone(phoneNum);
  };

  const handleChangeDescription = (event) => {
    const descriptions = event.target.value;
    const strRegex = /^(?=.*\S)[A-Za-z ]{10,20}$/;
    if (!strRegex.test(descriptions)) {
      setErrMsgDescription(
        "Name must contain only letters and spaces, and be between 10-20 characters long."
      );
      setIsErrDescription(true);
      setDescription(null);
      return;
    }
    setIsErrDescription(false);
    setDescription(descriptions);
  };

  const executeHire = async () => {
    try {
      setIsLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      };

      let data = {
        user_id: getData.id,
        purpose: selectedOption == "Other" ? other : selectedOption,
        fullname,
        email,
        phone_number: phone,
        description,
      };

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/user/invitation`,
        data,
        config
      );

      setIsLoading(false);
      setShowModalSuccess(true);
    } catch (error) {
      console.log("error---", error);
      setIsLoading(false);
    }
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
        <section id={style["hire-content"]}>
          <div className={`container ${style["container"]}`}>
            <div className={`${style["left-content"]}`}>
              <img src={specificData?.user?.photo_profile} alt="user pp" />
              <div className={style["text-content"]}>
                <h2>{specificData?.user?.fullname}</h2>
                <p>{specificData?.job}</p>
                <div
                  className={`d-flex align-items-center gap-2 ${style["card-icon"]}`}>
                  <FaMapMarkerAlt className={style["react-icons-3"]} />
                  <p className="">{specificData?.domicile}</p>
                </div>
                <p className={`${style["description"]}`}>
                  {specificData?.description}
                </p>
                <h4>Skill</h4>
                {specificData?.skills &&
                JSON.parse(specificData?.skills)?.length !== 0 ? (
                  <React.Fragment>
                    <div className={`${style["skill-badges"]}`}>
                      {JSON.parse(specificData?.skills).map((item, key) => (
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

                <div className={style["left-icons"]}>
                  <p>
                    <span>
                      <FaRegEnvelope />
                    </span>
                    {specificData?.user?.email}
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
                    {selectedOption === "Other" &&
                      (isErrOther ? (
                        <MyTextField
                          error
                          id="standard-error-helper-text"
                          helperText={errMsgOther}
                          label="Other Purpose"
                          fullWidth
                          margin="normal"
                          variant="outlined"
                          placeholder="Enter your Other Purpose"
                          value={other}
                          onChange={handleChangeOther}
                          InputProps={{
                            inputProps: {
                              maxLength: 20,
                            },
                          }}
                        />
                      ) : (
                        <MyTextField
                          label="Other Purpose"
                          fullWidth
                          margin="normal"
                          variant="outlined"
                          placeholder="Enter your Other Purpose"
                          value={other}
                          onChange={handleChangeOther}
                          InputProps={{
                            inputProps: {
                              maxLength: 20,
                            },
                          }}
                        />
                      ))}
                  </div>

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
                          maxLength: 35,
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
                          maxLength: 35,
                        },
                      }}
                    />
                  )}

                  {isErrEmail ? (
                    <MyTextField
                      error
                      id="standard-error-helper-text"
                      helperText={errMsgEmail}
                      label="Email"
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      placeholder="Enter your Email"
                      value={email}
                      onChange={handleChangeEmail}
                      InputProps={{
                        inputProps: {
                          maxLength: 50,
                        },
                      }}
                    />
                  ) : (
                    <MyTextField
                      label="Email"
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      placeholder="Enter your Email"
                      value={email}
                      onChange={handleChangeEmail}
                      InputProps={{
                        inputProps: {
                          maxLength: 50,
                        },
                      }}
                    />
                  )}

                  {isErrPhone ? (
                    <MyTextField
                      error
                      id="standard-error-helper-text"
                      helperText={errMsgPhone}
                      label="Phone"
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      placeholder="Enter your Phone Number"
                      value={phone}
                      onChange={handleChangePhone}
                      InputProps={{
                        inputProps: {
                          maxLength: 15,
                        },
                      }}
                    />
                  ) : (
                    <MyTextField
                      label="Phone"
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      placeholder="Enter your Phone Number"
                      value={phone}
                      onChange={handleChangePhone}
                      InputProps={{
                        inputProps: {
                          maxLength: 15,
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
                      placeholder="Enter your Description"
                      value={description}
                      onChange={handleChangeDescription}
                      InputProps={{
                        inputProps: {
                          maxLength: 15,
                        },
                      }}
                    />
                  ) : (
                    <MyTextField
                      label="Description"
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      placeholder="Enter your Description"
                      value={description}
                      onChange={handleChangeDescription}
                      InputProps={{
                        inputProps: {
                          maxLength: 15,
                        },
                      }}
                    />
                  )}
                </form>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  {isDisabled ? (
                    <MyButton
                      disabled
                      variant="contained"
                      color="primary"
                      // fullWidth
                      onClick={executeHire}>
                      Sent
                    </MyButton>
                  ) : isLoading ? (
                    <LoadingButton
                      loading={isLoading}
                      variant="contained"
                      color="primary"
                      // fullWidth
                      sx={{
                        borderRadius: "20px",
                        marginTop: "20px",
                        background: "#5e50a1",
                        color: "black",
                      }}
                      onClick={executeHire}>
                      {isLoading ? "Loading..." : "Sent"}
                    </LoadingButton>
                  ) : (
                    <MyButton
                      variant="contained"
                      color="primary"
                      // fullWidth
                      onClick={executeHire}>
                      Sent
                    </MyButton>
                  )}
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
  const { hire } = context.query;

  const connect = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/v1/user/detail/${hire}`
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
