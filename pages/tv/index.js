import React, { Component } from 'react'
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton';
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
export default class GridListExampleSimple extends Component {
    static async getInitialProps() {
        const res = await fetch('http://localhost:3020/api/shows/fresh')
        const shows = await res.json()
        console.log(shows)
        const showsInRow = 4
        return {
            shows,
            showsInRow
        }
    }

    render() {       
        return (
        <MuiThemeProvider muiTheme={getMuiTheme()}>
            <div style={styles.root}>
                <GridList
                    cellHeight={262}
                    style={styles.gridList}
                    cols={4}
                >
                    {this.props.shows.map((tile) => (
                        <GridTile
                            key={tile.img.medium}
                            title={tile.title}
                            actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
                        >
                            <img src={tile.img.medium} className={'img'} />
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
            </div>
        </MuiThemeProvider>
        )
    }
}