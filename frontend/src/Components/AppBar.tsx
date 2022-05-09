import {Box, AppBar as Bar, Toolbar, IconButton, Typography} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import { APPBAR } from '../Constants';

const AppBar = () => {
	return(
		<Box>
			<Bar>
				<Toolbar>
					<Box width={0.1}>
						<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						sx={{ mr: 2 }}
						>
							<MenuIcon />
						</IconButton>
					</Box>

					<Box display='flex' width={1} justifyContent='center'>
						<Typography variant='h4'>
							{APPBAR.TITLE}
						</Typography>
					</Box>
				</Toolbar>
			</Bar>
		</Box>
	
	);
}

export default AppBar;