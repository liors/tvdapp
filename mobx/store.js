import { observable } from 'mobx'
import includes from 'lodash/includes'
import reject from 'lodash/reject'
import isEmpty from 'lodash/isEmpty'
import { bookmarkContract } from '../services/blockChainService'

let store = null

class Store {
  @observable shows = []
  @observable selectedShows = []

  constructor (isServer, shows) {
    this.shows = shows
  }

  setBookmarkShows(shows) {
    console.log('setBookmarkShows')
    if (isEmpty(this.shows)) {
      this.shows = shows  
    }
    this.selectedShows = shows
  }

  set selectedShows(shows) {
    this.selectedShows = shows
  }

  bookmark(show) {
      if (includes(this.selectedShows, show)) {
        this.selectedShows = reject(this.selectedShows, show)
      } else {
        this.selectedShows.push(show)
        bookmarkContract(show)
        .then(data => {debugger})
        .catch(e => {
          debugger
            console.log('Error finding web3.')
        })
      }    
  }
}

export function initStore (isServer, shows = []) {
    return new Store(isServer, shows)
}