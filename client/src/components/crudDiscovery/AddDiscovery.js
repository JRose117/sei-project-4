import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import { getToken } from '../auth'

import Container from 'react-bootstrap/Container'
import DiscoveryForm from './DiscoveryForm'

const AddDiscovery = () => {

  const navigate = useNavigate()
  const [ formData, setFormData ] = useState({
    discName: '',
    discDesc: '',
    categories: [],
    // image
  })
  
  const [ errors, setErrors ] = useState({
    discName: '',
    discDesc: '',
    categories: [],
    // image
  })

  const [ categoriesMap, setCategoriesMap ] = useState([])

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get('/api/categories/')
      setCategoriesMap(data)
    }
    getData()
  }, [])

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

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
    setErrors({ ...errors, [event.target.name]: '', message: '' })
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>{'AddDiscovery'}</h1>
      {/* Population error */}
      { errors && <p className='text-danger'>{errors}</p>}
      {/* Name */}
      <label htmlFor='discName'>Name</label>
      <input type='text' name='discName' placeholder='Name' value={formData.discName} onChange={handleChange} />
      { errors.name && <p className='text-danger'>{errors.discName}</p> }
      {/* discDesc */}
      <label htmlFor='discDesc'>Description</label>
      <textarea name='discDesc' placeholder='description' value={formData.discDesc} onChange={handleChange}></textarea>
      { errors.discDesc && <p className='text-danger'>{errors.discDesc}</p> }
      {/* categories */}
      <label htmlFor='categories'>categories</label>
      {categoriesMap.map((option)=> (
        <p key={option.id}>{option.name}</p> 
      ))}
      <textarea name='categories' placeholder='categories' value={formData.categories} onChange={handleChange}></textarea>
      { errors.categories && <p className='text-danger'>{errors.categories}</p> }
      {/* Image */}
      {/* <label htmlFor='image'>Image</label>
      <input type='text' name='image' placeholder='Image' value={formData.image} onChange={handleChange} />
      { errors.image && <p className='text-danger'>{errors.image}</p> } */}
      {/* Non field Errors */}
      { errors.message && <p className='text-danger'>{errors.message}</p> }
      {/* Submit */}
      <input type='submit' value={'addDiscovery'} className='btn dark' />
    </form>
  )
}

export default AddDiscovery