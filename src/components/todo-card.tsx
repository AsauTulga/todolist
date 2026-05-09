import type {TodoType} from "../types/todo.ts";
import * as React from "react";
import {useState} from "react";
import {
	Checkbox,
	Chip,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	Paper,
	Slide,
	TextField,
	Tooltip
} from "@mui/material";
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import type {TransitionProps} from "@mui/material/transitions";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded';

type TodoCardProps = {
	todo: TodoType
	toggleTodo: (id: number, completed: boolean) => Promise<void>
	updateTodoTitle: (id: number, title: string) => Promise<void>
	handleDeleteTodo: (id: number) => Promise<void>
}

const Transition = React.forwardRef(function Transition(
		props: TransitionProps & {
			children: React.ReactElement<unknown>;
		},
		ref: React.Ref<unknown>,
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const TodoCard = ({todo, toggleTodo, updateTodoTitle, handleDeleteTodo}: TodoCardProps) => {
	const [title, setTitle] = useState(todo.title);
	const [isTitleEdit, setIsTitleEdit] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);
	const [isUpdating, setIsUpdating] = useState(false);

	const handleUpdateTodoStatus = async () => {
		setIsUpdating(true);
		await toggleTodo(todo.id, !todo.completed)
		setIsUpdating(false);
	}

	const handleUpdateTodoTitle = async () => {
		const nextTitle = title.trim();
		if (!nextTitle || nextTitle === todo.title) return;
		setIsUpdating(true);
		await updateTodoTitle(todo.id, nextTitle)
		setIsUpdating(false);
	}

	const handleToggleEditTitle = async () => {
		if (isTitleEdit) await handleUpdateTodoTitle();
		setIsTitleEdit(prev => !prev)
	}

	const deleteTodo = async () => {
		setIsDeleting(true);
		await handleDeleteTodo(todo.id)
		setIsDeleting(false);
	}

	return (
			<Paper className={`todo__card ${todo.completed ? 'todo__card_completed' : ''}`} elevation={0}>
				<div className='todo__main'>
					<Checkbox
							id={`todo-${todo.id}`}
							disabled={isUpdating || isDeleting}
							checked={todo.completed}
							onChange={handleUpdateTodoStatus}
							icon={<TaskAltRoundedIcon color='disabled'/>}
							checkedIcon={<TaskAltRoundedIcon color='success'/>}
					/>
					<label
							htmlFor={`todo-${todo.id}`}
							className='todo__content'
							style={{opacity: isUpdating ? 0.45 : 1}}
					>
						<span className='todo__title'>
							{todo.title}{isUpdating ? '...' : ''}
						</span>
						<Chip
								size='small'
								color={todo.completed ? 'success' : 'primary'}
								variant={todo.completed ? 'filled' : 'outlined'}
								label={todo.completed ? 'Готово' : 'В работе'}
						/>
					</label>
				</div>

				<div className='todo__actions'>
					<Tooltip title='Редактировать'>
						<span>
							<IconButton size='small' onClick={handleToggleEditTitle} disabled={isDeleting}>
								<EditRoundedIcon fontSize='small'/>
							</IconButton>
						</span>
					</Tooltip>
					<Tooltip title='Удалить'>
						<span>
							<IconButton size='small' color='error' onClick={deleteTodo} disabled={isDeleting}>
								<DeleteRoundedIcon fontSize='small'/>
							</IconButton>
						</span>
					</Tooltip>
				</div>

				<Dialog
						open={isTitleEdit}
						slots={{transition: Transition}}
						keepMounted
						onClose={handleToggleEditTitle}
						fullWidth
						maxWidth='sm'
				>
					<DialogTitle>Редактирование задачи</DialogTitle>
					<DialogContent>
						<TextField
								fullWidth
								autoFocus
								margin='dense'
								label="Название"
								variant="outlined"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
						/>
					</DialogContent>
					<DialogActions>
						<IconButton
								color='primary'
								onClick={handleToggleEditTitle}
								aria-label='Сохранить'
						>
							<SaveRoundedIcon/>
						</IconButton>
					</DialogActions>
				</Dialog>
			</Paper>
	);
};

export default TodoCard;
