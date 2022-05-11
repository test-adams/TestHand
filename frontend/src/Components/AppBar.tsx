import { Outlet } from "react-router-dom";
import {Box, AppBar as Bar, Toolbar, Typography, Button, ButtonGroup} from '@mui/material'
import { APPBAR } from '../Constants';

const AppBar = () => {

	const middleButtonSX = {
		mr: 1,
		ml: 10, 
		textTransform: 'none',
		borderRadius: 28
	}

	const rightButtonsSX = {
		mr: 1,
		textTransform: 'none',
		borderRadius: 28
	}

	return (
		<Box>
			<Bar>
				<Toolbar>
					<Box display='flex' width={1} justifyContent='left'>
						<Button>
							<Typography variant='h4' color='white' sx={{textTransform: 'none'}}>
								{APPBAR.TITLE}
							</Typography>
						</Button>
					</Box>

					<Box width={1} display='flex' justifyContent='center'>
						<ButtonGroup size='medium'  color='success' >
							<Button sx={middleButtonSX} variant='contained'>
								<Typography variant="h5">
									{APPBAR.LEND}
								</Typography>
							</Button>
							<Button sx={middleButtonSX} variant='contained'>
								<Typography variant="h5">
									{APPBAR.REQUEST}
								</Typography>
							</Button>
						</ButtonGroup>
						
					</Box>

					<Box width={1} display='flex' justifyContent='right'>
						<Button sx={rightButtonsSX} size='medium' variant='contained' color='info'>
							<Typography variant="subtitle1" color='white'>
								{APPBAR.PROFILE}
							</Typography>
						</Button>
						<Button sx={rightButtonsSX} size='medium' variant='contained' color='info'>
							<Typography variant="subtitle1" color='white'>
								{APPBAR.LOGIN}
							</Typography>
						</Button>
					</Box>

				</Toolbar>
			</Bar>

			<Outlet />
		</Box>

		
	
	);
}


export default AppBar;