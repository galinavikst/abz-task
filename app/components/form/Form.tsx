import React from "react";
import styles from "./form.module.scss";
import InputsGroup from "./InputsGroup";
import RadioGroup from "./RadioGroup";
import Button from "../button/Button";
import FileInput from "./FileInput";

export default function Form() {
  return (
    <form className={styles.form}>
      <InputsGroup />
      <RadioGroup />
      <FileInput />
      <Button disabled={true} text="Sign up" />
    </form>
  );
}
