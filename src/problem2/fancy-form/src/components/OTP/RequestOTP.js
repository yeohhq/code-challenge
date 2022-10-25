import React, { useState, useEffect } from 'react'
import { Box } from '@mui/material'
import { Modal } from 'antd'
import _ from 'lodash'
import OTPModal from './OTPModal'

const RequestOTP = () => {
	const [hasRequestedOTP, setHasRequestedOTP] = useState(false)
	const [openModal, setOpenModal] = useState(false)

	useEffect(() => {
		if (openModal) {
			// countDown()
		}
	}, [openModal])

	const countDown = () => {
		let secondsToGo = 3

		const modal = Modal.success({
			title: 'Requesting for OTP',
			content: 'Please wait while we process your transaction...',
			onOk: () => {
				setOpenModal(false)
			}
		})

		const timer = setInterval(() => {
			secondsToGo -= 1

			modal.update({
				content: 'A little more to go...'
			})
		}, 1000)

		setTimeout(() => {
			clearInterval(timer)
			modal.destroy()
			setOpenModal(false)
		}, secondsToGo * 1000)
	}

	return (
		<Box
			paddingBottom={2}
			sx={{
				display: 'flex',
				justifyContent: 'start'
			}}
		>
			<OTPModal setHasRequestedOTP={setHasRequestedOTP} />
		</Box>
	)
}

export default RequestOTP
