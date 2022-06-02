import { memo, useCallback, useEffect, useState } from 'react'
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

	return (
		<Sentry.ErrorBoundary fallback={<div>Uh Oh!</div>}>
			<ThemeProvider>
				<Container className={themeClass}>
					<h1>Spoilers are Lame</h1>
					{inboundSpoiler && (
						<>
							<h2>Inbound spoiler...</h2>
							<textarea value={inboundSpoiler} readOnly />
							<Section>⬆️ ⬇️</Section>
							<textarea value={decryptedSpoiler} readOnly />
						</>
					)}
					<h2>Create your own</h2>
					<textarea defaultValue={original} onChange={handleOriginalChange} />
					<Section>⬆️ ⬇️</Section>
					<textarea defaultValue={obfuscated} onChange={handleObfuscatedChange} />
					<button onClick={handleShareClick}>Share</button>
				</Container>
			</ThemeProvider>
		</Sentry.ErrorBoundary>
	)
}

export default memo(App)
