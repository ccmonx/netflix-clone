import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import NetflixSansBold from "../fonts/NetflixSans-Bold.woff2";
import NetflixSansLight from "../fonts/NetflixSans-Light.woff2";
import NetflixSansMedium from "../fonts/NetflixSans-Medium.woff2";
import NetflixSansRegular from "../fonts/NetflixSans-Regular.woff2";

export const GlobalStyle = createGlobalStyle`
 @font-face {
  font-family: NetflixSansBold;
  src: url(${NetflixSansBold}) format("woff2");
 }
 @font-face {
  font-family: NetflixSansLight;
  src: url(${NetflixSansLight}) format("woff2");
 }
 @font-face {
  font-family: NetflixSansMedium;
  src: url(${NetflixSansMedium}) format("woff2");
 }
 @font-face {
  font-family: NetflixSansRegular;
  src: url(${NetflixSansRegular}) format("woff2");
 }
 ${reset}
 * {
  box-sizing: border-box;
 }  
 body {
  background-color: ${(props) => props.theme.white.lighter};
  color: ${(props) => props.theme.black.lighter};
  font-family: NetflixSansMedium, sans-serif;
  line-height: 1.4;
 }
 a {
  color: inherit;
  text-decoration: none;
 }
`;
