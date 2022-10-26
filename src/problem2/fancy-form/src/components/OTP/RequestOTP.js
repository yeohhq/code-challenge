import React, { useState, useEffect } from 'react'
import { Box } from '@mui/material'
import { Modal } from 'antd'
import _, { set } from 'lodash'
import OTPModal from './OTPModal'

const RequestOTP = () => {
	const [hasRequestedOTP, setHasRequestedOTP] = useState(false)
	const [timer, setTimer] = useState(60)

	// Start 60 seconds countdown for requesting new OTP
	useEffect(() => {
		if (hasRequestedOTP) {
			countDown()
		}
	}, [hasRequestedOTP])

	const countDown = () => {
		let secondsToGo = 60

		const timer = setInterval(() => {
			secondsToGo -= 1
			setTimer(secondsToGo)
		}, 1000)

		setTimeout(() => {
			clearInterval(timer)
			setTimer(60)
			setHasRequestedOTP(false)
		}, secondsToGo * 1000)
	}

	return (
		<Box
			paddingBottom={4}
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center'
			}}
		>
			<Box paddingBottom={2}>
				{hasRequestedOTP
					? `Request for new OTP in ${timer} seconds`
					: null}
			</Box>
			<OTPModal
				disabled={hasRequestedOTP}
				setHasRequestedOTP={setHasRequestedOTP}
			/>
		</Box>
	)
}

export default RequestOTP
