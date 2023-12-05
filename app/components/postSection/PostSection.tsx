import React from "react";
import styles from "./postSection.module.scss";
import Form from "../form/Form";

export default function PostSection() {
  return (
    <section className={styles.postSection}>
      <h2>Working with POST request</h2>
      <Form />
    </section>
  );
}
