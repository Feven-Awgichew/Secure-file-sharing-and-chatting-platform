import { keyframes, Skeleton, styled } from "@mui/material";
import { Link as LinkComponent } from "react-router-dom";


const grayColor = "rgba(247, 247, 247, 1)";
const VisuallyHiddenInput = styled("input")({
  border: 0,
  clip: "rect(0 0 0 0)",
  height: 1,
  margin: -1,
  overflow: "hidden",
  padding: 0,
  position: "absolute",
  width: 1,
  whiteSpace: "nowrap",
});

const Link = styled(LinkComponent)({
  textDecoration: "none",
  color: "black",
  padding: "1rem",
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
});

const InputBox = styled("input")({
  width: "100%",
  height: "100%",
  border: "none",
  outline: "none",
  padding: "0 3rem",
  borderRadius: "1.5rem",
  backgroundColor: `${grayColor}`,
});

const SearchField = styled("input")`
  padding: 0.6rem 2rem;
  width: 20vmax;
  border: none;
  outline: none;
  border-radius: 1.5rem;
  background-color: #f9f9f9;
  &:focus {
    border-color: #000;
  }
  font-size: 1.1rem;
`;

const CurveButton = styled("button")`
  padding: 0.6rem 2rem;
  border: none;
  outline: none;
  border-radius: 1.5rem;
  cursor: pointer;
  background-color: black;
  color: white;
  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
  font-size: 1.1rem;
`;

const bounceAnimation = keyframes`
0% { transform: scale(1); }
50% { transform: scale(1.5); }
100% { transform: scale(1); }
`;

const BouncingSkeleton = styled(Skeleton)(() => ({
  animation: `${bounceAnimation} 1s infinite`,
}));

export {
  VisuallyHiddenInput,
  Link,
  InputBox,
  SearchField,
  CurveButton,
  BouncingSkeleton,
};