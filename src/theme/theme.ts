"use client";

import { createTheme } from "@mui/material/styles";

export const themeColors = {
  colors: {
    whiteFFF: "#FFFFFF",
    black000: "#000000",
    blue219: "#2196F3",
    blue189: "#1890FF",
    purple9C2: "#9C27B0",
    green2E7: "#2E7D32",
    redD32: "#D32F2F",
    redE74: "#E74C3C",
    grayB4B: "#B4B4B4",
    grayF8F: "#F8F8F8",
    grayBDB: "#BDBDBD",
    grayE9E: "#E9EEF1",
    grayF2F: "#F2F6F8",
    grayD2D: "#D2D2D2",
    grayFAF: "#FAFAFA",
    gray5C6: "#5C636D",
    grayF0F: "#F0F0F0",
    grayE3E: "#E3EAEF",
    grayDCD: "#DCDCDC",
    orangeEF6: "#EF6C00",
    blackRgba09: "rgba(0, 0, 0, 0.09)",
    blackRgba08: "rgba(0, 0, 0, 0.08)",
    blackRgba87: "rgba(0, 0, 0, 0.87)",
    blackRgba80: "rgba(0, 0, 0, 0.80)",
    blackRgba32: "rgba(0, 0, 0, 0.32)",
    blackRgba23: "rgba(0, 0, 0, 0.23)",
    blackRgba38: "rgba(0, 0, 0, 0.38)",
    blackRgba26: "rgba(0, 0, 0, 0.26)",
    blackRgba60: "rgba(0, 0, 0, 0.60)",
    blackRgba45: "rgba(0, 0, 0, 0.45)",
    blackRgba55: "rgba(0, 0, 0, 0.55)",
    blueRgba08: "rgba(33, 150, 243, 0.08)",
    blueRgba85: "rgba(24, 144, 255, 0.85)",
  },
  boxShadow:
    "0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)",
};

const themeOptions = {
  boxShadow:
    "0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)",
  palette: {
    background: {
      default: "#FFFFFF",
    },
    color: {
      default: "rgba(0, 0, 0, 0.87)",
    },
    fontSize: 16,
    lineHeight: "24px",
  },
};
const theme = createTheme(themeOptions);

export default theme;
