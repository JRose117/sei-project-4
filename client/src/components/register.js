import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

// Import React Bootstrap 
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'


const Register = () => {
  
  const navigate = useNavigate()

  const [ formData, setFormData ] = useState({
    email: '',
    username: '',
    password: '',
    password_confirmation: '',
  })
  const [error, setError ] = useState('')

  const handleChange = (event) => {
    const newObj = { ...formData, [event.target.name]: event.target.value }
    setFormData(newObj)
    setError('')
  }


  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const { data } = await axios.post('/api/auth/register/', formData)
      navigate('/login/')
    } catch (error) {
      console.log(error.response.data)
      setError(error.response.data)
    }
  }
  
  return (
    <main className='formPage'>
      <Container>
        <Row className="form-container">
          <form onSubmit={handleSubmit}>
            <h1>Register</h1>
            {/* username */}
            <label htmlFor="username">Username</label>
            <input onChange={handleChange} type="text" name="username" placeholder="Username" value={formData.username} />
            { error.username && <p>{error.username[0]}</p>}
            {/* Email */}
            <label htmlFor="email">Email</label>
            <input onChange={handleChange} type="email" name="email" placeholder='Email' value={formData.email} />
            { error.email && <p>{error.email[0]}</p>}
            {/* Password */}
            <label htmlFor="password">Password</label>
            <input onChange={handleChange} type="password" name="password" placeholder='Password' value={formData.password} />
            { error.password && <p>{error.password[0]}</p>}
            {/* Password Confirmation */}
            <label htmlFor="password_confirmation">Confirm Password</label>
            <input onChange={handleChange} type="password" name="password_confirmation" placeholder='Confirm Password' value={formData.confirmedPassword} />
            { error.password_confirmation && <p>{error.password_confirmation[0]}</p>}
            {/* Error Message */}
            {/* Submit */}
            <input type="submit" value="Register" className='btn w-100'/>
          </form>
        </Row>
      </Container>
    </main>
  )
}





export default Register