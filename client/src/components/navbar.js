
import { Link, useNavigate } from 'react-router-dom'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import { authUser } from './auth'



const NavBar = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    window.localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <Navbar expand='md'>
      <Container as='section'>
        <Navbar.Toggle aria-controls='basic-navbar-nav'></Navbar.Toggle>
        <Navbar.Collapse id='basic-navbar-nav' className='justify-content-end'>
          <Nav.Link as={Link} to='/discoveries/'> Discoveries </Nav.Link>
          {authUser()
            ?
            <>
              <Nav.Link as={Link} to='/AddDiscovery'> Add </Nav.Link>
              <span onClick={handleLogout}> Logout </span>
            </>
            :
            <>
              <Nav.Link as={Link} to='/register'> Register </Nav.Link>
              <Nav.Link as={Link} to='/login'> Login </Nav.Link>
            </>
          }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar