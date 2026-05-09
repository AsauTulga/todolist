import {UserContext} from "./user-context.ts";
import {type ReactNode, useLayoutEffect, useState} from "react";
import type {SignInFormValuesType, SignUpFormValuesType, UpdateUserProfileValuesType, UserContextType, UserType} from "../../types/user.ts";
import {signIn} from "../../utils/api/requests/sign-in.ts";
import {useNavigate} from "react-router";
import {signUp} from "../../utils/api/requests/sign-up.ts";
import {getMe} from "../../utils/api/requests/me.ts";

const UserProvider = ({children}: { children: ReactNode }) => {
	const navigate = useNavigate();
	const [user, setUser] = useState<UserType | undefined>(undefined);

	const sign_in = async (data: SignInFormValuesType) => {
		console.log('sign_in', data)
		const response = await signIn(data);
		console.log('response', response)
		if (response instanceof Error) {
			alert('Неверный логин или пароль')
		} else {
			setUser(response)
			navigate('todos');
			localStorage.setItem('user', JSON.stringify(response))
		}
	}
	const sign_up = async (data: SignUpFormValuesType) => {
		const response = await signUp(data);
		if (response instanceof Error) {
			alert('Email уже занят!')
		} else {
			setUser(response)
			navigate('todos');
			localStorage.setItem('user', JSON.stringify(response))
		}
	}
	const sign_out = async () => {
		setUser(undefined);
		navigate('/sign-in');
		localStorage.removeItem('user')
	}
	const update_user = async (data: UpdateUserProfileValuesType) => {
		setUser(prev => {
			if (prev) {
				const updatedUser = {
					...prev,
					...data,
				}
				localStorage.setItem('user', JSON.stringify(updatedUser))
				return updatedUser
			}
		});
	}

	useLayoutEffect(() => {
		getMe().then(setUser);
	}, []);

	const VALUES: UserContextType = {
		user,
		sign_in,
		sign_up,
		sign_out,
		update_user,
	}
	return (
			<UserContext.Provider value={VALUES}>
				{children}
			</UserContext.Provider>
	);
};

export default UserProvider;