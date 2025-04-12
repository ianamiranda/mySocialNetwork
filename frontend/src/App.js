import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Profile from './components/Profile';
import ProfileEdit from './components/ProfileEdit';
import SearchUsers from './components/SearchUsers';
import Friends from './components/Friends';
import Messages from './components/Messages';
import MessageDetail from './components/MessageDetail';
import Notifications from './components/Notifications';
import EventList from './components/EventList';
import EventDetail from './components/EventDetail';
import EventCreate from './components/EventCreate';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar /> {/* Global navigation */}
      <Routes>
        {/* Authentication Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} /> {/* Implement logout functionality */}
        
        {/* Profile Routes */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/edit" element={<ProfileEdit />} />

        {/* Home Feed Routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/post/create" element={<CreatePost />} />
        <Route path="/post/:postId" element={<PostDetail />} />
        
        {/* User/Friends Routes */}
        <Route path="/search/users" element={<SearchUsers />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/friends/add/:userId" element={<AddFriend />} />
        <Route path="/friends/remove/:userId" element={<RemoveFriend />} />
        
        {/* Messaging Routes */}
        <Route path="/messages" element={<Messages />} />
        <Route path="/messages/:conversationId" element={<MessageDetail />} />
        <Route path="/messages/create" element={<CreateMessage />} />

        {/* Notifications Routes */}
        <Route path="/notifications" element={<Notifications />} />

        {/* Event Routes */}
        <Route path="/events" element={<EventList />} />
        <Route path="/event/:eventId" element={<EventDetail />} />
        <Route path="/event/create" element={<EventCreate />} />

        {/* Fallback for unknown routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
