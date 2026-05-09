import type {UserContextType} from "../../types/user.ts";

export const DEFAULT_CONTEXT: UserContextType = {
	user: undefined,
	sign_in: async () => {
	},
	sign_up: async () => {
	},
	sign_out: async () => {
	},
	update_user: async () => {
	},
}