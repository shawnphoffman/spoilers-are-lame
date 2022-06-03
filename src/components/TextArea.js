import { memo } from 'react'
import { styled } from 'linaria/react'

const Wrapper = styled.div`
	display: flex;
	flex-direction: row;
	position: relative;
	background-color: var(--inputBg);
	border-color: none;
	border-width: 3px;
	border-style: solid;
	transition-delay: 0s;
	transition-duration: 0.2s;
	transition-property: box-shadow;
	transition-timing-function: ease-in-out;
	border-radius: 8px;
	user-select: none;
	max-width: 1200px;
	width: 100%;

	&:hover {
		opacity: 0.8;
	}

	&:focus-within {
		border-color: var(--inputFocus);
		border-width: 3px;
		border-style: solid;
		opacity: 1;
	}
`

const NativeControl = styled.textarea`
	margin: 0;
	padding: 16px;
	font-size: 18px;
	line-height: 1.2;
	text-align: start;
	text-indent: 0px;
	text-transform: none;
	word-spacing: 0px;
	border-color: var(--inputBorder);
	border-style: solid;
	border-width: 0;
	background-color: var(--transparent);
	opacity: 1;
	flex: 1;

	&:focus {
		outline-style: none;
		box-shadow: none;
		border-color: var(--transparent);
	}

	width: 100%;
	height: 100px;
`

const TextArea = props => {
	return (
		<Wrapper>
			<NativeControl {...props} />
		</Wrapper>
	)
}

export default memo(TextArea)
