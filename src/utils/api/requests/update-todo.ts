import {API} from "../instance.ts";
import type {TodoType, UpdateTodoBodyType} from "../../../types/todo.ts";

export async function updateTodo(id: number, body: UpdateTodoBodyType): Promise<TodoType> {
	const response = await API.patch(`/todos/${id}`, body);
	return response.data;
}