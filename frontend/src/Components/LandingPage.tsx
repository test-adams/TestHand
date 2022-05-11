import { Box } from "@mui/material";
import { LANDING } from "../Constants";
import { Typography } from "@mui/material";

const LandingPage = () => {
	return (
		<>
			<Box  mt={15} height={1} display='flex' justifyContent='center'>
				<Typography variant='h5'>
					{LANDING.WELCOME}
				</Typography>
			</Box>
			<Box width={1} display='flex' justifyContent='center'>
				<img  
					alt='Sharing' 
					src={LANDING.imgsrc}
					width={1400}
				/>
			</Box>
		</>
		
	);
}

export default LandingPage;