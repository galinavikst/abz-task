"use client";
import { useState } from "react";
import styles from "./postSection.module.scss";
import Form from "../form/Form";

export default function PostSection() {
  const [registered, setRegistered] = useState(false);

  return (
    <section className={styles.postSection}>
      <h2>Working with POST request</h2>
      <Form setRegistered={setRegistered} />
      {registered && <img src="./registered.svg" alt="user registered" />}
    </section>
  );
}
