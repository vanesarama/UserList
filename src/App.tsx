import UserList from "./components/UserList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserPosts from "./components/UserPosts"
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/read/:id" element={<UserPosts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
