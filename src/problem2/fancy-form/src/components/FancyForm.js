import React, { useRef, useState, useEffect, useLayoutEffect } from 'react'
import { Field, Form, Formik } from 'formik'
import { Box, Button } from '@mui/material'
import { useInView } from 'framer-motion'
import { TextField } from 'formik-material-ui'
import * as Yup from 'yup'
import { ethers } from 'ethers'
import { OTPInput } from './OTP/OTPInput'
import './style.css'
import switcheoArrow from '../assets/arrow.svg'
import _ from 'lodash'

// Timeout for on submit
const sleep = (time) => new Promise((acc) => setTimeout(acc, time))

function scrollToSection(index) {
	document
		.getElementById(`section-${index}`)
		.scrollIntoView({ behavior: 'smooth' })
}

function Section({ index, label, children }) {
	const ref = useRef(null)
	const isInView = useInView(ref, { once: true })

	return (
		<section id={`section-${index}`} ref={ref}>
			<h1>{label}</h1>
			<span
				style={{
					transform: isInView ? 'none' : 'translateY(200px)',
					opacity: isInView ? 1 : 0,
					transition:
						'all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s'
				}}
			>
				{children}
			</span>
		</section>
	)
}

export function FancyForm() {
	const [submissionText, setSubmissionText] = useState(
		'Processing your transaction...'
	)
	const [showOTPErrorText, setShowOTPErrorText] = useState(false)
	const [hasSubmitted, setHasSubmitted] = useState(false)

	// Custom validation for ETH address
	Yup.addMethod(Yup.string, 'ethAddress', function (errorMessage) {
		return this.test('test-eth-address', errorMessage, function (value) {
			const { path, createError } = this

			return (
				(value && ethers.utils.isAddress(value)) ||
				createError({ path, message: errorMessage })
			)
		})
	})

	useEffect(() => {
		// Mimic form submit complete
		if (hasSubmitted) {
			setSubmissionText('Transaction completed!')
		} else {
			setSubmissionText('Processing your transaction...')
		}
	}, [hasSubmitted])

	const onSubmit = async (values, helpers) => {
		await sleep(3000)
		setHasSubmitted(true)
		// Reset form
		helpers.resetForm()
	}

	useEffect(() => {
		// Force page to load from top
		scrollToSection(0)
	}, [])

	return (
		<div>
			<FormikStepper
				initialValues={{
					ethAddress: '', // '0xd1D8B2AaE2ebb2ACF013b803bC3c24CA1303a392'
					Amount: '', // 2
					OTP: '' // 123456
				}}
				onSubmit={onSubmit}
				setShowOTPErrorText={setShowOTPErrorText}
			>
				<FormikStep
					validationSchema={Yup.object({
						ethAddress: Yup.string()
							.ethAddress('Please enter a valid ETH address')
							.required(),
						Amount: Yup.number().positive().required()
					})}
					label="Transaction Details"
				>
					<Box paddingBottom={4}>
						<Field
							fullWidth
							name="ethAddress"
							component={TextField}
							label="ETH Address"
						/>
					</Box>
					<Box paddingBottom={4}>
						<Field
							fullWidth
							name="Amount"
							type="number"
							component={TextField}
							label="Amount to send (in BNB)"
						/>
					</Box>
				</FormikStep>

				<FormikStep label="OTP Authentication">
					<Box paddingBottom={2}>
						{
							<Field fullWidth name="OTP" id="OTP">
								{({
									field: { value, name },
									form: { setFieldValue }
								}) => {
									return (
										<OTPInput
											length={6}
											autoFocus
											name={name}
											className="otpContainer"
											inputClassName="otpInput"
											value={value}
											onChangeOTP={setFieldValue}
											reset={hasSubmitted}
										/>
									)
								}}
							</Field>
						}
					</Box>
					{showOTPErrorText ? (
						<Box className="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium MuiFormHelperText-contained">
							OTP does not match
						</Box>
					) : null}
				</FormikStep>
			</FormikStepper>
			<Section index={'submit'} label={submissionText}>
				<Box paddingBottom={4}>
					<img src={switcheoArrow} alt="Switcheo-Arrow"></img>
				</Box>
				{hasSubmitted ? (
					<Button
						onClick={() => {
							scrollToSection(0)
							setHasSubmitted(false)
						}}
					>
						Create new transaction
					</Button>
				) : null}
			</Section>
		</div>
	)
}

export function FormikStep({ children, ...props }) {
	return <>{children}</>
}

export function FormikStepper({ setShowOTPErrorText, children, ...props }) {
	const childrenArray = React.Children.toArray(children)
	const [step, setStep] = useState(0)
	const currentChild = childrenArray[step]

	const [isSubmitting, setIsSubmitting] = useState(false)

	useLayoutEffect(() => {
		setStep(0)
		setIsSubmitting(false)
	}, [])

	function isLastStep() {
		return step === childrenArray.length - 1
	}

	function hasSubmit(index) {
		return index === childrenArray.length - 1
	}

	function hasBack(index) {
		return index > 0
	}

	function decrementStep() {
		const newStep = step - 1
		setStep(newStep)
		scrollToSection(newStep)
	}

	function incrementStep() {
		const newStep = step + 1
		setStep(newStep)
		scrollToSection(newStep)
	}

	function validateOTP(value) {
		const num = Number.parseInt(value)
		if (!value) {
			return false
		} else if (!_.isNumber(num)) {
			return false
		} else if (value.length !== 6) {
			return false
		}
		return true
	}

	return (
		<Formik
			validationSchema={currentChild.props.validationSchema}
			{...props}
			onSubmit={async (values, helpers) => {
				if (isLastStep()) {
					// On last step of form

					// Validate OTP
					if (validateOTP(values.OTP)) {
						setShowOTPErrorText(false)
						setIsSubmitting(true)
						scrollToSection('submit')

						await props.onSubmit(values, helpers)
						setStep(0)
					} else {
						setShowOTPErrorText(true)
					}
				} else {
					incrementStep() // Validated, move to next step
				}
			}}
		>
			<Form autoComplete="off">
				{childrenArray.map((child, index) => {
					const label = child.props.label
					return (
						<Section index={index} label={label}>
							{child}
							<Box
								sx={{
									display: 'flex',
									justifyContent: 'end'
								}}
							>
								{hasBack(index) ? (
									<Button
										disabled={isSubmitting}
										onClick={decrementStep}
									>
										Back
									</Button>
								) : null}
								<Button type="submit">
									{hasSubmit(index) ? 'Submit' : 'Next'}
								</Button>
							</Box>
						</Section>
					)
				})}
			</Form>
		</Formik>
	)
}
