import {BrowserRouter, Routes, Route, useLocation} from 'react-router';
import HomePage from '@/pages/HomePage';
import PokemonListPage from '@/pages/PokemonListPage';
import PokemonDetailPage from '@/pages/PokemonDetailPage';
import {useLayoutEffect} from "react";

const Wrapper = ({ children } : { children: React.ReactNode }) => {
  const location = useLocation();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname]);

  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Wrapper>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pokemons" element={<PokemonListPage />} />
          <Route path="/pokemons/:id" element={<PokemonDetailPage />} />
        </Routes>
      </Wrapper>
    </BrowserRouter>
  );
}

export default App;
