import './App.css'
import {lazy, Suspense} from "react";
import AppRouter from "./app-router.tsx";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";

const MainHeader = lazy(() => import("./components/main-header.tsx"));

const theme = createTheme({
	palette: {
		primary: {main: '#2563eb'},
		secondary: {main: '#0f766e'},
		background: {default: '#f7f8fb', paper: '#ffffff'},
		success: {main: '#16a34a'},
	},
	shape: {borderRadius: 8},
	typography: {
		fontFamily: '"Inter", "Segoe UI", sans-serif',
		h1: {fontSize: '2.25rem', fontWeight: 800},
		button: {fontWeight: 700, textTransform: 'none'},
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {borderRadius: 8},
			},
		},
		MuiPaper: {
			styleOverrides: {
				root: {backgroundImage: 'none'},
			},
		},
	},
});

function App() {

	return (
			<ThemeProvider theme={theme}>
				<CssBaseline/>
				<Suspense fallback={<h1>Loading...</h1>}>
					<MainHeader/>
				</Suspense>
				<AppRouter/>
			</ThemeProvider>
	)
}

export default App
