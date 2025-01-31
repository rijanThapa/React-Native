import { cartService } from "@/api/service/cart";
import { userService } from "@/api/service/user";
import { useQuery } from "react-query";

export const CURRENT_USER_KEY = "CURRENT_USER_KEY";

export const useGetCurrentUserInfo = () =>
  useQuery([CURRENT_USER_KEY], () => userService.getCurrentUserInfo());
