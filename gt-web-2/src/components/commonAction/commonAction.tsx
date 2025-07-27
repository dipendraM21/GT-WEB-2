"use client";
import { getCurrentUsersData, getUsersData } from "@/store/actions/user.action";
import { useCallback } from "react";
import { useDispatch } from "react-redux";

export function CommonActionInit() {
  const dispatch = useDispatch();
  const commonActions = useCallback(() => {
    dispatch(getUsersData());
    dispatch(getCurrentUsersData());
  }, [dispatch]);

  return <></>;
}
