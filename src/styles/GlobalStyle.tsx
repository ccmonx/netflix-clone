import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyle = createGlobalStyle`
 ${reset}
 * {
  box-sizing: border-box;
 }  
 body {
  background-color: ${(props) => props.theme.white.lighter};
  color: ${(props) => props.theme.black.lighter};
  line-height: 1.4;
 }
 a {
  color: inherit;
  text-decoration: none;
 }
`;
