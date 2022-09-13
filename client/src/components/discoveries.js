import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

const Discoveries = () => {
  const [discoveries, setDiscoveries] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/discoveries/')
        setDiscoveries(data)
      } catch (error) {
        setError(true)
      }
    }
    getData()
  }, [setDiscoveries])
  return (
    <Container as="main" className='discovery-index text-center'>
      <h1 className='text-center mb-4'>discovery</h1>
      <Row>
        {discoveries.length > 0
          ?
          discoveries.map(discovery => {
            const { id, discName, discDesc, discImage } = discovery
            console.log(discovery)
            return (
              <Col key={id} md="6" lg="4" className='mb-4'>
                <Link to={`/discoveries/${id}/`}>
                  <Card>
                    <Card.Img variant='top' src={discImage}></Card.Img>
                    <Card.Body className='bg-light'>
                      <Card.Title className='text-center mb-0'>{discName} - {discDesc} - {discImage} </Card.Title>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            )
          })
          :
          <>
            {error ? <h2>Something went wrong. Please try again later</h2> : <h2> Loading </h2> }
          </>
        }
      </Row>
    </Container>
  )
}

export default Discoveries