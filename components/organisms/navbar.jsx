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
import { deleteData } from "@/store/reducer/user";
import axios from "axios";

import { styled, alpha } from "@mui/material/styles";
import {
  useMediaQuery,
  Avatar,
  Button,
  Modal,
  Card,
  CardContent,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";

// const Search = styled("div")(({ theme }) => ({
//   position: "relative",
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.common.white, 0.15),
//   "&:hover": {
//     backgroundColor: alpha(theme.palette.common.white, 0.25),
//   },
//   marginRight: theme.spacing(2),
//   marginLeft: 0,
//   width: "100%",
//   [theme.breakpoints.up("sm")]: {
//     marginLeft: theme.spacing(3),
//     width: "auto",
//   },
// }));

// const SearchIconWrapper = styled("div")(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: "100%",
//   position: "absolute",
//   pointerEvents: "none",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: "inherit",
//   "& .MuiInputBase-input": {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create("width"),
//     width: "100%",
//     [theme.breakpoints.up("md")]: {
//       width: "20ch",
//     },
//   },
// }));

const Navbar = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { auth } = useSelector((state) => state);
  // console.log(auth.profile.user_id)

  const [isAuth, setIsAuth] = React.useState(false);
  const [getData, setGetData] = React.useState(null);
  const [getToken, setGetToken] = React.useState(null);
  const [getProfile, setGetPofile] = React.useState([]);

  React.useEffect(() => {
    let token = getCookie("token");
    let profile = getCookie("profile");

    if (token && profile) {
      const convertData = JSON.parse(profile);

      setGetData(convertData);
      setGetToken(token);
      setIsAuth(true);
    } else {
      if (router.pathname !== "/" && router.pathname !== "/jobs") {
        router.push("/auth/login");
      }
    }
  }, []);

  React.useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/v1/user/profile`,
          {
            headers: {
              Authorization: `Bearer ${getCookie("token")}`,
            },
          }
        );
        setGetPofile(response?.data?.data?.[0]);
      } catch (error) {
        console.log("error UEF", error);
      }
    };
    getProfile();
  }, []);

  const profPict = getData?.photo_profile;

  const handleLogout = () => {
    deleteCookie("profile");
    deleteCookie("token");
    dispatch(deleteAuthData());
    dispatch(deleteData());
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

  const handleHome = () => {
    router.push(`/`);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isXs = useMediaQuery("(max-width: 600px)");

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}>
      <MenuItem onClick={handleProfile}>Profile</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}>
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge
            badgeContent={getProfile?.hire_histories?.length}
            color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      {/* <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit">
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem> */}
      <MenuItem
        onClick={() => {
          // handleProfileMenuOpen()
          handleProfile();
        }}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit">
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleLogout();
        }}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit">
          <LogoutIcon />
        </IconButton>
        <p>Logout</p>
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          sx={{ backgroundColor: "white", color: "#757575" }}>
          <Toolbar>
            {/* <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton> */}
            {!isXs ? (
              <img
                className={style["main-logo"]}
                src="/images/logo-text-2.png"
                alt="main logo"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  height: "100%",
                  width: "120px",
                  cursor: "pointer",
                }}
                onClick={() => router.push("/jobs")}
              />
            ) : (
              <img
                className={style["main-logo"]}
                src="/images/logo-2.png"
                alt="main logo"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  height: "100%",
                  width: "30px",
                  cursor: "pointer",
                }}
                onClick={() => router.push("/jobs")}
              />
            )}
            {/* <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}></Typography> */}

            <Box sx={{ flexGrow: 1 }} />
            {isAuth ? (
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <IconButton
                  size="large"
                  aria-label="show 4 new mails"
                  color="inherit">
                  <Badge
                    badgeContent={getProfile?.hire_histories?.length}
                    color="error">
                    <MailIcon />
                  </Badge>
                </IconButton>
                {/* <IconButton
                  size="large"
                  aria-label="show 17 new notifications"
                  color="inherit">
                  <Badge badgeContent={17} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton> */}
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit">
                  <Avatar
                    alt="user pict"
                    src={profPict}
                    sx={{ width: 44, height: 44 }}
                  />
                </IconButton>
              </Box>
            ) : (
              <Button
                variant="outlined"
                href="/auth/login"
                sx={{
                  borderColor: "#5e50a1",
                  color: "#5e50a1",
                  fontWeight: 500,
                  "&:hover": {
                    backgroundColor: "#5e60a1",
                    borderColor: "#5e50a1",
                    color: "white",
                  },
                }}>
                Login
              </Button>
            )}

            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit">
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </Box>
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
