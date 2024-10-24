import React from 'react'
import './AddButton.css'
export default function AddButton(props) {
  return (
    <button className="add-btn sm-font regular-font" onClick={props.onClick}>
        <i className="ti ti-square-rounded-plus me-2"></i>
        {props.title}
    </button>
  )
}
