import { useState, useEffect } from 'react'
import axios, { Axios } from 'axios'
import { useNavigate } from 'react-router-dom'
import React from 'react'
import Select from 'react-select'
import { getToken } from '../auth'
import cloudinaryimage from '../cloudinaryimage'

import Container from 'react-bootstrap/Container'

const AddDiscovery = () => {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    discName: '',
    discDesc: '',
    categories: [],
    discImg: '',
  })

  const [errors, setErrors] = useState({
    discName: '',
    discDesc: '',
    categories: [],
    discImg: '',
  })

  const [categoriesMap, setCategoriesMap] = useState([])

  const handleMultiEnter = (categories) => {
    console.log(categories)
    setFormData({ ...formData, categories: categories.map((category) => category.id) })
  }

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get('/api/categories/')
      console.log('data - line32', data)
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
    } catch (err) {
      console.log(err.response.data)
      setErrors(err.response.data)
    }
  }

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
    setErrors({ ...errors, [event.target.name]: '', message: '' })
    console.log(formData)
  }

  const handleUploadImage = (file) => {
    try {
      setFormData({ ...formData, discImg: file })
    } catch (error) {
      if (error.response.data.errors) setErrors(error.response.data.errors)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>{'Add Discovery'}</h1>
      {errors && <p className='text-danger'>{JSON.stringify(errors.message)}</p>}
      <label htmlFor='discName'>Name</label>
      <input type='text' name='discName' placeholder='Name' value={formData.discName} onChange={handleChange} />
      {errors.name && <p className='text-danger'>{errors.discName}</p>}
      {/* discDesc */}
      <label htmlFor='discDesc'>Description</label>
      <textarea name='discDesc' placeholder='description' value={formData.discDesc} onChange={handleChange}></textarea>
      {errors.discDesc && <p className='text-danger'>{errors.discDesc}</p>}
      {/* discImg */}
      {/* <label htmlFor='discImg'>Image</label> */}
      {/* <cloudinaryimage value={formData.discImg} name="discImg" onChange={handleUploadImage} />
      {errors.discImg && <p className='text-danger'>{errors.discImg}</p>} */}
      {/* categories */}
      <label htmlFor='categories'>categories</label>
      <Select
        options={categoriesMap.map((category) => ({
          id: category.id,
          value: category.id,
          label: category.name,
        }))}
        isMulti
        name="categories"
        onChange={handleMultiEnter}
      />
      {errors.categories && <p className='text-danger'>{errors.categories}</p>}
   
      {/* <label htmlFor='image'>Image</label>
      <input type='text' name='image' placeholder='Image' value={formData.discImg} onChange={handleChange} /> */}
      { errors.discImg && <p className='text-danger'>{errors.discImg}</p> }
      {/* Non field Errors */}
      {errors.message && <p className='text-danger'>{errors.message}</p>}
      {/* Submit */}
      <input type='submit' value={'addDiscovery'} className='btn dark' />
    </form>
  )
}

export default AddDiscovery