import { HashRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import ProtectedRoutes from './components/ProtectedRoutes'
import Pokedex from './components/Pokedex'
import Pokemon from './components/Pokemon'
import pokedexLogo from './assets/pokedexLogo.svg'

import './App.css'


function App() {

  return (
    <HashRouter>
      <div>
        <header>
          <div className='header-main'>
            <div className='header-bottom'></div>
            <div className='header-circle'>
              <div className='circle-center'></div>
            </div>
            <img src={pokedexLogo} alt='Logo Image' />
          </div>
        </header>
        <main className='app-main'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route element={<ProtectedRoutes />}>
              <Route path='/pokedex' element={<Pokedex />} />
              <Route path='/pokedex/:id' element={<Pokemon />} />
            </Route>
          </Routes>
        </main>
        <footer>
          <div className='footer-bottom'>
            Developed by Samael Vazquez Aguilar (<span>
              <a href="https://www.linkedin.com/in/samaelvag/">SamaelVAg</a>
            </span>) on Academlo's Full Stack Web Bootcamp
          </div>
        </footer>
      </div>
    </HashRouter>
  )
}

export default App
