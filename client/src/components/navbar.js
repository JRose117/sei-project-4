
import { Link } from 'react-router-dom'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'

const NavBar = () => {
  return (
    <Navbar expand='md'>
      <Container as='section'>
        <Navbar.Toggle aria-controls='basic-navbar-nav'></Navbar.Toggle>
        <Navbar.Collapse id='basic-navbar-nav' className='justify-content-end'>
          <>
            <Nav.Link as={Link} to='/login'>login</Nav.Link>
            {/* <Nav.Link as={Link} to='/'>homepage</Nav.Link> */}
            <Nav.Link as={Link} to='/discoveries/'>discoveries</Nav.Link>
            <Nav.Link as={Link} to='/register'>register</Nav.Link>
            <Nav.Link as={Link} to='/profile'>profile</Nav.Link>
            <Nav.Link as={Link} to='/AddDiscovery'>AddDiscovery</Nav.Link>
          </>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar