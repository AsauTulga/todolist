import * as React from "react";
import {useState} from "react";
import {Button, Paper, Skeleton, TextField} from "@mui/material";
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';

type CreateTodoProps = {
	onCreateTodo: (title: string) => Promise<void>
}

const CreateTodo = ({onCreateTodo}: CreateTodoProps) => {
	const [isPending, setIsPending] = useState(false);
	const [title, setTitle] = useState('');

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!title.trim()) return;
		setIsPending(true)
		await onCreateTodo(title.trim());
		setTitle('');
		setIsPending(false)
	}

	return (
			<div>
				<Paper component='form' className='add_todo_form' onSubmit={handleSubmit} elevation={0}>
					<TextField
							fullWidth
							disabled={isPending}
							id="todo-title"
							label="Новая задача"
							placeholder="Например: подготовить проект к GitHub Pages"
							variant="outlined"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
					/>
					<Button
							type='submit'
							color="primary"
							loading={isPending}
							loadingPosition="start"
							startIcon={<AddCircleRoundedIcon/>}
							variant="contained"
							size='large'
					>
						Добавить
					</Button>
				</Paper>

				{isPending && (
						<Skeleton className='todo_skeleton' variant="rounded" width={'100%'} height={78}/>
				)}
			</div>
	);
};

export default CreateTodo;
