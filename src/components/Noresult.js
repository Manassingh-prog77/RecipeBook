import React from 'react'

const Noresult = () => {
    const message = "Currently, We don't have Data for this Recipe we will try to Update as soon as possible"
  return (
    <>
      <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <h1 className="display-4">No Results Found</h1>
        <p className="lead">{message}</p>
      </div>
    </div>
    </>
  )
}

export default Noresult
