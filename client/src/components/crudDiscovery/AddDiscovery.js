import { useState, useEffect } from 'react'
import axios, { Axios } from 'axios'
import { useNavigate } from 'react-router-dom'
import React from 'react'
import Select from 'react-select'
import { getToken, authUser } from '../auth'

import Container from 'react-bootstrap/Container'
import Cloudinaryimage from '../cloudinaryimage'
import Redirect from '../redirect'

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
      navigate('/discoveries/')
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
    authUser() ?
      <form onSubmit={handleSubmit}>
        <h1>{'Add Discovery'}</h1>
        {/* discName */}
        <div className="discName">
          <label htmlFor='discName'>Name</label>
          <input type='text' name='discName' placeholder='Name' value={formData.discName} onChange={handleChange} />
          {errors.name && <p className='text-danger'>{errors.discName}</p>}
        </div>
        {/* discDesc */}
        <div className="discDesc">
          <label htmlFor='discDesc'>Description</label>
          <textarea name='discDesc' placeholder='Description' value={formData.discDesc} onChange={handleChange}></textarea>
          {errors.discDesc && <p className='text-danger'>{errors.discDesc}</p>}
        </div>
        {/* categories */}
        <div className="discCat">
          <label htmlFor='categories'>Categories</label>
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
        </div>
        {/* discImg */}
        <div className="discIm">
          <p>Upload an Image:</p>
          <Cloudinaryimage
            value={formData.discImage}
            name="image"
            handleImageUpload={handleImageUpload}
          />
        </div>
        {/* {errors.categories && <p className='1-text-danger'>{errors.categories}</p>} */}
        {/* <label htmlFor='image'>Image</label>
        <input type='text' name='image' placeholder='Image' value={formData.discImg} onChange={handleChange} /> */}
        {/* {errors.discImage && <p className='2-text-danger'>{errors.discImage}</p>} */}
        {/* Non field Errors */}
        {/* {errors.message && <p className='3-text-danger'>{errors.message}</p>} */}
        {/* Submit */}
        <div className="input-button"><input type='submit' value={'Add'} className='btn btn-success' /></div>
      </form>
      :
      <Redirect />
  )
}

export default AddDiscovery