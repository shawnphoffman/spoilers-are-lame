import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import * as Sentry from '@sentry/react'
import { styled } from 'linaria/react'

import Button from 'components/Button'
import TextArea from 'components/TextArea'
import ThemeProvider from 'context/ThemeContext'
import { useDeviceTheme } from 'hooks/useDeviceTheme'
import themeConditional from 'hooks/useThemeConditional'
import rot13Fast from 'utils/rot'

const Section = styled.p`
	display: flex;
	justify-content: center;
	margin: 16px;
`

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: stretch;
	padding: 16px;
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

	const handleFocusClick = useCallback(e => {
		e.target.select()
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

	return (
		<Sentry.ErrorBoundary fallback={<div>Uh Oh!</div>}>
			<ThemeProvider>
				<Container className={themeClass}>
					<h1>Spoilers are Lame</h1>
					{inboundSpoiler ? (
						<>
							<h2>Incoming spoiler...</h2>
							<TextArea value={inboundSpoiler} readOnly key="one" />
							<Section>⬆️ ⬇️</Section>
							<TextArea value={decryptedSpoiler} readOnly key="two" />
							<Button onClick={handleCreateClick}>Create your own...</Button>
						</>
					) : (
						<>
							<h2>Create your own</h2>
							<TextArea
								placeholder="Enter the text you want to cipher"
								defaultValue={original}
								onChange={handleOriginalChange}
								key="three"
							/>
							<Section>⬆️ ⬇️</Section>
							<TextArea
								placeholder="Ciphered text will appear here"
								readOnly
								defaultValue={obfuscated}
								key="four"
								onFocus={handleFocusClick}
							/>
							<Button onClick={handleShareClick} disabled={shareDisabled} fullWidth>
								Share
							</Button>
						</>
					)}
				</Container>
			</ThemeProvider>
		</Sentry.ErrorBoundary>
	)
}

export default memo(App)