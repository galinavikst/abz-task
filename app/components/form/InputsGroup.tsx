"use client";
import React, { useState } from "react";
import style from "./form.module.scss";

import { useAppDispatch, useAppSelector } from "@/app/redux/store";
import CustomTextField from "./CustomTextField";

export default function InputsGroup() {
  const dispatch = useAppDispatch();
  //const { tel } = useAppSelector((state) => state.form.contacts);
  const [tel, setTel] = useState("");

  const handleChange = (value: string) => {
    setTel(value);
  };

  return (
    <>
      {/* <div className={style.inputs_wrapper}> */}
      <CustomTextField
        type="text"
        name="name"
        label="Your name"
        helperText="ko"
      />
      <CustomTextField type="email" name="email" label="Email" helperText="" />
      <CustomTextField
        type="text"
        name="tel"
        label="Phone"
        helperText="+38 (XXX) XXX - XX - XX"
      />
      {/* </div> */}
    </>
  );
}
