import React, { useState, useEffect } from 'react'
import { getToken, getIdFromUser } from '../components/auth'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom'

const Profile = () => {
  const [profile, setProfile] = useState({})
  const [error, setError] = useState(false)
  const { profileId } = useParams()

  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data } = await axios.get(`/api/auth/profile/${profileId}`)
        setProfile(data)
      } catch (error) {
        setError(true)
      }
    }
    getProfile()
  }, [])
  return (
    <div className="profile">
      {profile ? (<p>User with Username {profile.username} left this comment</p>) : 
        <>{error ? <h2>Oops something went wrong.</h2> : <h2>Loading...</h2>}</>}
    </div>
  )
}

export default Profile