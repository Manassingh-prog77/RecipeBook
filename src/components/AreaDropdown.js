import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'

const AreaDropdown = (props) => {
    const url = `/${props.strArea}`
    
  return (
   <>
    <li><Link className="dropdown-item" to={url}>{props.strArea}</Link></li>
   </>
  )
}

export default AreaDropdown
