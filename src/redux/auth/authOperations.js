import { auth } from "../../firebase/config";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";

import { authSlice } from "./authSlice";
const { updateUserProfile, authStateChange, authLogOut } = authSlice.actions;

export const registerNewUser =
  ({ login, email, password }) =>
  async (dispatch) => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        email.toLowerCase().trim(),
        password.trim()
      );
      await updateProfile(auth.currentUser, {
        displayName: login.trim(),
      });

      const updatedUser = auth.currentUser;
      dispatch(
        updateUserProfile({
          userId: updatedUser.uid,
          login: updatedUser.displayName,
          email: updatedUser.email,
        })
      );
      console.log("updatedUser", updatedUser);
    } catch (error) {
      console.log("error.message", error.message);
    }
  };

export const loginUser =
  ({ email, password }) =>
  async () => {
    try {
      await signInWithEmailAndPassword(
        auth,
        email.toLowerCase().trim(),
        password.trim()
      );
    } catch (error) {
      console.log("error.message", error.message);
    }
  };

export const authStateChangeUser = () => async (dispatch) => {
  await onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(authStateChange({ stateChange: true }));
      dispatch(
        updateUserProfile({
          userId: user.uid,
          login: user.displayName,
          email: user.email,
        })
      );
    }
  });
};

export const logOutUser = () => async (dispatch) => {
  await signOut(auth);
  dispatch(authLogOut());
};
