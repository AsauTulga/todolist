import {API} from "../instance.ts";
import type {PostType} from "../../../types/post.ts";

type ResponseType = {
	// total: number;
	posts: PostType[];
}

export async function getPosts(): Promise<ResponseType> {
	// const {page, limit} = qParams;
	const response =
			await API.get(`/posts`, {
				// params: {
				// 	_limit: limit,
				// 	_page: page,
				// },
			});
	return {
		// total: +response.headers['x-total-count'],
		posts: response.data
	};
}