"use client";
import { useState, ChangeEvent } from "react";
import styles from "./fileInput.module.scss";
import isValid from "./validation.js";
import { useAppDispatch } from "@/app/redux/store";
import { setPhoto, setValidStatuses } from "@/app/redux/features/formSlice";

export default function FileInput() {
  const dispatch = useAppDispatch();
  const [file, setFile] = useState<File | any>(null);
  const [error, setError] = useState({ isError: false, text: "" });

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target;

    if (!selectedFile || !selectedFile.files) {
      setFile(null);
      return;
    }
    // file validation
    const errorMessage = await isValid.file(selectedFile.files[0]);

    if (errorMessage) {
      setError({ isError: true, text: errorMessage });
      dispatch(setValidStatuses({ input: "photo", isValid: false }));
      setFile(null);
      return;
    } else {
      setError({ isError: false, text: "" });
      dispatch(setValidStatuses({ input: "photo", isValid: true }));
      setFile(selectedFile.files[0]);
      dispatch(setPhoto(selectedFile.files[0]));
    }
  };

  return (
    <div
      className={`${styles.file_wrapper} ${error.isError ? styles.error : ""}`}
    >
      <label htmlFor="file">Upload</label>
      <input id="file" type="file" onChange={handleChange} accept="image/*" />
      <span>{file ? file.name : "Upload your photo"}</span>
      {error.isError && <span className={styles.helper}>{error.text}</span>}
    </div>
  );
}
