import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./components/Home";
import Anonymous from './components/Anonymous1';
import ShowPosts from './components/ShowPosts';
import Therapist from './components/Therapist';
import Quiz from './components/Quiz';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/anonymous" element={<Anonymous />} />
        <Route path="/show-posts" element={<ShowPosts />} />
        <Route path="/therapist" element={<Therapist />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </Router>
  );
}

export default App;
