import contract from 'truffle-contract'
import BookmarkArtifact from '../build/contracts/Bookmark'
import isArray from 'lodash/isArray'
import reduce from 'lodash/reduce'

let web3Instance;

let setWeb3Instance = function () {
    return new Promise((resolve, reject) => {
        if (web3Instance) {
            resolve();
        } else {
            // Wait for loading completion to avoid race conditions with web3 injection timing.
            window.addEventListener('load', function () {
                var web3 = window.web3
                // Checking if Web3 has been injected by the browser (Mist/MetaMask)
                if (typeof web3 !== 'undefined') {
                    // Use Mist/MetaMask's provider.
                    web3 = new Web3(web3.currentProvider)
                    web3Instance = web3
                } else {
                    // Fallback to localhost if no web3 injection.
                    var provider = new Web3.providers.HttpProvider('http://localhost:8545')
                    web3 = new Web3(provider)
                    web3Instance = web3
                }

                resolve();
            })
        }
    })
}

let getBookmarkInstance = function () {
    return new Promise((resolve, reject) => {
        const Bookmark = contract(BookmarkArtifact)
        Bookmark.setProvider(web3Instance.currentProvider)
        web3Instance.eth.getAccounts((error, accounts) => {
            const account = accounts[0]
            Bookmark.deployed().then((instance) => {
                resolve({ instance, account })
            })
        })
    })
}

let bookmarkContract = function (show) {
    return new Promise((resolve, reject) => {
        let instance, account, blockchainBookmarks;
        getBookmarkInstance()
            .then(result => ({instance, account} = result))
            .then(() => instance.getBookmarks.call())
            .then(bookmarks => {
                if (bookmarks) {
                    blockchainBookmarks = JSON.parse(bookmarks.toString())
                    if (!isArray(blockchainBookmarks)) {
                        blockchainBookmarks = [blockchainBookmarks]
                    }
                    blockchainBookmarks.push(show)
                } else {
                    blockchainBookmarks = show
                }
                instance.bookmark(JSON.stringify(blockchainBookmarks), { from: account })
                    .then(showId => instance.getBookmarks.call())
                    .then(bookmarks => {
                        resolve({ data: JSON.parse(bookmarks.toString()) })
                    })
            })
    })
};

let rejectBookmarkContract = function (show) {
    return new Promise((resolve, reject) => {
        let instance, account, blockchainBookmarks;
        getBookmarkInstance()
            .then(result => ({instance, account} = result))
            .then(() => instance.getBookmarks.call())
            .then(bookmarks => {                
                blockchainBookmarks = JSON.parse(bookmarks.toString())
                blockchainBookmarks = reduce(blockchainBookmarks, (sum, bookmark) => { 
                    if (bookmark.title !== show.title) { 
                        sum.push(bookmark) 
                    } 
                    return sum  
                }, [])            
                instance.bookmark(JSON.stringify(blockchainBookmarks), { from: account, gas: 2000000 })
                    .then(showId => instance.getBookmarks.call())
                    .then(bookmarks => {
                        resolve({ data: JSON.parse(bookmarks.toString()) })
                    })
            })
    })
};

let getBookmarks = function () {
    return new Promise((resolve, reject) => {
        let instance
        getBookmarkInstance()
            .then(result => ({instance} = result))
            .then(() => instance.getBookmarks.call())
            .then(bookmarks => {
                resolve(bookmarks && JSON.parse(bookmarks.toString()))
            })
    })
}


export {
    bookmarkContract,
    rejectBookmarkContract,
    getBookmarks,
    setWeb3Instance
}