import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

import { getPayload, getToken, userIsOwner } from '../auth'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

const ReadDiscovery = () => {
  const navigate = useNavigate()

  const { discoveryId } = useParams()

  const [ discovery, setDiscovery ] = useState(null)
  const [ errors, setErrors ] = useState(false)

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`/api/discoveries/${discoveryId}/`)
        setDiscovery(data)
      } catch (err) {
        setErrors(true)
      }
    }
    getData()
  }, [discoveryId])

  const alreadyLiked = async () => {
    try {
      await axios.post('/api/tag/',
        {
          discovery: discovery.id,
          going: true,
        },
        { headers: { Authorization: `Bearer ${getToken()}` } }
      )
      // await getDiscovery()
    } catch (error) {
      console.log(error)
    }
  }

  // ! JSX
  return (
    <Container as="main">
      <Row>
        { discovery ? 
          <>
            <h1>{discovery.discName}</h1>
            <Col md="6">
              <img className='w-100' src={discovery.discImage} alt={discovery.discName} />
            </Col>
            <Col md="6">
              {/* Description */}
              <h2>Description</h2>
              <p>{discovery.discDesc}</p>
              <p>{discovery.comments.length > 0 && discovery.comments[0].text}</p>
              <hr />
              {/* Link back to all discoverys */}
              <Link to="/discoveries/" className='btn dark'>Back to all discovery</Link>
            </Col>
          </>
          :
          <h2 className="text-center">
            { errors ? errors : 'loading' }
          </h2>
        }
      </Row>
    </Container>
  )
}
export default ReadDiscovery