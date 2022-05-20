import { Typography, Box, Paper, Button, Table, TableBody, TableRow, TableCell, Grid } from "@mui/material";
import { LEND } from "../Constants";
import { LendMock } from "../MockData";


interface cardProps {
	item: string,
	lend_time: string,
	lender: string,
	imguri?: string
}



const ItemCard = (props: cardProps) => {
	return(
		<Box sx={{ p:1, border: '1px solid', borderRadius: '10px'	}} display='flex'>
			<Box>
				<img alt='lend-card-img' width={200} height={200} src={props.imguri}/>
			</Box>
			<Box sx={{flexGrow: 1}} ml={2} mr={2} width={1}>
				<Table>
					<TableBody>
						<TableRow>
							<TableCell width={1} align='left'><Typography variant='h5'>Item: </Typography></TableCell>
							<TableCell align='left'><Typography variant='h5'>{props.item}</Typography></TableCell>
						</TableRow>
						<TableRow>
							<TableCell width={1} align='left'><Typography variant='h5'>Time: </Typography></TableCell>
							<TableCell align='left'><Typography variant='h5'>{props.lend_time}</Typography></TableCell>
						</TableRow>
						<TableRow>
							<TableCell width={1} align='left'><Typography variant='h5'>Lender: </Typography></TableCell>
							<TableCell align='left'><Typography variant='h5'>{props.lender}</Typography></TableCell>
						</TableRow>
					</TableBody>
				</Table>
				
				<br/><br/>
				<Button size='large' variant='contained'>Request!</Button>
			</Box>
		</Box>
	);
}

const LendPage = () => {
	const mockProps1: cardProps = {
		item: LendMock.Card1.name,
		lend_time: LendMock.Card1.end_time,
		lender: LendMock.Card1.lender,
		imguri: LendMock.Card1.imguri
	}

	const mockProps2: cardProps = {
		item: LendMock.Card2.name,
		lend_time: LendMock.Card2.end_time,
		lender: LendMock.Card2.lender,
		imguri: LendMock.Card2.imguri
	}

	return(
		<>
			<Box mt={15} display='flex' justifyContent='center'>
				<Typography variant='h3'>
					{LEND.welcome}
				</Typography>
			</Box>

			<Box display='flex' justifyContent='center'>
				<Typography variant='h5'>
					{LEND.subtitle}
				</Typography>
			</Box>

			<Box mt={5} display='flex' justifyContent='center'>
				<Paper elevation={10}>
					<Box sx={{p:2}} display='flex' justifyContent='center'>
						<Typography sx={{textDecoration: 'underline'}} variant='h4' color='primary'>
							Items ready to be lent!
						</Typography>
						<Button size='medium' sx={{ml: 2}} variant='contained' color='success'><Typography variant='h6' sx={{textTransform: 'none'}}>Lend an Item</Typography></Button>
					</Box>
					<Box sx={{p:2}}>
						<ItemCard {...mockProps1}/>
						<br/>
						<ItemCard {...mockProps2}/>
					</Box>
				</Paper>
			</Box>
		</>
	);
}



export default LendPage;