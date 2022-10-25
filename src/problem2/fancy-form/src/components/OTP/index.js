import React, { Component } from 'react'
import { OTPInput } from './OTPInput'

export const OTPAuth = ({ onChangeHandler }) => {
	return (
		<div>
			<OTPInput
				autoFocus
				isNumberInput
				length={6}
				className="otpContainer"
				inputClassName="otpInput"
				onChangeOTP={onChangeHandler}
			/>
		</div>
	)
}
