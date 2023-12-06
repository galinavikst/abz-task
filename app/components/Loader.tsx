import React from "react";
import { Oval } from "react-loader-spinner";

export default function Loader() {
  return (
    <Oval
      ariaLabel="loading-indicator"
      height={100}
      width={100}
      strokeWidth={5}
      strokeWidthSecondary={5}
      color="#00bdd3"
      secondaryColor="transparent"
    />
  );
}
