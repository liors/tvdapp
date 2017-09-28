require('isomorphic-fetch')
const map = require('lodash/map')
const shuffle = require('lodash/shuffle')
const PirateBay = require('thepiratebay')

async function get(type) {
    const rottentomatoesResponse = await fetch(`https://www.rottentomatoes.com/api/private/v2.0/browse?sortBy=popularity&type=${type}`)
    const json = await rottentomatoesResponse.json()
    const titles = json.results.map(element => {
        return {
            url: element.url,
            title: element.title.split(':')[0]
        }
    });

    return await Promise.all(titles.map(title => getImageFrom(title)))
}

async function search(title) {
    const rottentomatoesResponse = await fetch(`https://www.rottentomatoes.com/api/private/v2.0/browse?sortBy=popularity&type=${type}`)
    const json = await rottentomatoesResponse.json()
    const titles = json.results.map(element => {
        return {
            url: element.url,
            title: element.title.split(':')[0]
        }
    });

    return await Promise.all(titles.map(title => getImageFrom(title)))
}

async function getImageFrom({ title }) {
    const tvmazeResponse = await fetch(`http://api.tvmaze.com/singlesearch/shows?q=${title}`)
    const json = await tvmazeResponse.json()
    return {
        img: json.image,
        title
    }
}

async function showsAiringAt(date = '2017-09-25') {
    const tvmazeResponse = await fetch(`http://api.tvmaze.com/schedule?country=US&date=${date}`)
    const json = await tvmazeResponse.json()
    return shuffle(map(json, show => {
        return {
            img: show.show.image,
            title: show.show.name
        }
    }))
}

async function getTorrents({ title } ) {
    const searchResults = await PirateBay.search(title, {
        category: 'video',
        orderBy: 'seeds'
    })
    return {
        searchResults,
        title
    }    
}

module.exports = {
    get,
    search,
    showsAiringAt
}