import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Footer from './components/Footer';
import RecipeList from './components/RecipeList';
import Space from './components/Space';
import Description from './components/Description';
import Search from './components/Search';
import Login from './components/Login';
import SignUp from './components/SignUp';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import RegionPage from './components/RegionPage';
import Noresult from './components/Noresult';
import Alphabetic from './components/Alphabetic';

function App() {
  return (
    <>
    <Router>
    <Navbar />
    <Space />
    <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/recipelist' element={<RecipeList />} />
    <Route path='/description/:id' element={<Description />} />
    <Route path='/SearchKeyword/:query' element={<Search />} />
    <Route path='/Login' element={<Login />} />
    <Route path='/SignUp' element={<SignUp />} />
    <Route path='/region/:region' element={<RegionPage />} />
    <Route path='/Noresult' element={<Noresult />} />
    <Route path='/alphabet' element={<Alphabetic />} />
    </Routes>
    <Footer />
    </Router>
    </>
  );
}

export default App;
