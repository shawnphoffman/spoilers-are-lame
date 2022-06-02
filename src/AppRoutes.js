import { memo, Suspense } from 'react'
import { Route, Routes as RouterRoutes } from 'react-router-dom'

import { RegisteredRoutes } from 'config/routes'

const AppRoutes = () => {
	return (
		<RouterRoutes>
			{RegisteredRoutes.map(l => {
				const path = l.path === '' ? '*' : l.path
				const Comp = l.component
				return (
					<Route
						key={path}
						path={path}
						element={
							<Suspense fallback={l.fallback}>
								<Comp />
							</Suspense>
						}
					/>
				)
			})}
		</RouterRoutes>
	)
}

export default memo(AppRoutes)
