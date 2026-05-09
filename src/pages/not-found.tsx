import {Link, useLocation} from "react-router";

const NotFound = () => {
	const {pathname} = useLocation();

	console.log(pathname)
	return (
			<div className='container'>
				<h1>404</h1>
				{pathname.includes('/posts') ? (
						<p>
							Пост не найден либо был удален
						</p>
				) : (
						<p>Страница не найдена</p>
				)}
				<Link to="/">На главную</Link>
			</div>
	);
};

export default NotFound;