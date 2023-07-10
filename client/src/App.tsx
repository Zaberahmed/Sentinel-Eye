import './App.css';
import { Route, Routes } from 'react-router-dom';
import LandingComponent from './components/landing/landing.component';
import LoginComponent from './components/login/login.component';
// import RegisterComponent from './components/register/register.component';
import UserPage from './pages/user.page';
import CommunityComponent from './components/community/community.component';
import ReportComponent from './components/user report/report.component';
import MapContainerComponent from './components/MapContainer/MapContainer.component';
function App() {
	return (
		<Routes>
			<Route
				path="/"
				element={<LandingComponent />}></Route>
			<Route
				path="/login"
				element={<LoginComponent />}></Route>
			{/* <Route
				path="/register"
				element={<RegisterComponent />}></Route> */}

			<Route
				path="user"
				element={<UserPage />}>
				<Route
					index
					element={<CommunityComponent />}></Route>
				<Route
					path="discover"
					element={<MapContainerComponent />}></Route>
				<Route
					path="report"
					element={<ReportComponent />}></Route>
			</Route>
		</Routes>
	);
}

export default App;
