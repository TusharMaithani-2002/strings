import React from 'react'
import { Audio } from 'react-loader-spinner'

const Loading = () => {
  return (
    <div className='h-screen opacity-50 bg-black'>
      <Audio 
      height="100"
      width="100"
      color="red"
      ariaLabel='loading'
      />
    </div>
  )
}

export default Loading
