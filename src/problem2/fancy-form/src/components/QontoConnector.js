import React from 'react'
import PropTypes from 'prop-types'
import { styled } from '@mui/material/styles'
import { Check } from '@mui/icons-material'
import StepConnector, {
	stepConnectorClasses
} from '@mui/material/StepConnector'

export const QontoConnector = styled(StepConnector)(({ theme }) => ({
	[`&.${stepConnectorClasses.alternativeLabel}`]: {
		top: 10,
		left: 'calc(-50% + 16px)',
		right: 'calc(50% + 16px)'
	},
	[`&.${stepConnectorClasses.active}`]: {
		[`& .${stepConnectorClasses.line}`]: {
			borderColor: '#784af4'
		}
	},
	[`&.${stepConnectorClasses.completed}`]: {
		[`& .${stepConnectorClasses.line}`]: {
			borderColor: '#784af4'
		}
	},
	[`& .${stepConnectorClasses.line}`]: {
		borderColor:
			theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
		borderTopWidth: 3,
		borderRadius: 1
	}
}))

const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
	color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
	display: 'flex',
	height: 22,
	alignItems: 'center',
	...(ownerState.active && {
		color: '#784af4'
	}),
	'& .QontoStepIcon-completedIcon': {
		color: '#784af4',
		zIndex: 1,
		fontSize: 18
	},
	'& .QontoStepIcon-circle': {
		width: 8,
		height: 8,
		borderRadius: '50%',
		backgroundColor: 'currentColor'
	}
}))

export function QontoStepIcon(props) {
	const { active, completed, className } = props

	return (
		<QontoStepIconRoot ownerState={{ active }} className={className}>
			{completed ? (
				<Check className="QontoStepIcon-completedIcon" />
			) : (
				<div className="QontoStepIcon-circle" />
			)}
		</QontoStepIconRoot>
	)
}

QontoStepIcon.propTypes = {
	/**
	 * Whether this step is active.
	 * @default false
	 */
	active: PropTypes.bool,
	className: PropTypes.string,
	/**
	 * Mark the step as completed. Is passed to child components.
	 * @default false
	 */
	completed: PropTypes.bool
}
