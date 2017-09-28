import React, { Component } from 'react'
import { Provider } from 'mobx-react'

import { initStore } from '../../store'
import { setWeb3Instance, getBookmarks } from '../../services/blockChainService'
import Shows from '../../components/shows2'
import Nav from '../../components/navigation'

export default class Fresh extends Component {
  static async getInitialProps({ req }) {
    const isServer = !!req
    const store = initStore(isServer)

    return {
      isServer
    }
  }

  constructor(props) {
    super(props)
    this.store = initStore(props.isServer, props.shows)
  }

  async componentDidMount() {
    const ready = await setWeb3Instance()
    const res = await getBookmarks()
    debugger
    
  }

  render() {
    return (
      <Provider store={this.store}>
        <div>
          <Nav selected='bookmarks' />         
        </div>
      </Provider>
    )
  }
}