import { BrowserRouter, Routes, Route } from 'react-router'
import HomePage from '@/pages/HomePage'
import PokemonListPage from '@/pages/PokemonListPage'
import PokemonDetailPage from '@/pages/PokemonDetailPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pokemons" element={<PokemonListPage />} />
        <Route path="/pokemons/:id" element={<PokemonDetailPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
