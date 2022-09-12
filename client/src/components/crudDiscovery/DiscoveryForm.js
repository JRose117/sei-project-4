const DiscoveryForm = ({ errors, setErrors, formData, setFormData, handleSubmit, title, singleError }) => {

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
    setErrors({ ...errors, [event.target.name]: '', message: '' })
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>{title}</h1>
      {/* Population error */}
      { singleError && <p className='text-danger'>{singleError}</p>}
      {/* Name */}
      <label htmlFor='discName'>Name</label>
      <input type='text' name='discName' placeholder='Name' value={formData.discName} onChange={handleChange} />
      { errors.name && <p className='text-danger'>{errors.discName}</p> }
      {/* discDesc */}
      <label htmlFor='discDesc'>Description</label>
      <textarea name='discDesc' placeholder='description' value={formData.discDesc} onChange={handleChange}></textarea>
      { errors.discDesc && <p className='text-danger'>{errors.discDesc}</p> }
      categories
      <label htmlFor='categories'>categories</label>
      <textarea name='categories' placeholder='categories' value={formData.categories} onChange={handleChange}></textarea>
      { errors.categories && <p className='text-danger'>{errors.categories}</p> }
      {/* tags */}
      <label htmlFor='tags'>tags</label>
      <textarea name='tags' placeholder='tags' value={formData.tags} onChange={handleChange}></textarea>
      { errors.tags && <p className='text-danger'>{errors.tags}</p> }
      {/* owner */}
      <label htmlFor='owner'>owner</label>
      <textarea name='owner' placeholder='owner' value={formData.owner} onChange={handleChange}></textarea>
      { errors.owner && <p className='text-danger'>{errors.owner}</p> }
      {/* Image */}
      {/* <label htmlFor='image'>Image</label>
      <input type='text' name='image' placeholder='Image' value={formData.image} onChange={handleChange} />
      { errors.image && <p className='text-danger'>{errors.image}</p> } */}
      {/* Non field Errors */}
      { errors.message && <p className='text-danger'>{errors.message}</p> }
      {/* Submit */}
      <input type='submit' value={title} className='btn dark' />
    </form>
  )
}

export default DiscoveryForm