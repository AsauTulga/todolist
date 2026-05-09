import {useUserStore} from "../store/user/hooks.ts";

const HomePage = () => {
	const {user} = useUserStore();
	return (
			<div className="container">
				<h1>
					HOME PAGE
				</h1>

				{user && (
						<h2>
							Здравствуйте {user.name}! Как ваши дела?
						</h2>
				)}
			</div>
	);
};

export default HomePage;