import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chat from './pages/Chat';
import Register from "./pages/Register";
import Login from "./pages/Login";
import SetAvatar from "./pages/SetAvatar";
const App = () => {
  return (
	<>
		<BrowserRouter>
			<Routes>
				<Route path='/register' element={<Register/>}/>
				<Route path='/login' element={<Login/>}/>
				<Route path='/set-avatar' element={<SetAvatar/>}/>
				<Route path='/' element={<Chat/>}/>
			</Routes>
		</BrowserRouter>
	</>
  );
}

export default App;
