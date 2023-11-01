import React, { Component } from 'react';

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
    // document.body.style.overflow = 'hidden';
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
    // document.body.style.overflow = 'auto';
  }

  handleOverlayClick = event => {
    if (event.target === event.currentTarget) {
      this.props.closeModal();
    }
  };

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.closeModal();
    }
  };

  render() {
    const { modalData } = this.props;

    return (
      <div onClick={this.handleOverlayClick} className="modal-overlay">
        <div className="modal">
          <img
            src={modalData.largeImageURL}
            alt={modalData.tags}
            className="modal-image"
          />
        </div>
      </div>
    );
  }
}
