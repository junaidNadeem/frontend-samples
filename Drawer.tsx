// This component is a customizable, a responsive drawer with close functionality, adapting its layout for mobile and desktop views
// using Material-UI's SwipeableDrawer, with styles and behaviors controlled by props

import React from "react";
import { hot } from "react-hot-loader";
import { useMediaQuery } from "react-responsive";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import { Container, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

import { IDrawer } from "../../interfaces/shared/IDrawer";

const useStyles = makeStyles({
  list: {
    "& .MuiDrawer-paperAnchorRight": {
      width: (props: { isMobile: boolean; width: string }) =>
        props.isMobile ? "100%" : props.width,
    },
  },
  drawerContent: {
    padding: (props: { isMobile: boolean }) => (props.isMobile ? "0" : "25px"),
  },
  iconButtonContainer: {
    position: "relative",
  },
  iconButton: {
    position: "absolute",
    right: 0,
    marginTop: (props: { isMobile: boolean }) => (props.isMobile ? "1.2rem" : "0"),
    background: "#F6F6FA",
    width: "28px",
    height: "28px",
  },
  closeIcon: {
    width: "1rem",
    height: "1rem",
    color: "#000",
  },
});

const Drawer: React.FC<IDrawer> = ({
  children,
  isOpen,
  onOutsideClick,
  onClose,
  width = "600px",
  disabled,
}) => {
  const isMobile = useMediaQuery({ query: "(max-width: 960px)" });
  const classes = useStyles({ isMobile, width });

  return (
    <SwipeableDrawer
      className={classes.list}
      anchor="right"
      open={isOpen}
      onClose={onOutsideClick}
      onOpen={() => {}}
    >
      <Container className={classes.drawerContent} role="presentation">
        <Container className={classes.iconButtonContainer}>
          <IconButton
            disabled={disabled}
            id="drawer-close-icon"
            className={classes.iconButton}
            onClick={onClose}
          >
            <CloseIcon className={classes.closeIcon} />
          </IconButton>
        </Container>
        {children}
      </Container>
    </SwipeableDrawer>
  );
};

declare let module: Record<string, unknown>;
export default hot(module)(Drawer);
