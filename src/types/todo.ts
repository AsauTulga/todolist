export type TodoType = {
	userId: number,
	id: number,
	title: string,
	completed: boolean
}

export type UpdateTodoBodyType = {
	title?: string,
	completed?: boolean
}