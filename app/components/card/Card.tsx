import style from "./card.module.scss";
import Tooltip from "@mui/material/Tooltip";

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
        <img loading="lazy" src={user.photo} alt="user photo" />
      </div>

      <p>{user.name}</p>
      <div>
        <p>{user.position}</p>
        <Tooltip title={user.email}>
          <p className={style.email}>{user.email}</p>
        </Tooltip>
        <p>{user.phone}</p>
      </div>
    </li>
  );
}
