import React from 'react'

const Error = ({ error }) => {
  return (
    <p className='text-red-500 text-sm ml-1'>{error}</p>
  )
}

export default Error