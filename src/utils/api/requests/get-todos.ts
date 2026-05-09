import {API} from "../instance.ts";
import type {TodoType} from "../../../types/todo.ts";

type ArgsType = {
	page: number;
	limit: number;
}

type ResponseType = {
	total: number;
	todos: TodoType[];
}

export async function getTodos(qParams: ArgsType): Promise<ResponseType> {
	const {page, limit} = qParams;
	const response =
			await API.get(`/todos`, {
				params: {
					_limit: limit,
					_page: page,
				},
			});
	return {
		total: +response.headers['x-total-count'],
		todos: response.data
	};
}