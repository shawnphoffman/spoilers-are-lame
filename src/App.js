import { memo } from 'react'
// import { useSearchParams } from 'react-router-dom'
import * as Sentry from '@sentry/react'

import ThemeProvider from 'context/ThemeContext'
import { useDeviceTheme } from 'hooks/useDeviceTheme'
import themeConditional from 'hooks/useThemeConditional'

function App() {
	// Theme
	const theme = useDeviceTheme()
	const themeClass = themeConditional(theme)

	// Location
	// let [searchParams, setSearchParams] = useSearchParams()

	return (
		<Sentry.ErrorBoundary fallback={<div>Uh Oh!</div>}>
			<ThemeProvider>
				<div className={themeClass}>
					<h1>Cool</h1>
				</div>
			</ThemeProvider>
		</Sentry.ErrorBoundary>
	)
}

export default memo(App)
