import { Component } from 'react'

import { initStore } from '../../mobx/store'
import Page from '../../components/page'

export default class Popular extends Component {
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

  render() {
    return (
      <Page type='popular' store={this.store}/>        
    )
  }
}