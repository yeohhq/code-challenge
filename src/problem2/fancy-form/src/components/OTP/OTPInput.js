import React, { useState, useCallback } from 'react'
import SingleInput from './SingleInput'
import _ from 'lodash'
import './style.css'

export const OTPInput = (props) => {
	const {
		length,
		autoFocus,
		disabled,
		onChangeOTP,
		inputClassName,
		inputStyle,
		name,
		label,
		showErrorMessage,
		errorMessage,
		...rest
	} = props

	const [activeInput, setActiveInput] = useState(0)
	const [otpValues, setOTPValues] = useState(Array(length).fill(''))

	// Helper to return OTP from inputs
	const handleOtpChange = useCallback(
		(otp) => {
			const otpValue = otp.join('')
			onChangeOTP('OTP', otpValue)
		},
		[onChangeOTP]
	)

	// Focus `inputIndex` input
	const focusInput = useCallback(
		(inputIndex) => {
			const selectedIndex = Math.max(Math.min(length - 1, inputIndex), 0)
			setActiveInput(selectedIndex)
		},
		[length]
	)

	const focusPrevInput = useCallback(() => {
		focusInput(activeInput - 1)
	}, [activeInput, focusInput])

	const focusNextInput = useCallback(() => {
		focusInput(activeInput + 1)
	}, [activeInput, focusInput])

	// Handle onFocus input
	const handleOnFocus = useCallback(
		(index) => () => {
			focusInput(index)
		},
		[focusInput]
	)

	// Change OTP on focus
	const changeCodeAtFocus = useCallback(
		(val) => {
			const updatedOTPValues = [...otpValues]
			updatedOTPValues[activeInput] = val || ''
			setOTPValues(updatedOTPValues)
			handleOtpChange(updatedOTPValues)
		},
		[activeInput, handleOtpChange, otpValues]
	)

	// Handle onChange value for each input
	const handleOnChange = useCallback(
		(e) => {
			const val = e.currentTarget.value
			if (_.isEmpty(val)) {
				e.preventDefault()
				return
			}
			changeCodeAtFocus(val)
			focusNextInput()
		},
		[focusNextInput, changeCodeAtFocus]
	)

	// Handle onBlur input
	const onBlur = useCallback(() => {
		setActiveInput(-1)
	}, [])

	// Handle onKeyDown input
	const handleOnKeyDown = useCallback(
		(e) => {
			const pressedKey = e.key

			switch (pressedKey) {
				case 'Backspace':
				case 'Delete': {
					e.preventDefault()
					if (otpValues[activeInput]) {
						changeCodeAtFocus('')
					} else {
						focusPrevInput()
					}
					break
				}
				case 'ArrowLeft': {
					e.preventDefault()
					focusPrevInput()
					break
				}
				case 'ArrowRight': {
					e.preventDefault()
					focusNextInput()
					break
				}
				default: {
					if (pressedKey.match(/^[^a-zA-Z0-9]$/)) {
						e.preventDefault()
					}

					break
				}
			}
		},
		[
			activeInput,
			changeCodeAtFocus,
			focusNextInput,
			focusPrevInput,
			otpValues
		]
	)

	const handleOnPaste = useCallback(
		(e) => {
			e.preventDefault()
			const pastedData = e.clipboardData
				.getData('text/plain')
				.trim()
				.slice(0, length - activeInput)
				.split('')
			if (pastedData) {
				let nextFocusIndex = 0
				const updatedOTPValues = [...otpValues]
				updatedOTPValues.forEach((val, index) => {
					if (index >= activeInput) {
						const changedValue = pastedData.shift() || val
						if (changedValue) {
							updatedOTPValues[index] = changedValue
							nextFocusIndex = index
						}
					}
				})
				setOTPValues(updatedOTPValues)
				setActiveInput(Math.min(nextFocusIndex + 1, length - 1))
				handleOtpChange(updatedOTPValues)
			}
		},
		[activeInput, length, otpValues, handleOtpChange]
	)

	return (
		<div {...rest}>
			{Array(length)
				.fill('')
				.map((_, index) => (
					<SingleInput
						label={`SingleInput-${index}`}
						name={`SingleInput-${index}`}
						focus={activeInput === index}
						value={otpValues[index]}
						autoFocus={autoFocus}
						onFocus={handleOnFocus(index)}
						onChange={handleOnChange}
						onKeyDown={handleOnKeyDown}
						onBlur={onBlur}
						onPaste={handleOnPaste}
						style={inputStyle}
						className={inputClassName}
						disabled={disabled}
					/>
				))}
		</div>
	)
}
