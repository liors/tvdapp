import { observable, action, toJS } from 'mobx'
import some from 'lodash/some'
import reject from 'lodash/reject'

import { bookmarkContract, rejectBookmarkContract } from '../services/blockChainService'

let store = null
const ADD_ACTION = 'add'
const ADD_MESSAGE = 'Saved on the blockchain.'
const REMOVE_MESSAGE = 'Removed for the blockchain.'
const REMOVE_ACTION = 'remove'

class Store {
  @observable shows = []
  @observable bookmarkedShows = []
  @observable bookmarkNotificationIsOn = false
  @observable currentAction = undefined

  constructor(isServer, shows) {
    this.shows = shows
  }

  @action
  setBookmarkShows(shows) {
    this.bookmarkedShows = shows   
  }
  
  @action
  hideBookmarkNotification () {
    this.bookmarkNotificationIsOn = false
  }

  getMessage () {
    return this.actionToMessage()
  }

  actionToMessage () {
    switch (this.currentAction) {
      case ADD_ACTION:
        return ADD_MESSAGE
      case REMOVE_ACTION:
        return REMOVE_MESSAGE
    }
  }

  @action
  bookmark(show) {
    if (some(this.bookmarkedShows, show)) {
      this.currentAction = REMOVE_ACTION      
      rejectBookmarkContract(toJS(show)).then(() => {
        this.bookmarkedShows = reject(this.bookmarkedShows, show)              
        this.bookmarkNotificationIsOn = true
        this.currentAction = undefined
      })
    } else {
      this.currentAction = ADD_ACTION
      bookmarkContract(toJS(show)).then(() => {
        this.bookmarkedShows.push(show)        
        this.bookmarkNotificationIsOn = true
        this.currentAction = undefined
      })
    }
  }
}

export function initStore(isServer, shows = []) {
  return new Store(isServer, shows)
}