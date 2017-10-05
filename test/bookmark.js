const Bookmark = artifacts.require('Bookmark')
const assert = require('assert')

contract('Bookmark', accounts => {
  const MeMyselfAndI = {
    "title": "Me, Myself & I",
    "img": "http://static.tvmaze.com/uploads/images/original_untouched/127/319519.jpg"
  }
  const TheGifted = {
    "title": "The Gifted",
    "img": "http://static.tvmaze.com/uploads/images/original_untouched/121/303442.jpg"
  }

  it('should get Bookmark when blockchain has one show', () => {
     Bookmark.deployed()
      .then(instance => {
        instance.bookmark(JSON.stringify(MeMyselfAndI), {from: accounts[0]})
        return instance.getBookmarks.call()
      })
      .then(bookmark => {
        assert.equal(bookmark, JSON.stringify(MeMyselfAndI))
      })
  })

  it('should get Bookmarks when blockchain has few shows', () => {
    Bookmark.deployed().then(instance => {
      instance.bookmark(JSON.stringify([MeMyselfAndI, TheGifted]), {from: accounts[0]})
      return instance.getBookmarks.call()
    })
    .then(bookmark => {
      assert.equal(bookmark, JSON.stringify([MeMyselfAndI, TheGifted]))      
    })
  })

  it('should allow setting less shows', () => {
    Bookmark.deployed().then(instance => {
      instance.bookmark(JSON.stringify([MeMyselfAndI, TheGifted]), {from: accounts[0]})
      instance.bookmark(JSON.stringify([MeMyselfAndI]), {from: accounts[0]})      
      return instance.getBookmarks.call()
    })
    .then(bookmark => {
      assert.equal(bookmark, JSON.stringify([MeMyselfAndI]))      
    })
  })
})