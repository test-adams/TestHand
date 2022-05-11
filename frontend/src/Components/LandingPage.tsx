import { Box } from "@mui/material";
import { LANDING } from "../Constants";

const LandingPage = () => {
	return (
		<Box width={1} display='flex' justifyContent='center'>
			<img  
				alt='Sharing' 
				src={LANDING.imgsrc}
				width={1400}
			/>
		</Box>
	);
}

export default LandingPage;