import {createContext} from "react";
import type {UserContextType} from "../../types/user.ts";
import {DEFAULT_CONTEXT} from "./default-values.ts";

export const UserContext = createContext<UserContextType>(DEFAULT_CONTEXT);