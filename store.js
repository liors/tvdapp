import { observable } from 'mobx'
import includes from 'lodash/includes'
import reject from 'lodash/reject'

import { bookmarkContract } from './services/blockChainService'



let store = null

class Store {
  @observable shows = []
  @observable selectedShows = []

  constructor (isServer, shows) {
    this.shows = shows
  }

  set shows(shows) {
    this.shows = shows;
  }

  bookmark(show) {
      if (includes(this.selectedShows, show)) {
        this.selectedShows = reject(this.selectedShows, show)
      } else {
        this.selectedShows.push(show);
        bookmarkContract(show.title)
        .then(data => {debugger})
        .catch(() => {
            console.log('Error finding web3.')
        })
      }    
  }
}

export function initStore (isServer, shows = []) {
    return new Store(isServer, shows)
}