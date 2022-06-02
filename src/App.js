import { memo, Suspense } from 'react'
import * as Sentry from '@sentry/react'

import ThemeProvider from 'context/ThemeContext'
import { useDeviceTheme } from 'hooks/useDeviceTheme'
import themeConditional from 'hooks/useThemeConditional'

import AppRoutes from './AppRoutes'

function App() {
	// Theme
	const theme = useDeviceTheme()
	const themeClass = themeConditional(theme)

	return (
		<Sentry.ErrorBoundary fallback={<div>Uh Oh!</div>}>
			<ThemeProvider>
				<div className={themeClass}>
					<Suspense fallback={<div>Loading...</div>}>
						<AppRoutes />
					</Suspense>
				</div>
			</ThemeProvider>
		</Sentry.ErrorBoundary>
	)
}

export default memo(App)
