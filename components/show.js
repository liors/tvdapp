import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton';
import injectTapEventPlugin from 'react-tap-event-plugin'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { bookmarkContract } from '../services/blockChainService'
import { showStyle } from '../components/styles.js'

if (!process.tapEventInjected) {
    injectTapEventPlugin()
    process.tapEventInjected = true
}

export default class Show extends Component {
    constructor() {
        super()
        this.state = {}
    }

    static getInitialProps ({ req }) {
        let userAgent
        if (process.browser) {
          userAgent = navigator.userAgent
        } else {
          userAgent = req.headers['user-agent']
        }
    
        return { userAgent }
      }

    bookmark(url) {
        bookmarkContract(url)
            .then(data => this.setState(data))
            .catch(() => {
                console.log('Error finding web3.')
            })
    }

    render() {
        const { show, index, userAgent } = this.props;
        return (
            <MuiThemeProvider muiTheme={getMuiTheme({ userAgent })}>
                <div className='show'>
                    <div>{show.title}</div>
                    <img src={show.img.medium} />
                    <RaisedButton primary={true} onTouchTap={() => { this.bookmark(show.url) }} label='bookmark me'/>
                    <style jsx>{showStyle}</style>
                </div>
            </MuiThemeProvider>
        )
    }
}