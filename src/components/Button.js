import { memo } from 'react'
import { styled } from 'linaria/react'

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	margin-top: 16px;
	margin-bottom: 16px;
`

const StyledButton = styled.button`
	border: none;
	color: var(--inputBg);
	background: var(--linkActive);
	font-weight: 700;
	border-radius: 8px;
	text-align: center;
	display: inline-block;
	width: 100%;
	transition: all 0.25s;

	&:hover {
		color: var(--inputBg);
		background: var(--linkHover);
	}
	text-decoration: none;
	cursor: pointer;

	font-size: 20px;
	padding: 8px 16px;
	min-width: 175px;

	&:disabled {
		background: var(--inactive);
		opacity: 0.5;
	}
`

const Button = props => {
	const isLink = !!props.href
	const as = isLink ? 'a' : 'button'
	return (
		<Wrapper onClick={() => {}}>
			<StyledButton as={as} {...props} />
		</Wrapper>
	)
}

export default memo(Button)
