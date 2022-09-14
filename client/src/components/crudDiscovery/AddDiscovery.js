import { useState, useEffect } from 'react'
import axios, { Axios } from 'axios'
import { useNavigate } from 'react-router-dom'
import React from 'react'
import Select from 'react-select'
import { getToken } from '../auth'

import Container from 'react-bootstrap/Container'
import Cloudinaryimage from '../cloudinaryimage'

const AddDiscovery = () => {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    discName: '',
    discDesc: '',
    categories: [],
    discImage: '',
  })

  const [errors, setErrors] = useState({
    discName: '',
    discDesc: '',
    categories: [],
    discImage: '',
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
      const { data } = await axios.post('/api/discoveries/', formData, {
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
    console.log(formData)
  }

  const handleImageUpload = (file) => {
    try {
      setFormData({ ...formData, discImage: file })
      console.log(file)
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
      <p>Upload an image:</p>
      <Cloudinaryimage
        value={formData.discImage}
        name="image"
        handleImageUpload={handleImageUpload}
      />
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