import { useEffect } from 'react'
import axios from 'axios'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Discoveries from './components/discoveries'
import Homepage from './components/homepage'
import Login from './components/login'
import Register from './components/register'
import NavBar from './components/navbar'
import AddDiscovery from './components/crudDiscovery/AddDiscovery'
import ReadDiscovery from './components/crudDiscovery/ReadDiscovery'
import UpdateDiscovery from './components/crudDiscovery/UpdateDiscovery'
import NotFound from './components/NotFound'
import Profile from './components/profile'

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
            <Route path="/discoveries/:discoveryId/" element={<ReadDiscovery />} />
            <Route path="/discoveries/:discoveryId/edit" element={<UpdateDiscovery />} />
            <Route path="/login" element={<Login></Login>}></Route>
            <Route path="/profile/:profileId" element={<Profile></Profile>}></Route>
            <Route path="/register" element={<Register></Register>}></Route>
            <Route path="/AddDiscovery" element={<AddDiscovery></AddDiscovery>}></Route>
            <Route path="/*" element={<NotFound></NotFound>}></Route>
            <Route path="/" element={<Homepage></Homepage>}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )

}

export default App
