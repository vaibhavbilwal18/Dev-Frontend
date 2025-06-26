import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Body from './components/Body';
import Login from './components/Login';
import Profile from './components/Profile';
import Feed from './components/Feed';
import Request from './components/Request';
import Chat from './components/Chat';
import Connections from './components/Connections';
import Premium from './components/Premium';

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Body />} >
          <Route path="/" element={<Feed />} />
          <Route path="login" element={<Login />} />
          <Route path="profile" element={<Profile />} />
          <Route path="connection" element={<Connections/>} />
          <Route path="request" element={<Request />} />
          <Route path="/chat/:targetUserId" element={<Chat/>} />
          <Route path="premium" element={<Premium />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;