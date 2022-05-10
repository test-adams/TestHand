import {Box, AppBar as Bar, Toolbar, Typography, Button, ButtonGroup} from '@mui/material'
import { APPBAR } from '../Constants';

const AppBar = () => {

	const buttonSX = {
		mr: 1, 
		textTransform: 'none',
		borderRadius: 28
	}

	return (
		<Box>
			<Bar>
				<Toolbar>
					<Box display='flex' width={1} justifyContent='left'>
						<Typography variant='h4'>
							{APPBAR.TITLE}
						</Typography>
					</Box>

					<Box width={1} display='flex' justifyContent='center'>
						<ButtonGroup size='medium'  color='success' >
							<Button sx={buttonSX} variant='contained'>
								<Typography variant="h5">
									{APPBAR.LEND}
								</Typography>
							</Button>
							<Button sx={buttonSX} variant='contained'>
								<Typography variant="h5">
									{APPBAR.REQUEST}
								</Typography>
							</Button>
						</ButtonGroup>
						
					</Box>

					<Box width={1} display='flex' justifyContent='right'>
						<Button sx={buttonSX} size='medium' variant='contained' color='info'>
							<Typography variant="subtitle1" color='white'>
								{APPBAR.PROFILE}
							</Typography>
						</Button>
						<Button sx={buttonSX} size='medium' variant='contained' color='info'>
							<Typography variant="subtitle1" color='white'>
								{APPBAR.LOGIN}
							</Typography>
						</Button>
					</Box>

				</Toolbar>
			</Bar>
		</Box>
	
	);
}


export default AppBar;