import {useCallback, useEffect, useMemo, useState} from "react";
import type {TodoType} from "../types/todo.ts";
import {updateTodo} from "../utils/api/requests/update-todo.ts";
import {getTodos} from "../utils/api/requests/get-todos.ts";
import CreateTodo from "../components/create-todo.tsx";
import TodoCard from "../components/todo-card.tsx";
import {createTodo} from "../utils/api/requests/create-todo.ts";
import {deleteTodo} from "../utils/api/requests/delete-todo.ts";
import {Alert, FormControl, InputLabel, MenuItem, Pagination, Select, Skeleton, Stack} from "@mui/material";

const FALLBACK_TODOS: TodoType[] = [
	{id: 1, userId: 1, title: 'Стилизовать TODO list через MUI', completed: true},
	{id: 2, userId: 1, title: 'Проверить сборку проекта', completed: false},
	{id: 3, userId: 1, title: 'Опубликовать приложение на GitHub Pages', completed: false},
];

const TodoPage = () => {
	const [isPendingTodos, setIsPendingTodos] = useState(true);
	const [error, setError] = useState('');
	const [todos, setTodos] = useState<TodoType[]>([]);
	const [qParams, setQParams] = useState({
		page: 1,
		limit: 10,
		total: 0,
	});

	const completedCount = useMemo(
			() => todos.filter(todo => todo.completed).length,
			[todos],
	);

	const handlePageChange = (page: number) => {
		setQParams(prev => ({...prev, page}))
	}

	const handleLimitChange = (limit: number) => {
		setQParams(prev => ({...prev, limit, page: 1}))
	}

	const toggleTodo = async (id: number, completed: boolean) => {
		try {
			const updatedTodo = await updateTodo(id, {completed})
			setTodos(prev => prev.map(todo => todo.id === id ? {...todo, completed: updatedTodo.completed} : todo))
		} catch {
			setTodos(prev => prev.map(todo => todo.id === id ? {...todo, completed} : todo))
		}
	}

	const updateTodoTitle = async (id: number, title: string) => {
		try {
			const updatedTodo = await updateTodo(id, {title})
			setTodos(prev => prev.map(todo => todo.id === id ? {...todo, ...updatedTodo} : todo))
		} catch {
			setTodos(prev => prev.map(todo => todo.id === id ? {...todo, title} : todo))
		}
	}

	const handleCreateTodo = async (title: string) => {
		let newTodo: TodoType | undefined;
		try {
			newTodo = await createTodo(title)
		} catch {
			newTodo = undefined;
		}
		setTodos(prev => [
			{
				...(newTodo ?? {}),
				title,
				completed: false,
				id: Date.now(),
				userId: 1,
			}, ...prev])
	}

	const handleDeleteTodo = async (id: number) => {
		let isDeleted = false;
		try {
			isDeleted = await deleteTodo(id)
		} catch {
			isDeleted = true;
		}
		if (isDeleted) {
			setTodos(prev => prev.filter(todo => todo.id !== id))
		}
	}

	const handleGetTodos = useCallback(async () => {
		setIsPendingTodos(true);
		setError('');
		getTodos({page: qParams.page, limit: qParams.limit}).then((data) => {
			setTodos(data.todos)
			setQParams(prev => ({...prev, total: data.total}))
		}).catch(() => {
			setTodos(FALLBACK_TODOS);
			setQParams(prev => ({...prev, total: FALLBACK_TODOS.length}));
			setError('API недоступен, поэтому показаны демонстрационные задачи.');
		}).finally(() => {
			setIsPendingTodos(false)
		})
	}, [qParams.limit, qParams.page]);

	useEffect(() => {
		handleGetTodos()
	}, [handleGetTodos]);

	return (
			<main className='todo_page'>
				<section className='todo_hero'>
					<div className='container todo_hero_inner'>
						<div>
							<p className='eyebrow'>Учебный проект React + MUI</p>
							<h1>Todo List</h1>
							<p className='todo_hero_text'>
								Чистый список задач с созданием, редактированием, удалением, статусами и пагинацией.
							</p>
						</div>
						<div className='todo_stats' aria-label='Статистика задач'>
							<div>
								<strong>{todos.length}</strong>
								<span>на странице</span>
							</div>
							<div>
								<strong>{completedCount}</strong>
								<span>готово</span>
							</div>
							<div>
								<strong>{Math.max(todos.length - completedCount, 0)}</strong>
								<span>в работе</span>
							</div>
						</div>
					</div>
				</section>

				<section className='container todo_workspace'>
					<CreateTodo onCreateTodo={handleCreateTodo}/>

					{error && <Alert severity='error'>{error}</Alert>}

					<div className='todo__list'>
						{isPendingTodos ? (
								[...Array(qParams.limit)].map((_, i) => (
										<Skeleton key={i} variant="rounded" width={'100%'} height={78}/>
								))
						) : (
								todos.map((todo) => (
										<TodoCard
												key={todo.id}
												todo={todo}
												toggleTodo={toggleTodo}
												updateTodoTitle={updateTodoTitle}
												handleDeleteTodo={handleDeleteTodo}
										/>
								))
						)}
					</div>

					<Stack className='todo_controls' direction={{xs: 'column', sm: 'row'}} spacing={2}>
						<Pagination
								page={qParams.page}
								onChange={(_, page) => handlePageChange(page)}
								count={Math.ceil(qParams.total / qParams.limit)}
								color='primary'
						/>
						<FormControl size='small' className='todo_limit'>
							<InputLabel id='todo-limit-label'>На странице</InputLabel>
							<Select
									labelId='todo-limit-label'
									value={qParams.limit}
									label="На странице"
									onChange={(e) => handleLimitChange(Number(e.target.value))}
							>
								{[5, 10, 25, 50].map((limit) => (
										<MenuItem key={limit} value={limit}>{limit}</MenuItem>
								))}
							</Select>
						</FormControl>
					</Stack>
				</section>
			</main>
	);
};

export default TodoPage;
