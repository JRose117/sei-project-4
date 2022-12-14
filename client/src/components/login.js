// Import Hooks
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
// Import React Bootstrap
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

// Import Axios

// Import Helpers
// import { setToken } from '../helpers/auth'

const Login = () => {

  const navigate = useNavigate()

  const [userData, setUserData] = useState({
    username: '', 
    password: '',
  })
  const [errorMessage, setErrorMessage] = useState('')

  const handleFieldChange = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const { data } = await axios.post('/api/auth/login/', userData)
      const { token } = data
      window.localStorage.setItem('token', token)
      window.localStorage.setItem('username', userData.username)
      console.log('worked')
      navigate('/discoveries')
    } catch (error) {
      console.log(error.response.data.detail)
      setErrorMessage(error.response.data.detail)
    }
  }

  console.log(errorMessage)

  return (
    <main className='formPage'>
      <Container>
        <Row className="form-container">
          <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <input type="text" name="email" placeholder="Your email" value={userData.email} onChange={handleFieldChange}/>
            <input type="password" name="password" placeholder="Your password" value={userData.password} onChange={handleFieldChange} />
            <input type="submit" value="Login" className='btn w-100'/>
            { errorMessage && <p>{errorMessage}</p>}
          </form>
        </Row>
      </Container>
    </main>
  )

}

export default Login