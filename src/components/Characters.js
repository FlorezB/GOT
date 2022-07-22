import React from 'react'

class Character extends React.Component {
  render() {
    const { name, title, imageUrl, addToFavorites } = this.props

    return (
      <article className='card col-3 p-0'>
        <div
          className='card-img'
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
        <div className='card-body'>
          <h5 className='card-title'>{title}</h5>
          <p className='card-text'>{name}</p>
          {addToFavorites && (
            <button className='btn btn-primary' onClick={addToFavorites}>
              Add to favorites
            </button>
          )}
        </div>
      </article>
    )
  }
}

export default Character