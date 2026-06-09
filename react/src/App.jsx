import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './components/Home'
import Profile from './components/Profile'
import Count from './components/Count'

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/count' element={<Count />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App