import React, { useState } from 'react'
import {
	TextField,
	Button,
	Dialog,
	DialogContent,
	DialogActions,
	DialogTitle,
	DialogContentText
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

export default function OTPModal({ disabled, setHasRequestedOTP }) {
	const [open, setOpen] = useState(false)
	const [mobileNo, setMobileNo] = useState('')
	const [isValidMobileNo, setIsValidMobileNo] = useState(true)
	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)

	function handleOnMobileChange(e) {
		const val = e.currentTarget.value
		setMobileNo(val)
	}

	function handleRequestOTP(e) {
		e.preventDefault()

		if (!_.isNumber(mobileNo) && mobileNo.length !== 8) {
			setIsValidMobileNo(false)
		} else {
			// Valid mobile no
			setOpen(false)
			setHasRequestedOTP(true)
		}
	}

	return (
		<div>
			<Button disabled={disabled} variant="outlined" onClick={handleOpen}>
				Request OTP
			</Button>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Request for OTP</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Please enter your mobile number
					</DialogContentText>
					<TextField
						autoFocus
						margin="dense"
						id="mobileNumber"
						label="Mobile Number"
						type="number"
						fullWidth
						vali
						onChange={handleOnMobileChange}
					/>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={handleRequestOTP}
						endIcon={<ArrowOutwardIcon />}
					>
						Send OTP
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}
