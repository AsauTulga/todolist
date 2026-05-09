import {PAGES} from "./pages.ts";
import {Route, Routes} from "react-router";
import {Suspense} from "react";
import type {UserRoleType} from "./types/user.ts";
import {useUserStore} from "./store/user/hooks.ts";


const AppRouter = () => {
	const {user} = useUserStore();

	const userRole: UserRoleType = user?.role ?? 'unauthorized';

	const ROUTES = [...PAGES.common, ...PAGES[userRole]]
	return (
			<Routes>
				{ROUTES.map((page) => (
						<Route
								key={page.path}
								path={page.path}
								element={
									<Suspense fallback={<h1>Loading...</h1>}>
										<page.element/>
									</Suspense>
								}
						/>
				))}
				{/*<Route path="/" element={<Suspense fallback={<h1>Loading...</h1>}><HomePage/></Suspense>}/>*/}
				{/*<Route path="/todos" element={<Suspense fallback={<h1>Loading...</h1>}><TodoPage/></Suspense>}/>*/}
				{/*<Route path="/posts" element={<Suspense fallback={<h1>Loading...</h1>}><PostsPage/></Suspense>}/>*/}
				{/*<Route path="/posts/:postId" element={<Suspense fallback={<h1>Loading...</h1>}><PostDetailsPage/></Suspense>}/>*/}
			</Routes>
	);
};

export default AppRouter;