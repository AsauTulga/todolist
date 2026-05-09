import type {PostType} from "../../../types/post.ts";
import {API} from "../instance.ts";

export async function getPostById(id: number | string): Promise<PostType> {
	const response =
			await API.get(`/posts/${id}`, {});
	return response.data
			;
}