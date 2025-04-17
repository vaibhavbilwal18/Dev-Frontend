import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../utils/constants'
import { addFeed } from '../utils/feedSlice'
import UserCard from '../components/UserCard'

const Feed = () => {
  const feed = useSelector((state) => state.feed)
  const dispatch = useDispatch()

  const getFeed = async () => {
    if(feed) return
    try {
      const response = await axios.get(BASE_URL + '/feed', {
        withCredentials: true
      })
      dispatch(addFeed(response.data))
    } catch(err) {
      console.error("Error fetching feed:", err)
    }
  }

  useEffect(() => {
    getFeed()
  }, []) ;
  if(!feed) {
    return;
  }

  if(feed.length <= 0){
    return <h1 className='flex justify-center my-10 bold'>No feed available..!!</h1>;
  }

  return (
    feed && (<div className='flex flex-col items-center justify-center my-10'>
      <UserCard user = {feed[0]} /> 
    </div>)
  )
}

export default Feed;