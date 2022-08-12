import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import copy from 'copy-to-clipboard'
import { styled } from 'linaria/react'
import { useRouter } from 'next/router'

import Button from 'components/Button'
import TextArea from 'components/TextArea'
import rot13Fast from 'utils/rot'

const Home = () => {
	// State
	const [isCopied, setIsCopied] = useState(false)
	const [inboundSpoiler, setInboundSpoiler] = useState('')
	const [decryptedSpoiler, setDecryptedSpoiler] = useState('')
	const [original, setOriginal] = useState('')
	const [obfuscated, setObfuscated] = useState('')

	// Location
	const { query, push } = useRouter()
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
		const url = `${window.location.origin}/?t=${encodeURI(obfuscated)}`
		copy(url)
		setIsCopied(true)
	}, [obfuscated])

	const handleReset = useCallback(() => {
		push({ query: {} })
		setInboundSpoiler('')
		setDecryptedSpoiler('')
		setOriginal('')
		setObfuscated('')
	}, [push])

	// Effects
	useEffect(() => {
		// Get query param
		const inbound = query.t
		if (inbound) {
			setInboundSpoiler(inbound)
			// Decrypt
			setDecryptedSpoiler(rot13Fast(inbound))
		}
	}, [query])

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
		<Container>
			<h1>Spoilers are lame 👎</h1>
			{/*  */}
			<h2>How it works</h2>
			<Help>If you came here from a spoiler link, you should see the decoded spoiler below.</Help>
			<Help>
				If you would like to create your own spoiler, simply type the spoiler in the input below. Once you're ready to share, press "Copy
				URL to clipboard" and share it with friends.
			</Help>

			{/*  */}
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
	)
}

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

const Help = styled.div`
	margin-bottom: 16px;
	color: var(--linkAlt);
	line-height: 1.35;
`

export default memo(Home)
