import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const Redirect = () => {
  const navigate = useNavigate()
  useEffect(() => {
    navigate('/login')
  },[])
  return <h1>Loading</h1>
}

export default Redirect