import { useState } from 'react'
import { Container, FormGroup } from 'react-bootstrap'
import axios from 'axios'

const cloudinaryimage = ({ setData, data }) => {

  const [load, setLoad] = useState(false)

  const UploadImage = async (event) => {
    const files = event.target.files
    const imageData = new FormData()
    imageData.append( 'file', files[0])
    imageData.append('upload_preset', 'kvairrrj')
    setLoad(true)
    const res = await fetch('https://api.cloudinary.com/v1_1/de7a2ht2c/image/upload',
      {
        method: 'POST',
        body: imageData,
      }
    )
    const File = await res.json()
    console.log(File.secure_url)
    setData({ ...data, discImage: File.secure_url })
    setLoad(false)
  }
  return ( <div>
    <Container>
      <h5>Upload image</h5>
      <FormGroup>
        <input type='file' name='file' placeholder='Upload JPEG File' onChange={UploadImage} />
        <br />
        {load ? (<h3>Loading...</h3>) : <img src={data.discImage} style={{ width: '200px' }}/>}
      </FormGroup>
    </Container>
  </div>)
}




export default cloudinaryimage