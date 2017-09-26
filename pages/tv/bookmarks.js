import React, { Component } from 'react'
import { Provider } from 'mobx-react'

import { initStore } from '../../mobx/store'
import { setWeb3Instance, getBookmarks } from '../../services/blockChainService'
import Shows from '../../components/shows'
import Nav from '../../components/navigation'

export default class Bookmarks extends Component {
  static getInitialProps({ req }) {
    const isServer = !!req   
    const store = initStore(isServer)
    return {
      isServer
    }
  }

  constructor(props) {
    super(props)
    this.store = initStore(props.isServer)    
  }

  componentDidMount() {   
    setWeb3Instance()
      .then(() => getBookmarks())
      .then(shows => this.store.setBookmarkShows(shows))
  }

  render() {
    return (
      <Provider store={this.store}>
        <div>
          <Nav selected='bookmarks' /> 
          <Shows store={this.store} type='bookmarks' />     
        </div>
      </Provider>
    )
  }
}