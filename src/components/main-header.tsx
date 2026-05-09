import {NavLink} from "react-router";
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import {useUserStore} from "../store/user/hooks.ts";
import UserAvatar from "./user-avatar.tsx";

const MainHeader = () => {
	const {user} = useUserStore()
	return (
			<header className='main_header'>
				<div className='container main_header_wrapper'>
					<NavLink className='brand' to="/">
						<CheckCircleRoundedIcon fontSize='small'/>
						<span>Todo Flow</span>
					</NavLink>
					<nav className='main_header_nav'>
						<NavLink to="/">Задачи</NavLink>
						<NavLink to="/home">Главная</NavLink>
						{user && (
								<NavLink to="/posts">Посты</NavLink>
						)}
						{!user && (
								<NavLink to="/sign-in">Войти</NavLink>
						)}

						<UserAvatar/>
					</nav>
				</div>
			</header>
	);
};

export default MainHeader;
