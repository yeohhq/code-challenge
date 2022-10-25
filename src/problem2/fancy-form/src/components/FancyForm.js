import React, { useRef, useState, useEffect } from 'react'
import { Field, Form, Formik } from 'formik'
import { Box, Button, CircularProgress } from '@mui/material'
import { useInView } from 'framer-motion'
import { TextField } from 'formik-material-ui'
import * as Yup from 'yup'
import { ethers } from 'ethers'
import { OTPInput } from './OTP/OTPInput'
import './style.css'

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
					transform: isInView ? 'none' : 'translateX(-200px)',
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

export function FancyForm({ setOpenModal }) {
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

	const onSubmit = async (values) => {
		setOpenModal(true)
		await sleep(3000)
		console.log(values)
		scrollToSection(0) // Scroll back to top
	}

	function validateOTP(value) {
		let error
		if (!value) {
			error = 'This field is required'
		} else if (!/^[0-9]+$/) {
			error = 'Please only fill in digits 0 to 9'
		} else if (value.length !== 6) {
			error = 'Please fill in exactly 6 digits'
		}
		return error
	}

	useEffect(() => {
		// Force page to load from top
		scrollToSection(0)
	}, [])

	return (
		<div>
			<FormikStepper
				initialValues={{
					ethAddress: '0xd1D8B2AaE2ebb2ACF013b803bC3c24CA1303a392',
					Amount: 2,
					OTP: '123456'
				}}
				onSubmit={onSubmit}
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
					<Box paddingBottom={4}>
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
											validate={validateOTP}
										/>
									)
								}}
							</Field>
						}
					</Box>
				</FormikStep>
			</FormikStepper>
		</div>
	)
}

export function FormikStep({ children, ...props }) {
	return <>{children}</>
}

export function FormikStepper({ children, ...props }) {
	const childrenArray = React.Children.toArray(children)
	const [step, setStep] = useState(0)
	const currentChild = childrenArray[step]

	const [isSubmitting, setIsSubmitting] = useState(false)

	function isLastStep() {
		return step === childrenArray.length - 1
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

	function formReset(helpers) {
		helpers.resetForm()
		setStep(0)
		setIsSubmitting(false)
	}

	return (
		<Formik
			validationSchema={currentChild.props.validationSchema}
			{...props}
			onSubmit={async (values, helpers) => {
				if (isLastStep()) {
					// On last step of form
					setIsSubmitting(true)
					await props.onSubmit(values, helpers)

					// Reset form
					formReset(helpers)
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
							{index > 0 ? (
								<Button
									hidden={isSubmitting}
									onClick={decrementStep}
								>
									Back
								</Button>
							) : null}
							<Button
								startIcon={
									isSubmitting ? (
										<CircularProgress size="1rem" />
									) : null
								}
								disabled={isSubmitting}
								type="submit"
							>
								{isSubmitting
									? 'Submitting'
									: index === childrenArray.length - 1
									? 'Submit'
									: 'Next'}
							</Button>
						</Section>
					)
				})}
			</Form>
		</Formik>
	)
}
