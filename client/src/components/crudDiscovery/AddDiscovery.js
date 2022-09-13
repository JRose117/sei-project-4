import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import { getToken } from '../auth'

import Container from 'react-bootstrap/Container'
import DiscoveryForm from './DiscoveryForm'

const AddDiscovery = () => {

  const navigate = useNavigate()

  const [ formData, setFormData ] = useState({
    'discName': '',
    'discDesc': '',
    'categories': [],
    // image
  })
  
  const [ errors, setErrors ] = useState({
    discName: '',
    discDesc: '',
    categories: [],
    // image
  })

  const handleSubmit = async (event) => {
    console.log(formData)
    event.preventDefault()
    try {
      const { data } = await axios.post('api/discoveries/', formData, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      console.log(data)
      navigate('/profile/')
      // navigate(`/discovery/${data._id}`)
    } catch (err) {
      console.log(err.response.data)
      setErrors(err.response.data)
    }
  }

  return (
    <main className="form-page">
      <Container>
        <DiscoveryForm
          errors={errors}
          setErrors={setErrors}
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          title="Add "
        />
      </Container>
    </main>
  )
}

export default AddDiscovery