import {Link, useParams} from "react-router";
import {useLayoutEffect, useState} from "react";
import type {PostType} from "../types/post.ts";
import {getPostById} from "../utils/api/requests/get-post-by-id.ts";
import type {CommentType} from "../types/comment.ts";
import {getCommentsForPostId} from "../utils/api/requests/get-comments-for-post-id.ts";

const PostDetailsPage = () => {
	const {postId} = useParams()
	const [post, setPost] = useState<PostType | null>(null)
	const [comments, setComments] = useState<CommentType[]>([])
	const [isPendingPost, setIsPendingPost] = useState(true)

	useLayoutEffect(() => {
		if (!postId) return
		setIsPendingPost(true)
		getPostById(postId).then((data) => {
			setPost(data)
		}).finally(() => {
			setIsPendingPost(false)
		})
		getCommentsForPostId(postId).then((data) => {
			setComments(data)
		}).finally(() => {
			setIsPendingPost(false)
		})
	}, [postId]);

	return (
			<div className='container'>
				{isPendingPost ? (
						<h1>Загрузка поста...</h1>
				) : (
						<div>
							POST #{postId}
							<h1>{post?.title}</h1>
							<p>{post?.body}</p>
							

							<div className='todo__list'>
								{comments.map((comment) => (
										<div key={comment.id} className='todo__card'>
											<h4>
												{comment.name}
											</h4>
											<p>
												{comment.email}
											</p>
											<p>{comment.body}</p>
										</div>
								))}
							</div>
						</div>
				)}

				<div>
					<h4>Топ постов за неделю:</h4>
					{[1, 2, 3, 4, 5].map((id) => (
							<p key={id}>
								<Link to={`/posts/${id}`}>
									POST #{id}
								</Link>
							</p>
					))}
				</div>
			</div>
	);
};

export default PostDetailsPage;