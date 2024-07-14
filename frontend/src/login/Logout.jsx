import React from "react";
import { Providecookies } from "../App";
function Logout() {
  document.cookie = "token=;expires=" + new Date().toUTCString();
  Providecookies("next done");
}

export default Logout;
