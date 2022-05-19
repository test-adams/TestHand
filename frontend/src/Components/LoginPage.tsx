import { Typography, Box, TextField, Paper, Container, Button } from "@mui/material"
import { useState } from 'react';
import React from 'react'
import {LOGIN} from '../Constants'


interface userInfo {
	name: string,
	password: string
}

const default_form_values: userInfo = {
	name: '',
	password: ''
}


const LoginPage = () => {

	let [infoState, setInfoState] = useState(default_form_values);
	let [hasSubmit, setHasSubmit] = useState(false);

	let [nameError, setNameError] = useState(false);
	let [passwordError, setPasswordError] = useState(false);

	let [nameHelperText, setNameHelperText] = useState("")
	let [passwordHelperText, setPasswordHelperText] = useState("")


	const isValidSubmit = (name: string, password: string): Boolean => {
		let isValid = true;

		if(name === default_form_values.name) {
			setNameError(true);
			setNameHelperText(LOGIN.HelperText);
			isValid = false;
		} else {
			setNameError(false);
			setNameHelperText('');
		}

		if(password === default_form_values.password) {
			setPasswordError(true);
			setPasswordHelperText(LOGIN.HelperText);
			isValid = false;
		} else {
			setPasswordError(false);
			setPasswordHelperText('');
		}

		return isValid;
	}

	const handleSubmit = (event: any) => {
		event.preventDefault();
		const name = event.target[0].value
		const password = event.target[1].value

		if(isValidSubmit(name, password)){

			console.log(event.target[0].value);
			console.log(event.target[1].value);

			let newInfo: userInfo = {
				name: event.target[0].value,
				password: event.target[1].value
			}

			setInfoState(newInfo);
			setHasSubmit(true);
		} else {
			setInfoState(default_form_values);
			setHasSubmit(false);
		}

	}

	
	const SubmitReply = () => {
		if(hasSubmit){
			return(
				<Box mt={10} display='flex' justifyContent='center'>
					<Typography variant='h6'>{LOGIN.SubmitStatement1}{infoState.name}{LOGIN.SubmitStatement2}</Typography>
				</Box>
			)
		}

		const space = ''
		return(<Box>{space}</Box>)
	}
	
	return(
		<>
			<Box mt={30} display='flex' justifyContent='center'>
				<Container maxWidth='xs'>
					<Paper elevation={6}>
						<Box sx={{p:2}} display='flex' justifyContent='center'>
							<Typography variant='h4'>
								{LOGIN.Title}
							</Typography>
						</Box>
						<form onSubmit={handleSubmit}>
							<Box sx={{p:2}} display='flex' justifyContent='center' flexDirection={'column'}>

									<TextField
									
										error={nameError}
										helperText={nameHelperText}
										id = 'user-name'
										variant = 'filled'
										label = '*User Name'
									/>

								<TextField
									
									error={passwordError}
									helperText={passwordHelperText}
									sx={{mt:2}}
									id = 'user-password'
									variant = 'filled'
									label = '*Password'
								/>
								<Button sx={{mt:2}} variant='contained' type='submit' value='Submit'>Submit</Button>
							</Box>
						</form>
					</Paper>
				</Container>
			</Box>

			<SubmitReply/>
		</>
	);
}



export default LoginPage;