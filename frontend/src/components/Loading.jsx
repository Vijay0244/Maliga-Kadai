import React from 'react'
import { Loader2 } from 'lucide-react'

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-64">
        <Loader2 className='animate-spin text-blue-500 size-6' />
    </div>
  )
}

export default Loading