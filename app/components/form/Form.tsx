"use client";
import { FormEvent, useEffect, useState } from "react";
import styles from "./form.module.scss";
import InputsGroup from "./InputsGroup";
import RadioGroup from "./RadioGroup";
import Button from "../button/Button";
import FileInput from "./FileInput";
import { useAppDispatch, useAppSelector } from "@/app/redux/store";
import {
  useAddUserMutation,
  useGetTokenQuery,
  useGetUserQuery,
} from "@/app/redux/features/apiSlice";
import { setToken } from "@/app/redux/features/formSlice";
import { setUsers } from "@/app/redux/features/usersSlice";

type FormProps = {
  setRegistered: (arg0: boolean) => void;
};

export default function Form({ setRegistered }: FormProps) {
  const dispatch = useAppDispatch();
  const [newUserId, setNewUserId] = useState(null);

  const { inputGroup, photo, position, validStatuses } = useAppSelector(
    (state) => state.form
  );
  const users = useAppSelector((state) => state.users.users);

  const { data } = useGetTokenQuery();
  const [addUser] = useAddUserMutation();
  const { data: newUserData } = useGetUserQuery(newUserId);

  // update users list with new registered user
  useEffect(() => {
    if (newUserData) {
      const updatedUsers = [newUserData.user, ...users].slice(0, 6);
      dispatch(setUsers(updatedUsers));
      setRegistered(true);

      const timeoutId = setTimeout(() => {
        setRegistered(false);
      }, 4000);

      return () => clearTimeout(timeoutId);
    }
  }, [dispatch, newUserData]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { email, name, phone } = inputGroup;

    if (data) {
      dispatch(setToken(data.token));

      try {
        const formData = new FormData();
        formData.append("position_id", String(position.id));
        formData.append("name", name);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("photo", photo);

        const res = await addUser(formData).unwrap();
        console.log(res);
        console.log(res.user_id);

        setNewUserId(res.user_id);
      } catch (error: any) {
        alert(error.data.message);
      }
    }
  };

  const isFormValid = Object.values(validStatuses).every((status) => status);

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <InputsGroup />
      <RadioGroup />
      <FileInput />
      <Button disabled={!isFormValid} text="Sign up" />
    </form>
  );
}
