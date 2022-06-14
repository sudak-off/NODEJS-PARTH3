import React from 'react'
import './showWinner.css';

const showWinner = ({ winner }) => {
  const onClose = () => window.location.reload()
  return (
    <div className='modal-layer'>
      <div className='modal-root'>
        <div className='modal-header'>
          <div className='modal-title'>
            {`${winner.name} has won this time`}
          </div>
          <div className='close-btn' onClick={() => onClose()}> × </div>
        </div>
        <div className='modal-description'>
          The game will be reloaded after you close modal window
        </div>
      </div>
    </div>
  )
}

export default showWinner
