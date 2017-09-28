import React, { Component } from 'react'
import { Provider } from 'mobx-react'

import { initStore } from '../../store'
import { setWeb3Instance } from '../../services/blockChainService'
import Shows from '../../components/shows'
import Nav from '../../components/navigation'

export default class Fresh extends Component {
  static async getInitialProps({ req }) {
    const res = await fetch(process.env.BACKEND_URL + '/popular')
    const shows = await res.json()
    const isServer = !!req
    const store = initStore(isServer, shows)

    return { 
      shows,
      isServer
    }
  }

  constructor (props) {
    super(props)
    this.store = initStore(props.isServer, props.shows)
  }

  componentDidMount () {
    setWeb3Instance()    
  }

  render() {
    return (
      <Provider store={this.store}>
        <div>
          <Nav selected='popular' />
          <Shows {...this.props} />
        </div>
      </Provider>         
    )
  }
}