import {useLayoutEffect, useMemo, useState} from "react";
import type {PostType} from "../types/post.ts";
import {getPosts} from "../utils/api/requests/get-posts.ts";
import {Link} from "react-router";
import {Input, Skeleton} from "@mui/material";
import {useDebounce} from "../hooks/use-debounce.ts";


const PostsPage = () => {
	const [search, setSearch] = useState('');
	const debounced_search = useDebounce(search, 750)
	const [posts, setPosts] = useState<PostType[]>([]);
	const [isPendingPosts, setIsPendingPosts] = useState(true);

	const filteredPosts = useMemo(() => (debounced_search ? posts.filter((post) =>
			post.title.toLowerCase().includes(debounced_search.toLowerCase())
			|| post.body.replaceAll('\n', ' ').toLowerCase().includes(debounced_search.toLowerCase())
	) : posts), [debounced_search, posts]);

	useLayoutEffect(() => {
		getPosts().then((data) => {
			setPosts(data.posts)
		}).finally(() => {
			setIsPendingPosts(false)
		})
	}, []);

	return (
			<div className="container">
				<Input
						fullWidth
						placeholder="Поиск постов"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
				/>
				<div className="todo__list">
					{isPendingPosts ? (
							[...Array(10)].map((_, i) => (
									<Skeleton key={i} variant="rounded" width={'100%'} height={75}/>
							))
					) : !filteredPosts.length ? (
							<h2>Постов по запросу {debounced_search} не найдено</h2>
					) : filteredPosts.map((post) => (
							<div key={post.id} className='todo__card'>
								<h2>{post.title}</h2>
								<p>{post.body}</p>
								<div>
									<Link to={`/posts/${post.id}`}>
										Читать пост
									</Link>
								</div>
							</div>
					))}
				</div>
			</div>
	);
};

export default PostsPage;