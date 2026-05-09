import {API} from "../instance.ts";
import type {TodoType} from "../../../types/todo.ts";

export async function createTodo(title: string): Promise<TodoType> {
	const response = await API.post(`/todos`, {
		title,
	});
	return response.data;
}