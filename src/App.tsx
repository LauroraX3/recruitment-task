import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Navigate, Routes, Route } from "react-router-dom";
import Navbar from "./layouts/navbar/Navbar";
import Home from "./layouts/content/home/Home";
import DataDetails from "./layouts/content/data-details/Data-Details";
import NotFound from "./layouts/content/not-found/Not-Found";
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import translationEn from "./translations/en.json";
import translationPl from "./translations/pl.json";

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: {
      en: {
        translation: translationEn,
      },
      pl: {
        translation: translationPl,
      },
    },

    interpolation: {
      escapeValue: false,
    },
  });

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/main" />} />
        <Route path="/main" element={<Home />} />
        <Route path="/views" element={<DataDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
