import React, { useState } from 'react'
import {
	Box,
	Modal,
	Fade,
	Button,
	Typography,
	FormControl,
	OutlinedInput,
	InputLabel,
	Backdrop
} from '@mui/material'
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward'
import _ from 'lodash'

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	background: '#F4F9FD',
	borderRadius: 8,
	boxShadow: 24,
	p: 4
}

export default function OTPModal({ setHasRequestedOTP }) {
	const [open, setOpen] = useState(false)
	const [mobileNo, setMobileNo] = useState('')
	const [isValidMobileNo, setIsValidMobileNo] = useState(true)
	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)

	function handleOnMobileChange(e) {
		const val = e.currentTarget.value
		setMobileNo(val)
	}

	function handleRequestOTP() {
		if (!_.isNumber(mobileNo) && mobileNo.length !== 8) {
			setIsValidMobileNo(false)
		} else {
			// Valid mobile no
			setOpen(false)
			setHasRequestedOTP(false)
		}
	}

	return (
		<div>
			<Button variant="outlined" onClick={handleOpen}>
				Request OTP
			</Button>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				open={open}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500
				}}
			>
				<Fade in={open}>
					<Box sx={style}>
						<Box>
							<Typography
								id="transition-modal-title"
								variant="h6"
								component="h2"
								style={{ fontWeight: 600 }}
							>
								Request for OTP
							</Typography>
							<Typography
								id="transition-modal-description"
								sx={{ mt: 2 }}
							>
								Please enter your mobile number
							</Typography>
						</Box>
						<Box component="form" paddingTop={4} paddingBottom={2}>
							<FormControl>
								<InputLabel
									htmlFor="component-simple"
									error={!isValidMobileNo}
								>
									Mobile Number
								</InputLabel>
								<OutlinedInput
									id="component-simple"
									value={mobileNo}
									onChange={handleOnMobileChange}
									label="Mobile Number"
									inputProps={{
										inputMode: 'numeric',
										pattern: '[0-9]*'
									}}
									required
									error={!isValidMobileNo}
									aria-errormessage="Please provide a valid 8-digit mobile number (SG)"
								/>
							</FormControl>
						</Box>
						<Box
							sx={{ display: 'flex', justifyContent: 'flex-end' }}
						>
							<Button
								onClick={handleRequestOTP}
								endIcon={<ArrowOutwardIcon />}
							>
								Send OTP
							</Button>
						</Box>
					</Box>
				</Fade>
			</Modal>
		</div>
	)
}
