import React, { Component } from 'react'
import { inject, observer } from 'mobx-react';

import { GridList, GridTile } from 'material-ui/GridList';
import { deepOrange500 } from 'material-ui/styles/colors'
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


if (!process.tapEventInjected) {
    injectTapEventPlugin()
    process.tapEventInjected = true
}

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    gridList: {
        width: '748',
        overflowY: 'auto',
    },
};

const muiTheme = {
    palette: {
      accent1Color: deepOrange500
    }
  }

@inject('store') @observer
export default class Shows extends React.Component {
    handleOpen = (show) => {
        this.props.store.selectedShow = show
    };

    handleClose = (action) => {
        this.props.store.selectedShow = {}
    };

    render() {
        const { store } = this.props
        const shows = store.shows;
        const userAgent = store.userAgent
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={() => this.handleClose('cancel')}
            />,
            <FlatButton
                label="Ok"
                primary={true}
                keyboardFocused={true}
                onClick={() => this.props.store.bookmark()}
            />,
        ];

        return (
            <MuiThemeProvider muiTheme={getMuiTheme({userAgent, ...muiTheme})}>
                <div style={styles.root}>
                    <GridList
                        cellHeight={262}
                        style={styles.gridList}
                        cols={4}
                    >
                        {shows.map((show) => (
                            <GridTile
                                key={show.img.medium}
                                title={show.title}
                                actionIcon={<IconButton onClick={() => { this.handleOpen(show) }}><StarBorder color="white" /></IconButton>}
                            >
                                <img src={show.img.medium} className={'img'} />
                                <style jsx>{`
                            img {
                                cursor: pointer;
                                transition: transform .25s ease-out;
                            }
                            img:hover {
                                transform: scale(1.05);
                                transition: transform .25s ease-out;
                            }
                          `}</style>
                            </GridTile>
                        ))}
                    </GridList>
                    <Dialog
                        title={store.selectedShow.title}
                        actions={actions}
                        modal={false}
                        open={!!store.selectedShow.title}
                        onRequestClose={this.handleClose}
                    >
                        Bookmark {store.selectedShow.title} to watch latests episodes.
                    </Dialog>
                </div>
            </MuiThemeProvider>
        )
    }
}