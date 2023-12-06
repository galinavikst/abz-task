"use client";
import { useAppDispatch, useAppSelector } from "@/app/redux/store";
import style from "./form.module.scss";
import React, { useState, ChangeEvent } from "react";
import { styled } from "@mui/material/styles";
import {
  PositionResponse,
  useGetPositionsQuery,
} from "@/app/redux/features/apiSlice";
import { setPositions } from "@/app/redux/features/usersSlice";
import Radio from "@mui/material/Radio";
import { setPosition } from "@/app/redux/features/formSlice";

const colors = {
  "primary-accent-color": "#f4e041",
  "hover-btn-color": "#ffe302",
  "disabled-btn-color": "#b4b4b4",
  secondaryAccentColor: "#00bdd3",
  "app-bg-color": "#f8f8f8",
  "disabled-btn-text-color": "#ffffffde",
  "pure-white": "#fff",
  "primary-text-color": "#000000de",
  secondaryTextColor: "#7e7e7e",
  borderColor: "#d0cfcf",
  errorColor: "#cb3d40",
};

const CssRadio = styled(Radio)({
  border: "1px solid " + colors.borderColor,
  width: 20,
  height: 20,

  color: colors.borderColor,
  padding: 0,

  '& .MuiSvgIcon-root[data-testid="RadioButtonUncheckedIcon"]': {
    display: "none",
  },

  "& .MuiSvgIcon-root": {
    position: "static",
  },

  "&.Mui-checked": {
    color: colors.secondaryAccentColor,
    borderColor: colors.secondaryAccentColor,
  },
});

export default function RadioGroup() {
  const dispatch = useAppDispatch();
  const selectedPosition = useAppSelector((state) => state.form.position);

  const { data } = useGetPositionsQuery();

  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>, id: number) => {
    const newPosition = { id, name: e.target.value };

    dispatch(setPosition(newPosition));
  };
  return (
    <div className={style.radio_wrapper}>
      <p>Select your position</p>
      {data?.positions &&
        data.positions.map((position: PositionResponse) => (
          <label key={position.id}>
            <CssRadio
              checked={position.name === selectedPosition.name}
              onChange={(e) => handleRadioChange(e, position.id)}
              value={position.name}
              name="position"
            />
            {position.name}
          </label>
        ))}
    </div>
  );
}
