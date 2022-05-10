import {Box, Typography, Button} from '@mui/material'


export const NotFound = () => (
	<Box>
	  <Typography variant='h1'>404 - Not Found!</Typography>
	  <Box display='flex' mt={10}>
		<Typography>Looks Like something went wrong. Better </Typography>
		<Box mt={-1} ml={1}>
			<Button sx={{textTransform: 'none'}} variant='contained' href='/'>
				<Typography variant="body1">
					Go Home
				</Typography>
			</Button>
		</Box>
	  </Box>
	</Box>
);