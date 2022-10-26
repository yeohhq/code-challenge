import './style.css'
import { motion } from 'framer-motion'

const draw = {
	hidden: { pathLength: 0, opacity: 0 },
	visible: (i) => {
		const delay = 1 + i * 0.5
		return {
			pathLength: 1,
			opacity: 1,
			transition: {
				pathLength: { delay, type: 'spring', duration: 1.5, bounce: 0 },
				opacity: { delay, duration: 0.01 }
			}
		}
	}
}

export default function LoadingArrow() {
	return (
		<motion.svg
			width="180"
			height="180"
			viewBox="0 0 240 240"
			initial="hidden"
			animate="visible"
		>
			<motion.line
				x1="35"
				y1="40"
				x2="220"
				y2="40"
				stroke="rgb(226,252,164)"
				variants={draw}
				custom={2.5}
			/>
			<motion.line
				x1="220"
				y1="230"
				x2="220"
				y2="20"
				stroke="rgb(226,252,164)"
				variants={draw}
				custom={2.5}
			/>
			<motion.line
				x1="40"
				y1="220"
				x2="220"
				y2="40"
				stroke="rgb(226,252,164)"
				variants={draw}
				custom={2.5}
			/>
		</motion.svg>
	)
}
