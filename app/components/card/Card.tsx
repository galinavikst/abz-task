import style from "./card.module.scss";
import Tooltip from "@mui/material/Tooltip";
import defaultUser from "../../../public/default-user.svg";

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
  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const target = e.target as HTMLImageElement;
    target.src = defaultUser.src;
    target.onerror = null;
  };
  return (
    <li className={style.card}>
      <div>
        <img
          loading="lazy"
          src={user.photo || defaultUser.src}
          alt="user photo"
          onError={handleImageError}
        />
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
