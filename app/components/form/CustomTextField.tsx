"use client";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { FormControl, FormHelperText } from "@mui/material";
import style from "./form.module.scss";
import { useMask } from "@react-input/mask";
import { useAppDispatch, useAppSelector } from "@/app/redux/store";
import {
  setInputGroup,
  setValidStatuses,
} from "@/app/redux/features/formSlice";
import isValid from "./validation.js";
import colors from "../../colors";

const CssTextField = styled(TextField)({
  position: "relative",

  // label
  "& .MuiInputLabel-root": {
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
    // validation
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
