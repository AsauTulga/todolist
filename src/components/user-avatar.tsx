import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import {useUserStore} from "../store/user/hooks.ts";
import {useNavigate} from "react-router";

const UserAvatar = () => {
	const {user, sign_out} = useUserStore()
	const navigate = useNavigate();
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	if (!user) return null;

	return (<>
				<Tooltip title={user.name}>
					<IconButton
							onClick={handleClick}
							size="small"
							sx={{ml: 2}}
							aria-controls={open ? 'account-menu' : undefined}
							aria-haspopup="true"
							aria-expanded={open ? 'true' : undefined}
					>
						<Avatar sx={{width: 32, height: 32}} src={user.avatar}>
							{user.name.split(' ').splice(0, 2).map(name => (
									name[0]
							))}
						</Avatar>
					</IconButton>
				</Tooltip>
				<Menu
						anchorEl={anchorEl}
						id="account-menu"
						open={open}
						onClose={handleClose}
						onClick={handleClose}
						slotProps={{
							paper: {
								elevation: 0,
								sx: {
									overflow: 'visible',
									filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
									mt: 1.5,
									'& .MuiAvatar-root': {
										width: 32,
										height: 32,
										ml: -0.5,
										mr: 1,
									},
									'&::before': {
										content: '""',
										display: 'block',
										position: 'absolute',
										top: 0,
										right: 14,
										width: 10,
										height: 10,
										bgcolor: 'background.paper',
										transform: 'translateY(-50%) rotate(45deg)',
										zIndex: 0,
									},
								},
							},
						}}
						transformOrigin={{horizontal: 'right', vertical: 'top'}}
						anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
				>
					<MenuItem onClick={() => {
						handleClose();
						navigate('/profile')
					}}>
						<Avatar src={user.avatar}/> {user.name}
					</MenuItem>
					<Divider/>
					{user.role === 'admin' && (
							<MenuItem onClick={() => {
								handleClose()
								navigate('/admin/dashboard')
							}}>
								<ListItemIcon>
									<Settings fontSize="small"/>
								</ListItemIcon>
								Админ
							</MenuItem>
					)}
					<MenuItem onClick={() => {
						handleClose();
						sign_out();
					}}>
						<ListItemIcon>
							<Logout fontSize="small"/>
						</ListItemIcon>
						Выход
					</MenuItem>
				</Menu>
			</>
	);
};

export default UserAvatar;