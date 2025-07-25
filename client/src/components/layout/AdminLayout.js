import {
    Box,
    Drawer,
    Grid,
    IconButton,
    Stack,
    styled,
    Typography,
  } from "@mui/material";
  import {
    Close,
    Dashboard,
    ExitToApp,
    Groups,
    ManageAccounts,
    Menu,
    Message,
  } from "@mui/icons-material";
  import { useState } from "react";
  import { useLocation, Link, Navigate } from "react-router-dom";
  import { useDispatch, useSelector } from "react-redux";
 
  
  const LinkComponent = styled(Link)`
    text-decoration: none;
    border-radius: 2rem;
    padding: 1rem 2rem;
    color: black;
    &:hover {
      background-color: rgba(0, 0, 0, 0.08);
    }
  `;
  
  const adminTabs = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: <Dashboard />,
    },
    /*
    {
      name: "Users",
      path: "/admin/users",
      icon: <ManageAccounts />,
    },
    {
      name: "Chats",
      path: "/admin/chats",
      icon: <Groups />,
    },
    {
      name: "Messages",
      path: "/admin/messages",
      icon: <Message />,
    },
    */
  ];
  
  const Sidebar = ({ w = "100%" }) => {
    const location = useLocation();
    const dispatch = useDispatch();
  
    //const logoutHandler = () => {
      //dispatch(adminLogout());
    //};
  
    return (
      <Stack width={w} direction={"column"} p={"3rem"} spacing={"3rem"}>
        <Typography variant="h6" textTransform={"uppercase"}>
          Admin Panel
        </Typography>
        <Stack spacing={"1rem"}>
          {adminTabs.map((tab) => (
            <LinkComponent
              key={tab.path}
              to={tab.path}
              sx={
                location.pathname === tab.path
                  ? {
                      backgroundColor: "rgba(0, 0, 0, 0.08)",
                      color: "red",
                      hover: { color: "red" },
                    }
                  : {}
              }
            >
              <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
                {tab.icon}
                <Typography fontSize={"1.1rem"}>{tab.name}</Typography>
              </Stack>
            </LinkComponent>
          ))}
  
          
        </Stack>
      </Stack>
    );
  };
  
  const AdminLayout = ({ children }) => {
    const [mobileOpen, setMobileOpen] = useState(false);
    /*<LinkComponent onClick={logoutHandler}>
            <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
              <ExitToApp />
              <Typography fontSize={"1.1rem"}>Logout</Typography>
            </Stack>
          </LinkComponent>
          */
  
    const { isAdmin } = useSelector((state) => state.auth);
  
    const handleMobile = () => {
      setMobileOpen(!mobileOpen);
    };
  
    const handleClose = () => {
      setMobileOpen(false);
    };
  
    if (!isAdmin) {
      return <Navigate to="/admin" />;
    }
  
    return (
      <Grid container minHeight={"100vh"}>
        <Box
          sx={{
            display: { xs: "block", md: "none" },
            position: "fixed",
            zIndex: 100,
            right: "1rem",
            top: "1rem",
          }}
        >
          <IconButton onClick={handleMobile}>
            {mobileOpen ? <Close /> : <Menu />}
          </IconButton>
        </Box>
  
        <Grid
          item
          md={4}
          lg={3}
          sx={{
            display: { xs: "none", md: "block" },
          }}
        >
          <Sidebar />
        </Grid>
        <Grid item xs={12} md={8} lg={9} sx={{ bgcolor: "#f5f5f5f5" }}>
          {children}
        </Grid>
  
        <Drawer open={mobileOpen} onClose={handleClose}>
          <Sidebar w="50vw" />
        </Drawer>
      </Grid>
    );
  };
  export default AdminLayout;