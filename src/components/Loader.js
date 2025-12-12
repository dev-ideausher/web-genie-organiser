import React from 'react'

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4a4bda] mx-auto mb-4"></div>
        <p className="text-xl font-medium text-[#4a4bda] capitalize">
            Loading ...
        </p>
    </div>
  </div>
  )
}

export default Loader