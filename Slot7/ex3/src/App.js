import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';

import Banner from './components/Banner';
import Navbar from './components/Navbar';
import Grid from './components/Grid';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <div className="container mt-4">
        <Banner />
        <Navbar/>
        <Grid />
        <Footer />
      </div>
    </div>
  );
}

export default App;
