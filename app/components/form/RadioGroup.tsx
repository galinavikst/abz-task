"use client";
import { useAppDispatch, useAppSelector } from "@/app/redux/store";
import style from "./form.module.scss";
import React, { useState, ChangeEvent } from "react";
import {
  PositionResponse,
  useGetPositionsQuery,
} from "@/app/redux/features/apiSlice";
import { setPositions } from "@/app/redux/features/usersSlice";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import FormControl from "@mui/material/FormControl/FormControl";
import FormLabel from "@mui/material/FormLabel/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";

export default function RadioGroup() {
  const [selectedPosition, setSelectedPosition] = useState("");
  const dispatch = useAppDispatch();
  const positions = useAppSelector((state) => state.users.positions);

  const { data } = useGetPositionsQuery();

  if (data) {
    dispatch(setPositions(data.positions));
  }

  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedPosition((e.target as HTMLInputElement).value);
  };
  return (
    <div className={style.radio_wrapper}>
      <p>Select your position</p>
      <FormControl>
        <FormLabel id="positions">Select your position</FormLabel>

        <RadioGroup
          value={selectedPosition}
          onChange={handleRadioChange}
          aria-label="positions"
          name="position"
        >
          {positions &&
            positions.map((position: PositionResponse) => (
              <FormControlLabel
                key={position.id}
                value={position.name}
                control={<Radio />}
                label={position.name}
              />

              // <label>
              //   <input
              //     type="radio"
              //     name="position"
              //     value={position.name}
              //     checked={position.name === selectedPosition}
              //     onChange={handleRadioChange}
              //   />
              //   <span className={style.checkmark}></span>
              //   {position.name}
              // </label>
            ))}
        </RadioGroup>
      </FormControl>
    </div>
  );
}
