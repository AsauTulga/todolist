import {lazy, StrictMode, Suspense} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
// import App from './App.tsx'
import {HashRouter} from "react-router";
import UserProvider from "./store/user/user-provider.tsx";

const App = lazy(() => import('./App.tsx'));

createRoot(document.getElementById('root')!).render(
		<StrictMode>
			<HashRouter>
				<UserProvider>
					<Suspense fallback={<h1>Loading...</h1>}>
						<App/>
					</Suspense>
				</UserProvider>
			</HashRouter>
		</StrictMode>,
)
