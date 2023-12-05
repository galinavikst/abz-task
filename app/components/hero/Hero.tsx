import React from "react";
import styles from "./hero.module.scss";
import Button from "../button/Button";

export default function Hero() {
  return (
    <div className={styles.hero}>
      <div>
        <h2>Test assignment for front-end developer</h2>
        <p>
          What defines a good front-end developer is one that has skilled
          knowledge of HTML, CSS, JS with a vast understanding of User design
          thinking as they'll be building web interfaces with accessibility in
          mind. They should also be excited to learn, as the world of Front-End
          Development keeps evolving.
        </p>
        <Button text="Sign up" />
      </div>
    </div>
  );
}
