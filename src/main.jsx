import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Outlet, Link } from 'react-router-dom';
import { NavBar } from './components/Nav/NavBar.jsx';
import { Footer } from './components/Footer/Footer.jsx';
import { Home } from './pages/home/Home.jsx';
import { Movies } from './pages/movies/Movies';
import { Series } from './pages/series/Series';
import { Genres } from './pages/genres/Genres';
import { Details } from './pages/details/Details';

const Layout = () => {
  return (
    <>
      <NavBar></NavBar>
      <Outlet />
      <Footer></Footer>
    </>
  );
}

export default Layout;

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/series" element={<Series />} />
        <Route path="/genres" element={<Genres />} />
        <Route path="/movies/details/:id" element={<Details />} />
        <Route path="/series/details/:id" element={<Details />} />
      </Route>
    </Routes>
  </BrowserRouter>
);