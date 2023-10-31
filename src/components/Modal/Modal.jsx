import React, { Component } from 'react'
import { StyledModal } from './Styled';


export default class Modal extends Component {


  componentDidMount() {
    window.addEventListener('keydown',  this.handleKeyDown)
  }
  
  componentWillUnmount() {
        window.removeEventListener('keydown',  this.handleKeyDown)
  }

  handleOverlayClick = event => { 
    if (event.target === event.currentTarget) {
      this.props.closeModal()
    }
  }

  handleKeyDown = (event) => { 
    if (event.code === 'Escape') {
         this.props.closeModal()
    }
  }

  render() {
    return (

       <StyledModal onClick={this.handleOverlayClick}>
          <div className="modal">
            <img src="" alt="" />
          </div>
        </StyledModal>
    )
  }
}
