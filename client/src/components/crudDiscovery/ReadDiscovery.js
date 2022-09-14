import { useCallback, useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

import { getPayload, getToken, userIsOwner, getIdFromUser } from '../auth'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

const ReadDiscovery = () => {
  const navigate = useNavigate()

  const { discoveryId } = useParams()

  const [discovery, setDiscovery] = useState(null)
  const [errors, setErrors] = useState(false)

  // const [newComment, setNewComment] = useState({
  //   text: '',
  // })

  // const [comments, setNewComments] = useState([])

  // const onChangeCommentHandler = (event) => {
  //   setNewComment(event.target.value)
  // }

  // const onClickCommentHandler = (event) => {
  //   setNewComments((comments) => [...comments, newComment])
  // }

  const getDiscovery = useCallback(async () => {
    try {
      const { data } = await axios.get(`/api/discoveries/${discoveryId}/`)
      setDiscovery(data)
    } catch (err) {
      setErrors(true)
    }
  }, [discoveryId])

  useEffect(() => {
    getDiscovery()
  }, [discoveryId])

  const deleteDiscovery = async () => {
    try {
      await axios.delete(`/api/discoveries/${discoveryId}/`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      navigate('/')
    } catch (err) {
      console.log(err)
    }
  }

  const handleTagIt = async () => {
    try {
      await axios.post('/api/tag/',
        {
          discovery: discovery.id,
          tagged: true,
        },
        { headers: { Authorization: `Bearer ${getToken()}` } }
      )
      await getDiscovery()
    } catch (error) {
      console.log(error)
    }
  }

  // const tagged = discovery.filter(tagged => discovery.tag === getIdFromUser )
  // console.log(tagged)
  // ! JSX
  return (
    <Container as="main">
      <Row>
        {discovery ?
          <>
            <h1>{discovery.discName}</h1>
            <Col md="6">
              <img className='w-100' src={discovery.discImg} alt={discovery.discName} />
            </Col>
            <Col md="6">
              {/* Description */}
              <h2>Description</h2>
              <p>{discovery.discDesc}</p>
              <div className="existing-comments">
                {discovery.comments.map((comment) => (
                  <div className="comment-container" key = {comment.id}>{comment.text}</div>
                ))}
              </div>
              {/* <div className='discovery-comments'>
                {disccomments.map((text) => (
                  <div className="comment-container" key = {text}> {text} </div>
                ))}
                <div className="comment-flexbox">
                  <h3 className="comment-text"> Add Comment: </h3>
                  <textarea
                    value={newComment}
                    onChange={onChangeCommentHandler}
                    className="input-box"
                  />
                  <button onClick = {onClickCommentHandler} className = "comment-button">
                    Submit
                  </button>
                </div> 
              </div> */}
              <hr />
              <div className='discovery-categories'>
                {discovery.categories.map((category) => (
                  <h3 key={category.name}>{category.name}</h3>
                ))}
              </div>
              <div className="buttons mb-4">
                {userIsOwner(discovery) &&
                  <div className="buttons mb-4">
                    <Button variant="danger" onClick={deleteDiscovery}>Delete discovery</Button>
                    <Link to={`/discoveries/${discoveryId}/edit`} className='btn btn-primary'>Edit Discovery</Link>
                  </div>
                }
              </div>
              <div className="buttons mb-6">
                <form>
                  <label htmlFor="Comment"> Add A Comment </label>
                  <textarea name="Comment" placeholder='add a comment' value=''></textarea>
                  <input type="submit" value='+' className="btn"></input>
                </form>
              </div>
              {/* Link back to all discoverys */}
              <Link to="/discoveries/" className='btn dark'>Back to all discovery</Link>
            </Col>
          </>
          :
          <h2 className="text-center">
            {errors ? errors : 'loading'}
          </h2>
        }
      </Row>
    </Container>
  )
}
export default ReadDiscovery