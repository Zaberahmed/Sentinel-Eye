import './App.css';
import { Route, Routes } from 'react-router-dom';
import LandingComponent from './components/landing/landing.component';
import LoginComponent from './components/login/login.component';
import RegisterComponent from './components/register/register.component';
import MapComponent from './components/Map/Map.component';
function App() {
	return (
		<Routes>
			<Route
				path="/"
				element={<MapComponent />}></Route>
			<Route
				path="/login"
				element={<LoginComponent />}></Route>
			<Route
				path="/register"
				element={<RegisterComponent />}></Route>
		</Routes>
	);
}

export default App;
