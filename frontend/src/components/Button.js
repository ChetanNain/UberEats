import './Button.css';
import React , { Component}  from 'react';
export default function Button(props) {
    return (
        <button type="submit" className={props.color}>{props.children}</button>
    )
}