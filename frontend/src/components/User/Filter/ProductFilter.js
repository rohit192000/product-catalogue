import React, { lazy, Suspense, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import SearchBar from "../SearchBar";
// import CategoryFilter from "./CategoryFilter";
// import ColorFilter from "./ColorFilter";
const PriceFilter = lazy(() => import("./PriceFilter"));
const ColorFilter = lazy(() => import("./ColorFilter"));
const CategoryFilter = lazy(() => import("./CategoryFilter"));

const ProductFilter = (props) => {
  const drawerWidth = 240;

  const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
    ({ theme, open }) => ({
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginRight: -drawerWidth,
      ...(open && {
        transition: theme.transitions.create("margin", {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: 0,
      }),
    })
  );

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: drawerWidth,
    }),
  }));

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-start",
  }));

  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }} component="div">
            MVT & Fashion
          </Typography>
          <SearchBar
            sx={{ flexGrow: 2 }}
            offset={props.offset}
            setOffset={props.setOffset}
            setProductArray={props.setProductArray}
            setLoading={props.setLoading}
            setProductMap={props.setProductMap}
          />
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            sx={{ ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Main open={open}>
        <DrawerHeader />
      </Main>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronLeftIcon />
            ) : (
              <>
                <ChevronRightIcon />{" "}
                <Typography variant="h6">FILTER</Typography>
              </>
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {open &&
            [
              <Suspense>
                <PriceFilter
                  setProducts={props.setProducts}
                  offset={props.offset}
                  setLoading={props.setLoading}
                  setProductArray={props.setProductArray}
                  setOffset={props.setOffset}
                />
              </Suspense>,
              <Suspense>
                <CategoryFilter
                  offset={props.offset}
                  setLoading={props.setLoading}
                  productArray={props.productArray}
                  setProductArray={props.setProductArray}
                  setOffset={props.setOffset}
                  setProductMap={props.setProductMap}
                  loading={props.loading}
                  productMap={props.productMap}
                  checkedArray={props.checkedArray}
                  setCheckedArray={props.setCheckedArray}
                />
              </Suspense>,
              <Suspense>
                <ColorFilter
                  offset={props.offset}
                  setLoading={props.setLoading}
                  productArray={props.productArray}
                  setProductArray={props.setProductArray}
                  setOffset={props.setOffset}
                  loading={props.loading}
                  productMap={props.productMap}
                  checkedArray={props.checkedArray}
                  setCheckedArray={props.setCheckedArray}
                  setProductMap={props.setProductMap}
                />
              </Suspense>,
            ].map((text, index) => (
              <ListItem key={index} disablePadding sx={{ padding: "7px" }}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
        </List>
        <Divider />
      </Drawer>
    </Box>
  );
};
export default ProductFilter;
