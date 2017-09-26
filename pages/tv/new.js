import React, { Component } from 'react'
import { setWeb3Instance } from '../../services/blockChainService'
import Shows from '../../components/shows'
export default class Fresh extends Component {
  static async getInitialProps() {
    const res = await fetch('http://localhost:3020/api/shows/new')
    const shows = await res.json()
    const showsInRow=4
    return { 
      shows,
      showsInRow
    }
  }

  componentDidMount() {
    setWeb3Instance()
  }

  render() {
    return (
      <Shows {...this.props}/>      
    )
  }
}