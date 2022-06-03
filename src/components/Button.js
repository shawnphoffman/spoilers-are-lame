import { memo } from 'react'
import { styled } from 'linaria/react'

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
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

	&:hover {
		color: var(--inputBg);
		background: var(--linkHover);
	}
	text-decoration: none;
	cursor: pointer;

	margin-top: 16px;
	margin-bottom: 16px;
	font-size: 20px;
	padding: 8px 16px;
	min-width: 175px;

	&:disabled {
		background: var(--inactive);
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
