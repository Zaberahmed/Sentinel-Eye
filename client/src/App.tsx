import './App.css';
import { Route, Routes } from 'react-router-dom';

import LoginComponent from './components/login/login.component';

import UserPage from './pages/user.page';
import CommunityComponent from './components/community/community.component';
import ReportComponent from './components/user report/report.component';
import MapContainerComponent from './components/MapContainer/MapContainer.component';
import { useState } from 'react';
import { SearchResult } from './interfaces/searchResults.interface';
import SplashComponent from './components/splash/splash.componenent';
import auth from './utils/auth';
import RegisterComponent from './components/register/register.component';
import ProfileComponent from './components/Profile/Profile.component';

function App() {
	const [searchResult, setSearchResult] = useState<SearchResult>({
		latitude: -0.1084,
		longitude: 51.5549,
		street: { name: 'On the Pitch - Emirates Stadium, Arsenal Fc' },
	});
	const initialState = auth.isAuthenticated();
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialState);

	return (
		<Routes>
			<Route
				path="/"
				element={<SplashComponent />}></Route>
			<Route
				path="/login"
				element={
					<LoginComponent
						isAuthenticated={isAuthenticated}
						setIsAuthenticated={setIsAuthenticated}
					/>
				}></Route>
			<Route
				path="/register"
				element={
					<RegisterComponent
						isAuthenticated={isAuthenticated}
						setIsAuthenticated={setIsAuthenticated}
					/>
				}></Route>

			<Route
				path="user"
				element={
					<UserPage
						isAuthenticated={isAuthenticated}
						setIsAuthenticated={setIsAuthenticated}
					/>
				}>
				<Route
					index
					element={<CommunityComponent />}></Route>
				<Route
					path="discover"
					element={
						<MapContainerComponent
							searchResult={searchResult}
							setSearchResult={setSearchResult}
						/>
					}></Route>
				<Route
					path="report"
					element={
						<ReportComponent
							searchResult={searchResult}
							setSearchResult={setSearchResult}
						/>
					}></Route>
				<Route
					path="community"
					element={<CommunityComponent />}></Route>
				<Route
					path="profile"
					element={
						<ProfileComponent
							isAuthenticated={isAuthenticated}
							setIsAuthenticated={setIsAuthenticated}
						/>
					}></Route>
			</Route>
		</Routes>
	);
}

export default App;
