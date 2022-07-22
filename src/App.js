import React from 'react'
import './App.css'

import Character from './components/Character'
import Continents from './components/Continent'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      characters: [],
      continents: [],
      favorites: [],
      currentView: 'favorites'
    }
  }

  async componentDidMount() {
    const request = await fetch('https://thronesapi.com/api/v2/Characters')
    const response = await request.json()

    // /api/v2/Continents
    const requestContinents = await fetch(
      'https://thronesapi.com/api/v2/Continents'
    )
    const responseContinents = await requestContinents.json()

    this.setState({
      characters: response,
      continents: responseContinents
    })
  }

  handleFavoriteClick = character => {
    const { favorites } = this.state

    const existingFavorite = favorites.find(
      favorite => favorite.id === character.id
    )

    if (!existingFavorite) {
      const clonedFavorites = [...favorites, character]

      this.setState({
        favorites: clonedFavorites
      })
    }
  }

  handleCurrentViewChange = tab => {
    this.setState({
      currentView: tab
    })
  }

  render() {
    const { characters, favorites, continents, currentView } = this.state

    return (
      <main className='container'>
        <h1>Game of thrones</h1>

        <button
          onClick={() => this.handleCurrentViewChange('continents')}
          className='btn btn-primary'
        >
          Continents
        </button>
        <button
          onClick={() => this.handleCurrentViewChange('characters')}
          className='btn btn-success'
        >
          Characters
        </button>
        <button
          onClick={() => this.handleCurrentViewChange('favorites')}
          className='btn btn-warning'
        >
          Favorites
        </button>

        {/* Continents */}
        {currentView === 'continents' && (
          <>
            <h2>Continents</h2>
            <section className='row'>
              {continents.map(continent => (
                <Continents name={continent.name} />
              ))}
            </section>
          </>
        )}

        {/* Characters */}
        {currentView === 'characters' && (
          <>
            <h2>Characters</h2>
            <section className='row'>
              {characters.map(character => (
                <Character
                  key={`${character.fullName}${character.id}`}
                  name={character.fullName}
                  title={character.title}
                  imageUrl={character.imageUrl}
                  addToFavorites={() => this.handleFavoriteClick(character)}
                />
              ))}
            </section>
          </>
        )}

        {/* Favorites */}
        {currentView === 'favorites' && (
          <>
            <h2>Favorites</h2>
            <section className='row'>
              {favorites.map(favorite => (
                <Character
                  key={`${favorite.fullName}${favorite.id}`}
                  name={favorite.fullName}
                  title={favorite.title}
                  imageUrl={favorite.imageUrl}
                />
              ))}
            </section>
          </>
        )}
      </main>
    )
  }
}

export default App