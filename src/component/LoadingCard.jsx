import React from 'react'

const LoadingCard = () => {
  return (
<div
          
                className="w-56 h-70 flex-shrink-0 flex flex-col gap-3 animate-pulse p-2 rounded border border-gray-200"
              >
                <div className="bg-gray-200 w-full h-40 rounded-lg"></div>
                <div className="bg-gray-200 w-3/4 h-5 rounded"></div>
                <div className="bg-gray-200 w-1/3 h-4 rounded"></div>
                <div className="flex justify-between gap-2 mt-2">
                  <div className="bg-gray-200 w-full h-8 rounded-md"></div>
                  <div className="bg-gray-200 w-full h-8 rounded-md"></div>
                </div>
              </div>
  )
}

export default LoadingCard