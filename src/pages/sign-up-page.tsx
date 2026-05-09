import {Button, TextField} from "@mui/material";
import {NavLink} from "react-router";
import {useUserStore} from "../store/user/hooks.ts";
import type {FormEvent} from "react";
import type {SignUpFormValuesType} from "../types/user.ts";

const SignUpPage = () => {
	const {sign_up} = useUserStore();

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const data: SignUpFormValuesType = Object.fromEntries(formData.entries()) as SignUpFormValuesType;
		await sign_up(data)
	}
	return (
			<div>
				<h1>Sign Up</h1>


				<form onSubmit={handleSubmit}>
					<TextField name='name' autoComplete={'off'} type="text" placeholder="Name"/>
					<TextField name='email' autoComplete={'off'} type="email" placeholder="Email"/>
					<TextField name='password' autoComplete={'off'} type="password" placeholder="Password"/>
					<Button type="submit" variant="contained" size="large">
						Зарегистрироваться
					</Button>
				</form>

				<p>Есть аккаунт? <NavLink to="/sign-in">Войти</NavLink></p>

			</div>
	);
};

export default SignUpPage;
