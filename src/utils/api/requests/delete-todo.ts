import {API} from "../instance.ts";

export async function deleteTodo(id: number): Promise<boolean> {
	const response = await API.delete(`/todos/${id}`);
	return response.status === 200;
}