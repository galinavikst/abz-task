import React from "react";
import style from "./card.module.scss";

type UserData = {
  photo: string;
  position: string;
  name: string;
  email: string;
  phone: string;
};

type UserProps = {
  user: UserData;
};

export default function Card({ user }: UserProps) {
  return (
    <li className={style.card}>
      <div>
        <img src={user.photo} alt="user photo" />
      </div>

      <p>{user.name}</p>
      <div>
        <p>{user.position}</p>
        <p>{user.email}</p>
        <p>{user.phone}</p>
      </div>
    </li>
  );
}
