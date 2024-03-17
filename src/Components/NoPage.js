import React from 'react'

function NoPage() {
    let error={
        alignItems: "center",
        justifyContent: "center",
    };
  return (
    <div>
      <h1 style={error}>Error 404</h1>
      <p>Page Not Found</p>
    </div>
  )
}

export default NoPage
