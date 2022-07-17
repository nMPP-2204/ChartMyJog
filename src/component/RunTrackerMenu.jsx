import React from "react";
import { Drawer, IconButton, styled, useTheme } from "@mui/material";
import {
  ChevronLeft,
  ChevronRight,
  House,
  Dashboard,
  Login,
  DirectionsRun,
} from "@mui/icons-material";
import NavbarMenuItem from "./NavbarMenuItem";

export default function RunTrackerMenu(open, setOpen) {
  const theme = useTheme();
  const drawerWidth = 240;

  const menuClose = () => {
    open.setOpen(false);
  };

  const drawer = (
    <>
      <NavbarMenuItem link="/signup" linkName="LOGIN/SIGNUP" Icon={Login} />
      <NavbarMenuItem link="/home" linkName="HOME" Icon={House} />
      <NavbarMenuItem
        link="/run-tracker"
        linkName="START RUN!"
        Icon={DirectionsRun}
      />
      <NavbarMenuItem link="/dashboard" linkName="DASHBOARD" Icon={Dashboard} />
    </>
  );

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
  }));

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
        },
      }}
      variant="temporary"
      open={open.open}
      onClose={menuClose}
      anchor="right"
      ModalProps={{
        keepMounted: true,
      }}
    >
      <DrawerHeader>
        <IconButton onClick={menuClose}>
          {theme.direction === "rtl" ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>
      </DrawerHeader>
      {drawer}
    </Drawer>
  );
}
