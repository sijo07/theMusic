import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';

function App() {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Home />} />
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
