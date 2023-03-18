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
  CardMedia,
  Stack,
} from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { CardActionArea } from "@mui/material";
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

const MyCard = styled(Card)({
  margin: "auto",
  // marginBottom: "30%",
  // maxWidth: 500,
  textAlign: "center",
  borderRadius: "20px",
  padding: "25px",
  maxHeight: "500px",
  overflowY: "auto",
});

const MyModal = styled(Modal)({
  display: "flex",
  alignItems: "flexStart",
  justifyContent: "flexStart",
});

const Navbar = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { auth } = useSelector((state) => state);
  // console.log(auth.profile.user_id)

  const [isAuth, setIsAuth] = React.useState(false);
  const [getData, setGetData] = React.useState(null);
  const [getToken, setGetToken] = React.useState(null);
  const [getProfile, setGetProfile] = React.useState([]);

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
        setGetProfile(response?.data?.data?.[0]?.hire_histories);
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

  const [messageEl, setMessageEl] = React.useState(null);
  const [getSpecificHire, setGetSpecificHire] = React.useState(null);
  const [specificModal, setSpecificModal] = React.useState(false);

  const handleCloseMessage = () => {
    setMessageEl(false);
  };

  const handleOpenMessage = () => {
    setMessageEl(true);
  };

  const handleCloseSpecificModal = () => {
    setSpecificModal(false);
  };

  const handleOpenSpecificModal = async () => {
    setSpecificModal(true);
  };

  const handleFetchSpecific = async (id) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/user/invitation/${id}`,
        {
          headers: {
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }
      );
      setGetSpecificHire(response?.data?.data?.[0]);
      // console.log("response=>", response?.data?.data?.[0]);

      // const response2 = await axios.get(
      //   `${process.env.NEXT_PUBLIC_API_URL}/v1/user/profile`,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${getCookie("token")}`,
      //     },
      //   }
      // );
      // setGetProfile(response2?.data?.data?.[0]?.hire_histories);
    } catch (error) {
      console.log("errorFetchHire=>", error);
    }
  };

  // console.log("getProfile=>", getProfile);
  const renderMessageMenu = (
    <MyModal open={messageEl} onClose={handleCloseMessage}>
      <MyCard>
        <CardContent>
          <Typography variant="h4">Messages</Typography>
          <hr />
          {getProfile?.reverse().map((item, key) => (
            <React.Fragment key={key}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
                }}>
                <CardActionArea
                  onClick={() => {
                    handleFetchSpecific(item?.id);
                    handleCloseMessage();
                    handleOpenSpecificModal();
                  }}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {item?.email}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item?.createdAt.split("T")[0]}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </div>
            </React.Fragment>
          ))}
        </CardContent>
        <style>
          {`
    ::-webkit-scrollbar {
      width: 0.1em;
      height: 0.5em;
    }
    ::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.2);
    }
  `}
        </style>
      </MyCard>
    </MyModal>
  );

  const renderSpecificMessage = (
    <MyModal open={specificModal} onClose={handleCloseSpecificModal}>
      <MyCard>
        <CardContent>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "start",
            }}>
            <Avatar sx={{ bgcolor: deepPurple[500], marginRight: "20px" }}>
              {getSpecificHire?.fullname[0].toUpperCase()}
            </Avatar>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                flexDirection: "column",
              }}>
              <Typography variant="body1">
                <strong>Name : </strong>
                {getSpecificHire?.fullname}
              </Typography>
              <Typography variant="body1">
                <strong>Email : </strong>
                {getSpecificHire?.email}
              </Typography>
              <Typography variant="body1">
                <strong> Purpose : </strong>
                {getSpecificHire?.purpose}
              </Typography>
              <Typography variant="body1">
                <strong> Recieve Date : </strong>
                {getSpecificHire?.createdAt.split("T")[0]}
              </Typography>
              <Typography variant="body1">
                <strong>Description : </strong>
                {getSpecificHire?.description}
              </Typography>
            </div>
          </div>
        </CardContent>
        <style>
          {`
::-webkit-scrollbar {
  width: 0.1em;
  height: 0.5em;
}
::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
}
`}
        </style>
      </MyCard>
    </MyModal>
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
                  color="inherit"
                  onClick={handleOpenMessage}>
                  <Badge badgeContent={getProfile?.length} color="error">
                    <MailIcon />
                  </Badge>
                </IconButton>
                {/* <IconButton
                  size="large"
                  aria-label="show 17 new notifications"
                  color="inherit">
                  <Badge badgeContent={getProfile?.hire_histories?.length} color="error">
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
        {renderMessageMenu}
        {renderSpecificMessage}
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
