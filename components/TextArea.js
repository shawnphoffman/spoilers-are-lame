import { memo, useCallback } from 'react'
import { styled } from 'linaria/react'

const Wrapper = styled.div`
	display: flex;
	flex-direction: row;
	position: relative;
	background-color: var(--inputBg);
	border-color: var(--transparent);
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
		opacity: ${p => (p.readOnly ? 1 : 0.8)};
	}

	&:focus-within {
		border-color: ${p => (p.readOnly ? 'var(--linkAlt)' : 'var(--inputFocus)')};
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
	user-select: all;

	&:focus {
		outline-style: none;
		box-shadow: none;
		border-color: var(--transparent);
	}

	width: 100%;
	height: 100px;
`

const TextArea = props => {
	const handleFocus = useCallback(
		e => {
			if (props.readOnly) {
				e.target.select()
			}
			if (props.onFocus) {
				props.onFocus(e)
			}
		},
		[props]
	)
	return (
		<Wrapper readOnly={props.readOnly}>
			<NativeControl {...props} onFocus={handleFocus} />
		</Wrapper>
	)
}

export default memo(TextArea)
