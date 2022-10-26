import './App.css'
import { FancyForm } from './components/FancyForm'
import switcheo from './assets/switcheo.svg'
import { useEffect } from 'react'
import { Box } from '@mui/material'

function App() {
	// Prevent default scrolling so snap scroll to sections
	function useImperativeDisableScroll({ element, disabled }) {
		useEffect(() => {
			if (!element) {
				return
			}

			element.style.overflowY = disabled ? 'hidden' : 'scroll'

			return () => {
				element.style.overflowY = 'scroll'
			}
		}, [element, disabled])
	}

	useImperativeDisableScroll({
		element: document.scrollingElement,
		disabled: true
	})

	return (
		<div className="App">
			<Box paddingBottom={4}>
				<img
					style={{ position: 'fixed', left: 0, opacity: 0.1 }}
					src={switcheo}
					alt="Switcheo-Logo"
				></img>
			</Box>
			<FancyForm />
		</div>
	)
}

export default App
