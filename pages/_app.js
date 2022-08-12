import 'styles/globals.css'

import Head from 'next/head'

function App({ Component, pageProps }) {
	return (
		<>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<title>Spoilers are lame...</title>
				<meta name="title" content="Spoilers are Lame" />
				<meta name="description" content="Simple way to encode and share spoilers" />
			</Head>
			<Component {...pageProps} />
		</>
	)
}

export default App
