import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import Discover from './pages/Discover';
import Library from './pages/Library';
import PlaylistDetails from './pages/PlaylistDetails';

function App() {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/discover" element={<Discover />} />
                <Route path="/library" element={<Library />} />
                <Route path="/playlist/:id" element={<PlaylistDetails />} />
                {/* We will add other routes later */}
                {/* <Route path="/albums" element={<Albums />} /> */}
                {/* <Route path="/events" element={<Events />} /> */}
                {/* <Route path="/blog" element={<Blog />} /> */}
                {/* <Route path="/contact" element={<Contact />} /> */}
                {/* <Route path="/login" element={<Login />} /> */}
                {/* <Route path="/elements" element={<Elements />} /> */}
            </Routes>
        </Layout>
    );
}

export default App;
