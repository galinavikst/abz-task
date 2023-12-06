"use client";
import React, { FormEvent } from "react";
import styles from "./form.module.scss";
import InputsGroup from "./InputsGroup";
import RadioGroup from "./RadioGroup";
import Button from "../button/Button";
import FileInput from "./FileInput";
import { useAppDispatch, useAppSelector } from "@/app/redux/store";
import {
  useAddUserMutation,
  useGetTokenQuery,
} from "@/app/redux/features/apiSlice";
import { setToken } from "@/app/redux/features/formSlice";

export default function Form() {
  const dispatch = useAppDispatch();
  const { inputGroup, photo, position, token } = useAppSelector(
    (state) => state.form
  );

  const { data } = useGetTokenQuery();
  const [addUser] = useAddUserMutation();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const { email, name, phone } = inputGroup;

    if (data) {
      console.log(data.token);

      dispatch(setToken(data.token));

      const formData = new FormData();
      formData.append("position_id", String(position.id));
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("photo", photo);

      const res = await addUser(formData);
      console.log(res);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <InputsGroup />
      <RadioGroup />
      <FileInput />
      <Button disabled={false} text="Sign up" />
    </form>
  );
}
