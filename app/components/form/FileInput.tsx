import React from "react";
import styles from "./form.module.scss";

export default function FileInput() {
  return (
    <div className={styles.file_wrapper}>
      <label htmlFor="file">Upload</label>
      <input id="file" type="file" accept="image/*" />
      <span>Upload your photo</span>
    </div>
  );
}
