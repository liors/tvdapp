import Web3 from 'web3'

import contract from 'truffle-contract'
import BookmarkArtifact from '../build/contracts/Bookmark'

let web3Instance;

let setWeb3Instance = function () {
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
    })
}

let bookmarkContract = function (show) {
    return new Promise((resolve, reject) => {    
            var bookmarknstance;
            var Bookmark = contract(BookmarkArtifact);
            Bookmark.setProvider(web3Instance.currentProvider)
            web3Instance.eth.getAccounts((error, accounts) => {
                var account = accounts[0];   
                console.log(accounts)            
                Bookmark.deployed()
                .then((instance) => {
                    bookmarknstance = instance                                
                    return bookmarknstance.bookmark(show, {from: account})            
                })
                .then(showId => bookmarknstance.getBookmarks.call())                
                .then(bookmarks => resolve({ data: bookmarks.toString() }))                        
            })               
    });
}


export {
    bookmarkContract,
    setWeb3Instance
}