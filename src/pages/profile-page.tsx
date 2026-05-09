import {useUserStore} from "../store/user/hooks.ts";
import {Box, Button, TextField} from "@mui/material";
import {useRef, useState} from "react";
import {API} from "../utils/api/instance.ts";

const ProfilePage = () => {
	const {user, update_user} = useUserStore();
	const inputRef = useRef<HTMLInputElement>(null);
	const [file, setFile] = useState<File | null>(null);
	const [files, setFiles] = useState<File[]>([]);
	const [isDragging, setIsDragging] = useState(false);
	const [form, setForm] = useState({
		name: user?.name ?? '',
		avatar: user?.avatar ?? '',
	});
	const isModified = form.name !== user?.name || form.avatar !== user?.avatar;
	const isEmpty = !form.name || !form.avatar;

	const fileSize = Number((file?.size ? file.size / 1024 / 1024 : 0).toFixed(3));
	const handleSetFormValue = (key: 'name' | 'avatar', value: string) => {
		setForm(prev => ({
			...prev,
			[key]: value
		}))
	}

	const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
		console.log(e)
		const myFiles: File[] = [];

		const file = e.target.files?.[0];
		for (let i = 0; i < (e?.target?.files?.length ?? 0); i++) {
			if (e.target.files?.[i])
				myFiles.push(e.target.files?.[i]);
		}
		setFiles(prev => [...prev, ...myFiles])
		setFile(file ?? null);
		if (inputRef.current) {
			inputRef.current.value = '';
		}
	};

	const handleSubmit = async () => {
		update_user(form)
		const formData = new FormData();
		formData.append('name', form.name);
		files.forEach(f => formData.append('avatar', f));
		// formData.append('avatar', file);
		console.log('FORM DATA', formData)
		API.patch('/users/1', formData)
	}

	const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		const file = e.dataTransfer.files[0];
		setFile(file ?? null);
	};

	const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsDragging(true);
	};

	const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsDragging(false);
	};

	return (
			<div>
				<div>
					PROFILE
				</div>

				<Box sx={{display: 'flex', flexDirection: 'column', gap: 2, width: '80%', margin: '0 auto'}}>
					<TextField
							placeholder='Имя'
							onChange={e => handleSetFormValue('name', e.target.value)}
							value={form.name}
					/>
					<TextField
							placeholder='Фото'
							value={form.avatar}
							onChange={e => handleSetFormValue('avatar', e.target.value)}
							sx={{
								display: 'none'
							}}
					/>
					<div style={{
						minHeight: '200px',
						border: isDragging ? '1px dashed #ccc' : '1px solid #ccc',
						borderRadius: '8px',
						padding: '10px',
						cursor: 'pointer',
						backgroundColor: isDragging ? '#f0f0f0' : 'transparent',
						outline: isDragging ? '1px dashed #ccc' : 'none',
					}}
							 onClick={() => inputRef.current?.click()}
							 onDrop={onDrop}
							 onDragOver={onDragOver}
							 onDragLeave={onDragLeave}
					>
						{!file && (
								<p>
									{isDragging ? 'Отпустите для загрузки' : 'Нажмите или перетащите файл для загрузки'}
								</p>
						)}
						{file && <img src={URL.createObjectURL(file)} alt="" style={{maxWidth: '100%'}}/>}
						{file && (
								<div>
									<div>
										Название файла: {file.name}
									</div>
									<div>
										Размер файла: {' '}
										{fileSize < 1 ? (
												`${fileSize.toString().replace('0.', '')} кб`
										) : (
												`${fileSize} мб`
										)}
									</div>
								</div>
						)}
					</div>
					{file && (
							<Button color='error' onClick={() => setFile(null)}>Удалить файл</Button>
					)}
					<Button onClick={() => inputRef.current?.click()}>Загрузить файл</Button>


					{!!files.length && (
							<Button color='error' onClick={() => setFiles([])}>Удалить файлы</Button>
					)}
					<div style={{
						display: 'flex',
						flexWrap: 'wrap',
						gap: '10px',
					}}>
						{files.map((file, index) => (
								<img
										key={index}
										src={URL.createObjectURL(file)}
										alt=""
										style={{width: '350px', maxWidth: '100%'}}
										onClick={() => setFiles(prev => prev.filter(f => f !== file))}
								/>
						))}
					</div>
					<input multiple accept='image/*' ref={inputRef} type='file' onChange={handleChangeFile} hidden/>
					<TextField
							placeholder='Email'
							aria-readonly={true}
							value={user?.email}
							slotProps={{
								input: {
									readOnly: true,
								},
							}}
							sx={{
								userSelect: 'all',
							}}
					/>
					<Button
							disabled={!isModified || isEmpty}
							variant="contained"
							onClick={handleSubmit}
					>
						Сохранить
					</Button>
				</Box>
			</div>
	);
};

export default ProfilePage;
