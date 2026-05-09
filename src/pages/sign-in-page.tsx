import {Button, TextField} from "@mui/material";
import {useUserStore} from "../store/user/hooks.ts";
import type {SignInFormValuesType} from "../types/user.ts";
import type {FormEvent} from "react";
import {NavLink} from "react-router";

const SignInPage = () => {
	const {sign_in} = useUserStore();

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const data: SignInFormValuesType = Object.fromEntries(formData.entries()) as SignInFormValuesType;
		await sign_in(data)
	}

	return (
			<div>
				<h1>Sign In</h1>


				<form onSubmit={handleSubmit}>
					<TextField name='email' autoComplete={'off'} type="email" placeholder="Email"/>
					<TextField name='password' autoComplete={'off'} type="password" placeholder="Password"/>
					<Button type="submit" variant="contained" size="large">
						Войти
					</Button>
				</form>

				<p>Нет аккаунта? <NavLink to="/sign-up">Зарегистрироваться</NavLink></p>

			</div>
	);
};

export default SignInPage;
