import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";

import useRouter from "../../router";
import { authStateChangeUser } from "../../redux/auth/authOperations";

export default function Main() {
  const stateChange = useSelector((state) => state.auth.stateChange);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authStateChangeUser());
  }, []);

  const router = useRouter(stateChange);
  return <NavigationContainer>{router}</NavigationContainer>;
}
