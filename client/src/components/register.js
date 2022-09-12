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
    user_tags: [],
  })
  const [error, setError ] = useState('')

  const handleChange = (event) => {
    const newObj = { ...formData, [event.target.name]: event.target.value, user_tags: [] }
    setFormData(newObj)
    setError('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const { data } = await axios.post('/api/auth/register/', formData)
      navigate('/login')
      // console.log('should navigate to log in')
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <main className='formPage'>
      <Container>
        <Row className="form-container">
          <form onSubmit={handleSubmit}>
            <h1>Register</h1>
            {/* Username */}
            <label htmlFor="username">Username</label>
            <input onChange={handleChange} type="text" name="username" placeholder="Username" value={formData.username} />
            {/* Email */}
            <label htmlFor="email">Email</label>
            <input onChange={handleChange} type="email" name="email" placeholder='Email' value={formData.email} />
            {/* Password */}
            <label htmlFor="password">Password</label>
            <input onChange={handleChange} type="password" name="password" placeholder='Password' value={formData.password} />
            {/* Password Confirmation */}
            <label htmlFor="password_confirmation">Confirm Password</label>
            <input onChange={handleChange} type="password" name="password_confirmation" placeholder='Confirm Password' value={formData.confirmedPassword} />
            {/* Error Message */}
            { error && <p>{error}</p>}
            {/* Submit */}
            <input type="submit" value="Register" className='btn w-100'/>
          </form>
        </Row>
      </Container>
    </main>
  )
}





export default Register