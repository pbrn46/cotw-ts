import React from 'react'
import Main from './components/Main'
import './App.css'
import { Provider } from 'react-redux'
import store from './redux/store'

function App() {
  return <div className="App">
    <Provider store={store}>
      <Main />
    </Provider>
  </div>
}

export default App
