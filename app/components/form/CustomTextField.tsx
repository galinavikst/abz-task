"use client";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { FormControl, FormHelperText } from "@mui/material";
import style from "./form.module.scss";
import { useMask, type InputMaskProps } from "@react-input/mask";
import { useAppDispatch, useAppSelector } from "@/app/redux/store";
import {
  setInputGroup,
  setValidStatuses,
} from "@/app/redux/features/formSlice";
import isValid from "./validation.js";

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

  // label
  "& .MuiInputLabel-root": {
    fontFamily: "inherit",
    color: colors.secondaryTextColor,
  },
  "& label.Mui-focused": {
    color: colors.secondaryTextColor,
  },
  "& label.Mui-error": {
    color: colors.errorColor,
  },

  // input
  "& .MuiOutlinedInput-root": {
    color: colors.secondaryTextColor,
    // fieldset
    "& fieldset": {
      border: "1px solid " + colors.borderColor,
    },
    "&:hover fieldset": {
      borderColor: colors.borderColor,
    },
    "&.Mui-focused fieldset": {
      border: "1px solid " + colors.borderColor,
    },
    "&.Mui-error fieldset": {
      border: "2px solid " + colors.errorColor,
    },
  },

  // validation
  // "& input:valid + fieldset": {
  //   borderColor: colors.borderColor,
  //   borderWidth: 1,
  // },
});

type InputProps = {
  type: string;
  name: string;
  label: string;
  helperText?: string;
};

export default function CustomTextField({
  type,
  name,
  helperText,
  label,
}: InputProps) {
  const inputTeLRef = useMask({
    mask: "+380_________",
    replacement: { _: /\d/ },
  });

  const dispatch = useAppDispatch();
  const [error, setError] = useState({ input: "", text: "" });

  const values = useAppSelector((state) => state.form.inputGroup);

  const handleChange = (name: string, value: string) => {
    const errorMessage = isValid[name](value);
    if (errorMessage) {
      setError({ input: name, text: errorMessage });
      dispatch(setValidStatuses({ input: name, isValid: false }));
    } else {
      setError({ input: "", text: "" });
      dispatch(setValidStatuses({ input: name, isValid: true }));
    }

    dispatch(setInputGroup({ ...values, [name]: value }));
  };
  return (
    <FormControl>
      <CssTextField
        name={name}
        inputRef={name === "phone" ? inputTeLRef : null}
        type={type}
        label={label}
        value={values[name]}
        onChange={(e) => handleChange(name, e.target.value)}
        error={error.input === name}
        required
      />
      <FormHelperText
        classes={{
          root: style.helper + (name !== "phone" ? " " + style.error : ""),
        }}
        id={name}
      >
        {name === "phone" ? helperText : error.text}
      </FormHelperText>
    </FormControl>
  );
}
