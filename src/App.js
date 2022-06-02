import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import * as Sentry from '@sentry/react'
import { styled } from 'linaria/react'

import ThemeProvider from 'context/ThemeContext'
import { useDeviceTheme } from 'hooks/useDeviceTheme'
import themeConditional from 'hooks/useThemeConditional'
import rot13Fast from 'utils/rot'

const Section = styled.p`
	display: flex;
	justify-content: center;
`

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: stretch;
	padding: 8px;
`

function App() {
	// Theme
	const theme = useDeviceTheme()
	const themeClass = themeConditional(theme)

	// State
	const [inboundSpoiler, setInboundSpoiler] = useState('')
	const [decryptedSpoiler, setDecryptedSpoiler] = useState('')
	const [original, setOriginal] = useState('')
	const [obfuscated, setObfuscated] = useState('')

	// Location
	const [searchParams, setSearchParams] = useSearchParams()

	//
	const shareDisabled = useMemo(() => {
		return !(original && obfuscated)
	}, [obfuscated, original])

	// Handlers
	const handleOriginalChange = useCallback(e => {
		const value = e.target.value
		setOriginal(value)
	}, [])

	const handleObfuscatedChange = useCallback(e => {
		const value = e.target.value
		setObfuscated(value)
	}, [])

	const handleShareClick = useCallback(() => {
		const params = { t: obfuscated }
		setSearchParams(params)
	}, [obfuscated, setSearchParams])

	const handleCreateClick = useCallback(() => {
		setSearchParams({})
		setInboundSpoiler('')
		setDecryptedSpoiler('')
		setOriginal('')
		setObfuscated('')
	}, [setSearchParams])

	// Effects
	useEffect(() => {
		// Get query param
		const inbound = searchParams.get('t')
		if (inbound) {
			setInboundSpoiler(inbound)
			// Decrypt
			setDecryptedSpoiler(rot13Fast(inbound))
		}
	}, [searchParams])

	useEffect(() => {
		const temp = rot13Fast(original)
		setObfuscated(temp)
	}, [original])

	console.log({ shareDisabled })

	return (
		<Sentry.ErrorBoundary fallback={<div>Uh Oh!</div>}>
			<ThemeProvider>
				<Container className={themeClass}>
					<h1>Spoilers are Lame</h1>
					{inboundSpoiler ? (
						<>
							<h2>Incoming spoiler...</h2>
							<textarea value={inboundSpoiler} readOnly key="one" />
							<Section>⬆️ ⬇️</Section>
							<textarea value={decryptedSpoiler} readOnly key="two" />
							<button onClick={handleCreateClick}>Create your own...</button>
						</>
					) : (
						<>
							<h2>Create your own</h2>
							<textarea defaultValue={original} onChange={handleOriginalChange} key="three" />
							<Section>⬆️ ⬇️</Section>
							<textarea defaultValue={obfuscated} onChange={handleObfuscatedChange} key="four" />
							<button onClick={handleShareClick} disabled={shareDisabled}>
								Share
							</button>
						</>
					)}
				</Container>
			</ThemeProvider>
		</Sentry.ErrorBoundary>
	)
}

export default memo(App)
