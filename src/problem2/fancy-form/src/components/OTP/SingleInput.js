import React, { useRef, useLayoutEffect } from 'react'
import usePrevious from '../hooks/usePrevious'
import './style.css'

const SingleInput = ({ focus, autoFocus, ...props }) => {
	const inputRef = useRef()
	const prevFocus = usePrevious(!!focus)

	useLayoutEffect(() => {
		if (inputRef.current) {
			if (focus && autoFocus) {
				inputRef.current.focus()
			}
			if (focus && autoFocus && focus !== prevFocus) {
				inputRef.current.focus()
				inputRef.current.select()
			}
		}
	}, [autoFocus, focus, prevFocus])

	return <input ref={inputRef} {...props} />
}

export default SingleInput
