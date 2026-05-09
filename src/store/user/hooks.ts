import {useContext} from "react";
import {UserContext} from "./user-context.ts";


export function useUserStore() {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error('NOT FOUND USER CONTEXT')
	}
	return useContext(UserContext);
}