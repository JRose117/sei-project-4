import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

// Import Helpers
import { getPayload, getToken, userIsOwner } from '../auth'

// Import from bootstrap
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

  // ! JSX
  return (
    <Container as="main">
      <Row>
        { discovery ? 
          // If Discovery is truthy, then our API call was successful as data has been added to the Discovery state
          <>
            <h1>{discovery.discName}</h1>
            <Col md="6">
              <img className='w-100' src={discovery.discImage} alt={discovery.discName} />
            </Col>
            <Col md="6">
              {/* Description */}
              <h2>Description</h2>
              <p>{discovery.discDesc}</p>
              <hr />
              {/* Link back to all discoverys */}
              <Link to="/discovery" className='btn dark'>Back to all discovery</Link>
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