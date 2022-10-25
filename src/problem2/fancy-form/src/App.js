import './App.css'
import { FancyForm } from './components/FancyForm'
import switcheo from './assets/switcheo.svg'
import { useEffect, useState } from 'react'

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
			<FancyForm />
		</div>
	)
}

export default App
