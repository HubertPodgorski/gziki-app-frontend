import { useMemo } from "react";
import { useAuthContext } from "./useAuthContext";
import { Roles } from "../helpers/types";

export const useIsAdmin = (): boolean => {
  const { user } = useAuthContext();

  return useMemo(
    () =>
      user &&
      user.roles &&
      user.roles.length > 0 &&
      user.roles.includes(Roles.ADMIN),
    [user]
  );
};
