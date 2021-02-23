//import React, { createContext, useEffect, useState } from "react";
//import axios from "axios";
import { NewsContextProvider } from "./NewsContext";
import News from "./News";
import "./News.css";

function NewsExport() {
  return (
    <NewsContextProvider>
      <News />
    </NewsContextProvider>
  );
}

export default NewsExport;