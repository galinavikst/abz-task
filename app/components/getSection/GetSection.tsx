"use client";
import { useEffect, useState } from "react";
import style from "./getSection.module.scss";
import Button from "../button/Button";
import {
  UserResponse,
  fetchData,
  useGetUsersQuery,
} from "@/app/redux/features/apiSlice";
import { useAppDispatch, useAppSelector } from "@/app/redux/store";
import { setNextPage, setUsers } from "@/app/redux/features/usersSlice";
import Card from "../card/Card";
import CircularProgress from "@mui/material/CircularProgress";

export default function GetSection() {
  const [isDisabled, setIsDisabled] = useState(false);
  const dispatch = useAppDispatch();
  const { users, nextPage } = useAppSelector((state) => state.users);

  const { data, isLoading } = useGetUsersQuery();

  // init show users
  useEffect(() => {
    if (data) {
      dispatch(setUsers(data.users));
      dispatch(setNextPage(data.links.next_url));
    }
  }, [data, dispatch]);

  // handle display none 'show more' btn
  useEffect(() => {
    if (data) {
      if (data.total_users === users.length) {
        setIsDisabled(true);
      }
    }
  }, [users.length, data?.total_users]);

  // show next users page
  const handleClick = async () => {
    if (nextPage) {
      const nextData = await fetchData(nextPage);
      dispatch(setUsers([...users, ...nextData.users]));
      dispatch(setNextPage(nextData.links.next_url));
    }
  };

  return (
    <section className={style.getSection}>
      <h2>Working with GET request</h2>

      <ul>
        {isLoading ? (
          <CircularProgress size={50} />
        ) : (
          users.map((user: UserResponse) => (
            <Card key={user.email} user={user} />
          ))
        )}
      </ul>

      <Button onClick={handleClick} disabled={isDisabled} text="Show more" />
    </section>
  );
}
