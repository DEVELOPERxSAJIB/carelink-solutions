// components/Transition.js
import { CSSTransition } from "react-transition-group";
import styled, { css } from "styled-components";

const Fade = styled.div`
  &.fade-enter {
    opacity: 0;
  }
  &.fade-enter-active {
    opacity: 1;
    transition: opacity 300ms;
  }
  &.fade-exit {
    opacity: 1;
  }
  &.fade-exit-active {
    opacity: 0;
    transition: opacity 300ms;
  }
`;

const Transition = ({ children, inProp }) => {
  return (
    <CSSTransition in={inProp} timeout={300} classNames="fade" unmountOnExit>
      <Fade>{children}</Fade>
    </CSSTransition>
  );
};

export default Transition;
