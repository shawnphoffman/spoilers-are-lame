import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import * as Sentry from '@sentry/react'
import copy from 'copy-to-clipboard'
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
	const [isCopied, setIsCopied] = useState(false)
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
		const url = `${window.location.origin}/?t=${obfuscated}`
		copy(url)
		setIsCopied(true)
	}, [obfuscated])

	const handleReset = useCallback(() => {
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

	useEffect(() => {
		let t
		if (isCopied) {
			t = setTimeout(() => {
				setIsCopied(false)
			}, 3000)
		}
		return () => t
	}, [isCopied])

	return (
		<Sentry.ErrorBoundary fallback={<div>Uh Oh!</div>}>
			<ThemeProvider>
				<Container className={themeClass}>
					<h1>Spoilers are lame 👎</h1>
					{inboundSpoiler ? (
						<>
							<h2>Decoding spoiler...</h2>
							<TextArea value={inboundSpoiler} readOnly disabled key="one" />
							<Section>⬆️ ⬇️</Section>
							<TextArea value={decryptedSpoiler} readOnly disabled key="two" />
							<Button onClick={handleReset}>Create your own spoiler</Button>
						</>
					) : (
						<>
							<h2>Create your own...</h2>
							<TextArea placeholder="Enter the text you want to encode" onChange={handleOriginalChange} value={original} key="three" />
							<Section>⬆️ ⬇️</Section>
							<TextArea placeholder="Encoded text will appear here" readOnly value={obfuscated} key="four" onFocus={handleFocusClick} />
							<div>
								<Button onClick={handleShareClick} disabled={shareDisabled} fullWidth>
									{isCopied ? 'Copied to clipboard' : 'Copy URL to clipboard'}
								</Button>
								<Button onClick={handleReset} fullWidth>
									Reset
								</Button>
							</div>
						</>
					)}
				</Container>
			</ThemeProvider>
		</Sentry.ErrorBoundary>
	)
}

export default memo(App)
