import type {SignInFormValuesType, UserType} from "../../../types/user.ts";

export async function signIn(data: SignInFormValuesType): Promise<UserType | Error> {
	const {email} = data;
	if (email.includes('user')) {
		return {
			id: 1,
			name: 'Bakdaulet User',
			email: email,
			role: 'user' as const,
			avatar: 'https://instagram.fpwq4-1.fna.fbcdn.net/v/t51.29350-15/439120649_893008789502637_4198773385409444756_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=107&ig_cache_key=MzM1MDI0OTgxODk4MDY2MzMyMQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTQ0MC5zZHIuZGVmYXVsdF9pbWFnZS5DMyJ9&_nc_ohc=kaGe0d_la3kQ7kNvwEdUzWy&_nc_oc=Adkk6M9UC4MPHLG7FcskgpvaHLj0y3s5tKGoGQklzeR4RcJWg64-jsL62D5XthaA9b0&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fpwq4-1.fna&_nc_gid=gUpdI7QYiP4_UCeIBEypow&_nc_ss=8&oh=00_AfyFX-QWLvvFBXd1ZRmXaDfloLgPMH1Lhv7YAHm019ac2A&oe=69BE003F'
		}
	}
	if (email.includes('admin')) {
		return {
			id: 1,
			name: 'Denis Admin',
			email: email,
			role: 'admin' as const,
			avatar: 'https://instagram.fpwq4-1.fna.fbcdn.net/v/t51.29350-15/439120649_893008789502637_4198773385409444756_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=107&ig_cache_key=MzM1MDI0OTgxODk4MDY2MzMyMQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTQ0MC5zZHIuZGVmYXVsdF9pbWFnZS5DMyJ9&_nc_ohc=kaGe0d_la3kQ7kNvwEdUzWy&_nc_oc=Adkk6M9UC4MPHLG7FcskgpvaHLj0y3s5tKGoGQklzeR4RcJWg64-jsL62D5XthaA9b0&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fpwq4-1.fna&_nc_gid=gUpdI7QYiP4_UCeIBEypow&_nc_ss=8&oh=00_AfyFX-QWLvvFBXd1ZRmXaDfloLgPMH1Lhv7YAHm019ac2A&oe=69BE003F'
		}
	}
	return new Error('User not found')
}
