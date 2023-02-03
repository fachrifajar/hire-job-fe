import React from "react";
import style from "../../styles/components/navbar.module.scss";
import { useRouter } from "next/router";
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";
import Link from "next/link";

const Navbar = (props) => {
  const router = useRouter();
  const data = props.JobList;

  const [isAuth, setIsAuth] = React.useState(false);
  const [getData, setGetData] = React.useState(null);
  const [getToken, setGetToken] = React.useState(null);
  const [showDropdown, setShowDropdown] = React.useState(false);

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

  const profPict = getData?.photo_profile;

  // console.log(profPict);
  // console.log(isAuth);

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
  return (
    <>
        <nav
          className={`${style["navbar"]} navbar navbar-expand-lg bg-body-tertiary ${style["main-nav"]}`}>
          <div className="container">
            {/* <button
              className="navbar-toggler"
              data-bs-toggle="collapse"
              data-bs-target="#nav"
              aria-controls="nav"
              aria-label="Expand Navigation">
              <span className="navbar-toggler-icon"></span>
            </button> */}
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
                        <Link href="/jobs" onClick={handleLogout}>
                          Logout
                        </Link>
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

export default Navbar;
