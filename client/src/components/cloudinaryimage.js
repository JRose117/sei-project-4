import React from 'react'
import axios from 'axios'

const Cloudinaryimage = ({ value, name, handleImageUpload }) => {

  const handleChange = async (event) => {
    const formData = new FormData()
    formData.append('file', event.target.files[0])
    formData.append('upload_preset', 'kvairrrj')
    const { data } = await axios.post('https://api.cloudinary.com/v1_1/dymtwz83p/image/upload', formData)
    handleImageUpload(data.url)
  }

  return (
    <>

      <input type="file" name={name} id="discImage" className="input" onChange={handleChange} />
    </>
  )

}

export default Cloudinaryimage