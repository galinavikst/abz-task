import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./header.module.scss";
import Button from "../button/Button";

export default function Header() {
  return (
    <header className={styles.header_wrapper}>
      <div className={styles.header}>
        <Link href="/">
          <Image src="./logo.svg" width={38} height={26} alt="logo" />
          <h1>Testtask</h1>
        </Link>
        <div>
          <Button text="Users" />
          <Button text="Sign up" />
        </div>
      </div>
    </header>
  );
}
