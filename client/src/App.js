import { useEffect } from 'react'
import axios from 'axios'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Discoveries from './components/discoveries'
import Homepage from './components/homepage'
import Login from './components/login'
import Register from './components/register'
import Profile from './components/profile'
import NavBar from './components/navbar'
import DiscoverySingle from './components/DiscoverySingle'

const App = () => {
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get('/api/discoveries/') // * <-- replace with your endpoint
      console.log(data)
    }
    getData()
  })

  return (
    <>
      <div className="site-wrapper">
        <BrowserRouter>
          <NavBar/>
          <Routes>
            {/* <Route path="/" element={<Homepage />} /> */}
            <Route path="/discoveries/" element={<Discoveries></Discoveries>}></Route>
            <Route path="/discoveries/:discoveryId" element={<DiscoverySingle />} />
            <Route path="/login" element={<Login></Login>}></Route>
            <Route path="/register" element={<Register></Register>}></Route>
            <Route path="/profile" element={<Profile></Profile>}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )

}

export default App
