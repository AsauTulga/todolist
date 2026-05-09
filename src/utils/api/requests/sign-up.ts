import type {SignUpFormValuesType, UserType} from "../../../types/user.ts";

export async function signUp(data: SignUpFormValuesType): Promise<UserType | Error> {
	const {email} = data;
	if (email.includes('user')) {
		return {
			id: 1,
			name: 'My User Name',
			email: email,
			role: 'user' as const,
			avatar: '',
		}
	}
	if (email.includes('admin')) {
		return {
			id: 1,
			name: 'My Admin Name',
			email: email,
			role: 'admin' as const,
			avatar: '',
		}
	}
	return new Error('this email already exists')
}
