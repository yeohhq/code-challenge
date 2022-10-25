import './App.css'
import { FancyForm } from './components/FancyForm'
import { Modal } from 'antd'
import switcheo from './assets/switcheo.svg'
import { useEffect, useState } from 'react'

function App() {
	const [openModal, setOpenModal] = useState(false)

	useEffect(() => {
		if (openModal) {
			countDown()
		}
	}, [openModal])

	const countDown = () => {
		let secondsToGo = 3

		const modal = Modal.success({
			title: 'Successfully authenticated',
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
		<div className="App">
			<FancyForm setOpenModal={setOpenModal} />
		</div>
	)
}

export default App
