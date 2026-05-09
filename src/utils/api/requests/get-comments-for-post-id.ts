import {API} from "../instance.ts";
import type {CommentType} from "../../../types/comment.ts";

export async function getCommentsForPostId(id: number | string): Promise<CommentType[]> {
	const response =
			await API.get(`/comments`, {
				params: {
					postId: id
				}
			});
	return response.data;
}