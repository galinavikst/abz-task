"use client";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { FormControl, FormHelperText } from "@mui/material";
import style from "./form.module.scss";
import { useMask, type InputMaskProps } from "@react-input/mask";

const colors = {
  "primary-accent-color": "#f4e041",
  "hover-btn-color": "#ffe302",
  "disabled-btn-color": "#b4b4b4",
  "secondary-accent-color": "#00bdd3",
  "app-bg-color": "#f8f8f8",
  "disabled-btn-text-color": "#ffffffde",
  "pure-white": "#fff",
  "primary-text-color": "#000000de",
  secondaryTextColor: "#7e7e7e",
  borderColor: "#d0cfcf",
  errorColor: "#cb3d40",
};

const CssTextField = styled(TextField)({
  position: "relative",
  "& label.Mui-focused": {
    color: colors.secondaryTextColor,
  },

  "& .MuiOutlinedInput-root": {
    color: colors.secondaryTextColor,

    "& fieldset": {
      border: "1px solid " + colors.borderColor,
    },
    "&:hover fieldset": {
      borderColor: colors.borderColor,
    },
    "&.Mui-focused fieldset": {
      border: "1px solid " + colors.borderColor,
    },
  },

  // validation
  "& input:valid + fieldset": {
    borderColor: colors.borderColor,
    borderWidth: 1,
  },
  "& input:invalid + fieldset": {
    borderColor: colors.errorColor,
    borderWidth: 2,
  },
});

type InputProps = {
  type: string;
  name: string;
  label: string;
  helperText: string;
};

export default function CustomTextField({
  type,
  name,
  helperText,
  label,
}: InputProps) {
  const inputTeLRef = useMask({
    mask: "+38 (___) ___-__-__",
    replacement: { _: /\d/ },
  });

  const [tel, setTel] = useState("");

  const handleChange = (value: string) => {
    setTel(value);
  };
  return (
    <FormControl>
      <CssTextField
        name={name}
        inputRef={name === "tel" ? inputTeLRef : null}
        type={type}
        label={label}
      />
      <FormHelperText
        classes={{
          root: style.helper,
        }}
        id={name}
      >
        {helperText}
      </FormHelperText>
    </FormControl>
  );
}
