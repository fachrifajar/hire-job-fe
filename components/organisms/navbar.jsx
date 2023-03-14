import React from "react";
import style from "../../styles/components/navbar.module.scss";
import { useRouter } from "next/router";
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";
import { FaRegBell, FaRegEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import * as auth from "@/store/reducer/auth";
import { deleteAuthData } from "@/store/reducer/auth";

const Navbar = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { auth } = useSelector((state) => state);
  // console.log(auth.profile.user_id)

  const [isAuth, setIsAuth] = React.useState(false);
  const [getData, setGetData] = React.useState(null);
  const [getToken, setGetToken] = React.useState(null);
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [getJobList, setGetJobList] = React.useState([]);

  const handleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  React.useEffect(() => {
    let token = getCookie("token");
    let profile = getCookie("profile");

    if (token && profile) {
      const convertData = JSON.parse(profile);

      setGetData(convertData);
      setGetToken(token);
      setIsAuth(true);
    }
  }, []);

  const profPict = getData?.photo_profile;

  const handleLogout = () => {
    deleteCookie("profile");
    deleteCookie("token");
    dispatch(deleteAuthData());
    router.push("/auth/login");
  };

  const handleLogin = () => {
    router.push("/auth/login");
  };

  const handleSignup = () => {
    router.push("/auth/register");
  };

  const handleProfile = () => {
    router.push(`/profile/${auth.profile.user_id}`);
  };

  return (
    <>
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
                  <img src={profPict} alt="user pp" onClick={handleDropdown} />
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
                          href="#"
                          onClick={handleProfile}>
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
    </>
  );
};

//components tidak bisa pake ssr. hanya file utama yang bisa
// export const getServerSideProps = async (context) => {
//   const connect = await axios.get(
//     `${process.env.NEXT_PUBLIC_API_URL}/v1/user/list?limit=10&page=1`
//   );

//   const convertData = connect.data;
//   console.log(convertData);

//   const token = getCookie("token", context) || "";
//   const profile = getCookie("profile", context) || "";
//   console.log(token);
//   console.log(profile);

//   return {
//     props: {
//       JobList: convertData,
//       token,
//       profile,
//     },
//   };
// };

export default Navbar;
