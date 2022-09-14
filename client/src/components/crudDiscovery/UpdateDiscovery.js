import { useState, useEffect } from 'react'
import axios, { Axios } from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import React from 'react'
import Select from 'react-select'
import { getToken, getIdFromUser } from '../auth'

import Container from 'react-bootstrap/Container'

const UpdateDiscovery = () => {

  const { discoveryId } = useParams()

  console.log('discoveryId', discoveryId)

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    discName: '',
    discDesc: '',
    categories: [],
    // image
  })

  const [errors, setErrors] = useState({
    discName: '',
    discDesc: '',
    categories: [],
  })

  const [categoriesMap, setCategoriesMap] = useState([])

  const handleMultiEnter = (categories) => {
    console.log(categories)
    setFormData({ ...formData, categories: categories.map((category) => category.id) })
  }

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get('/api/categories')
      console.log('data - line41', data)
      setCategoriesMap(data)
    }
    getData()
  }, [])

  useEffect(()=>{
    const getDiscoveryData = async () => {
      try {
        const { data } = await axios.get(`/api/discoveries/${discoveryId}/`)
        if (!getIdFromUser(data)) navigate('/')
        setFormData({ ...data, categories: data.categories.map((category) => category.id), discImg: 'sdafdsa.jpeg' })
        console.log('data line 53')
      } catch (err) {
        console.log(err)
        setErrors('failed to auto populated')
      }
    }
    getDiscoveryData()
  },[])

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
    setErrors({ ...errors, [event.target.name]: '', message: '' })
  }

  const handleSubmit = async (event) => {
    console.log(' line 68', formData)
    event.preventDefault()
    try {
      const { data } = await axios.put(`/api/discoveries/${discoveryId}/`, formData, {
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
    <form onSubmit={handleSubmit}>
      <h1>{'Update Discovery'}</h1>
      {errors && <p className='text-danger'>{JSON.stringify(errors.message)}</p>}
      <label htmlFor='discName'>Name</label>
      <input type='text' name='discName' placeholder='Name' value={formData.discName} onChange={handleChange} />
      {errors.name && <p className='text-danger'>{errors.discName}</p>}
      {/* discDesc */}
      <label htmlFor='discDesc'>Description</label>
      <textarea name='discDesc' placeholder='description' value={formData.discDesc} onChange={handleChange}></textarea>
      {errors.discDesc && <p className='text-danger'>{errors.discDesc}</p>}
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
      {/* Image */}
      {/* <div><input type="file" onChange={(event)=>{
        uploadImage(event.target.files)
      }}/></div> */}
      {/* <label htmlFor='image'>Image</label>
      <input type='text' name='image' placeholder='Image' value={formData.image} onChange={handleChange} />
      { errors.image && <p className='text-danger'>{errors.image}</p> } */}
      {/* Non field Errors */}
      {errors.message && <p className='text-danger'>{errors.message}</p>}
      {/* Submit */}
      <input type='submit' value={'addDiscovery'} className='btn dark' />
    </form>
  )
}

export default UpdateDiscovery