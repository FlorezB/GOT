import React from 'react'

class App extends React.Component {

  constructor () {
    super () 
    
    this.state = {
      characters: []
    }
  }

	render() {
		return(
			<h1>Game of thrones</h1>
		)
	}
}

export default App