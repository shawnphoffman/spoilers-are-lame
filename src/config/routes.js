import { lazy } from 'react'

const LazyPreload = importStatement => {
	const Component = lazy(importStatement)
	Component.preload = importStatement
	return Component
}

const Home = LazyPreload(() => import('../pages/Home'))

// Change to conform to API?
// https://reactrouter.com/docs/en/v6/api#useroutes

const Routes = {
	Home: {
		path: '',
		component: Home,
		icon: 'fa-calendar-days',
		title: 'Home',
	},
}

export const RegisteredRoutes = [Routes.Home]

export const NavRoutes = [Routes.Home]

export const preloadRouteComponent = component => {
	if (component && component.preload) {
		component.preload()
	}
}

export default Routes
