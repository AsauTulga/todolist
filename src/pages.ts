import {lazy} from "react";
// import TodoPage from "./pages/todo-page.tsx";
// import HomePage from "./pages/home-page.tsx";
// import MainHeader from "./components/main-header.tsx";
// import PostsPage from "./pages/posts-page.tsx";
// import NotFound from "./pages/not-found.tsx";
// import PostDetailsPage from "./pages/post-details-page.tsx";


const NotFound = lazy(async () => import("./pages/not-found.tsx"));
const HomePage = lazy(async () => import("./pages/home-page.tsx"));
const TodoPage = lazy(async () => import("./pages/todo-page.tsx"));
const PostsPage = lazy(async () => import("./pages/posts-page.tsx"));
const PostDetailsPage = lazy(async () => import("./pages/post-details-page.tsx"));

const ProfilePage = lazy(async () => import("./pages/profile-page.tsx"));

const SignInPage = lazy(async () => import("./pages/sign-in-page.tsx"));
const SignUpPage = lazy(async () => import("./pages/sign-up-page.tsx"));

const DashboardPage = lazy(async () => import("./pages/admin/dashboard.tsx"));

const COMMON_PAGES = [
	{
		path: '*',
		element: NotFound,
	},
	{
		path: '/',
		element: TodoPage,
	},
	{
		path: '/home',
		element: HomePage,
	},
	{
		path: '/todos',
		element: TodoPage,
	},
] as const;

const UNAUTHORIZED_PAGES = [
	{
		path: '/sign-in',
		element: SignInPage,
	},
	{
		path: '/sign-up',
		element: SignUpPage,
	},
] as const;

const USER_PAGES = [
	{
		path: '/posts',
		element: PostsPage,
	},
	{
		path: '/posts/:postId',
		element: PostDetailsPage,
	},
	{
		path: '/profile',
		element: ProfilePage
	}
] as const;

const ADMIN_PAGES = [
	...USER_PAGES,
	{
		path: '/admin/dashboard',
		element: DashboardPage,
	},
] as const;


export const PAGES = {
	common: [...COMMON_PAGES],
	unauthorized: [...UNAUTHORIZED_PAGES],
	user: [...USER_PAGES],
	admin: [...ADMIN_PAGES],
} as const;

// const PAGES_R = {
// 	"common": [],
// 	"admin": [],
// 	"user": [],
// }
// const userRole = 'user'

// const routes = [...PAGES_R.common, ...PAGES_R[userRole]]
