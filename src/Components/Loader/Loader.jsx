import React from 'react'

export default function Loader() {
    const loaderStyle = {backgroundColor:'black',position:'fixed',width:'100vw',height:'100vw',opacity:'0.3',zIndex:'99'}
  return (
    <div className='Loader' style={loaderStyle}>Loader</div>
  )
}
