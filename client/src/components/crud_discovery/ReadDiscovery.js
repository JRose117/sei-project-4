import { useCallback, useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

import { getPayload, getToken, userIsOwner, authUser, getIdFromUser } from '../auth'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

const ReadDiscovery = () => {
  const navigate = useNavigate()

  const { discoveryId } = useParams()

  const [discovery, setDiscovery] = useState(null)
  const [errors, setErrors] = useState(false)

  const [formData, setFormData] = useState({
    text: '',
  })

  const handleCommentSubmit = async (event) => {
    console.log(formData)
    try {
      const { data } = await axios.post('/api/comments/', formData, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
    } catch (err) {
      console.log(err.response.data)
      setErrors(err.response.data)
    }
  }

  const handleCommentChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value, discovery: parseInt(discoveryId) })
    console.log(formData)
  }

  const getDiscovery = useCallback(async () => {
    try {
      const { data } = await axios.get(`/api/discoveries/${discoveryId}/`)
      setDiscovery(data)
      console.log(data)
    } catch (err) {
      setErrors(true)
    }
  })

  useEffect(() => {
    getDiscovery()
  }, [])

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
      await axios.post('/api/tags/',
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


  const removeComment = async (event) => {
    console.log(typeof event.target.name)
    console.log(typeof `/api/comments/${event.target.value}/`)
    try {
      await axios.delete(`/api/comments/${event.target.value}/`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      getDiscovery()
    } catch (err) {
      console.log(err)
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
            {/* Link back to all discoverys */}
            <div className="readImage">
              <img src={discovery.discImage} alt={discovery.discName} />
            </div>
            <h1>{discovery.discName}</h1>
            <div className="readDesc">
              {/* Description */}
              <p>{discovery.discDesc}</p>
            </div>
            <div className="existing-comments">
              {discovery.comments.map((comment) => (
                <div className="comment-container" key={comment.id}>
                  <div className="comment-text">{comment.text}</div>
                  <div className="comment-by">{comment.created_at}</div>
                  {console.log(comment)}
                  <div className="comment-by"> <span> Click </span> <Link to={`/profile/${comment.owner.id}`}> here </Link> to reveal the user who left this comment</div>
                  {userIsOwner(comment) &&
                    <div className="comment-delete">
                      <label htmlFor="Comment-delete"></label>
                      <button className="btn btn-light" value={comment.id} name="delete" onClick={removeComment}>delete</button>
                    </div>
                  }
                </div>
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
            < hr />
            <div className='readCategories'>
              {discovery.categories.map((category) => (
                <div className="readCategorySingle" key={category.name}>{category.name}</div>
              ))}
            </div>
            <div className="buttons mb-4">
              {userIsOwner(discovery) &&
                <div className="buttons mb-4">
                  <Button variant="danger" onClick={deleteDiscovery}>Delete discovery</Button>
                  <Link to={`/discoveries/${discoveryId}/edit`} className='btn btn-success'>Edit Discovery</Link>
                </div>
              }
            </div>
            {authUser()
              &&
              <div className="buttons mb-6">
                <form className="comment-form" onSubmit={handleCommentSubmit}>
                  <label htmlFor="Comment">Comment</label>
                  <textarea name="text" placeholder="Comment" value={formData.text} onChange={handleCommentChange}></textarea>
                  <input type="submit" value="add comment"className="btn btn-light"></input>
                </form>
              </div>
            }
            {authUser()
                &&
                <div className="buttons mb-6">
                  <form className="comment-form" onSubmit={handleTagIt}>
                    <label htmlFor="tag"></label>
                    <input type="submit" className="btn"  value="tag"></input>
                  </form>
                </div>
            }
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