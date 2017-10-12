import React, { Component } from 'react'
import { inject, observer } from 'mobx-react';
import Notification  from '../components/notification';
import map from 'lodash/map'
import some from 'lodash/some'
import get from 'lodash/get'

@inject('store') @observer
export default class Shows extends React.Component {

    handleBookmark = show => this.props.store.bookmark(show)

    isBookmarked = show => some(this.props.store.bookmarkedShows, show)    

    getShows () {
        return this.props.type === 'bookmarks' ? this.props.store.bookmarkedShows : this.props.store.shows        
    }

    render() {
        const shows = this.getShows()
        const store = this.props.store
        return (
            <div>
                <section className={`cf w-100 pa2-ns`}>
                    {
                        map(shows, show => {
                            return (
                                <article key={show.title} className={`fl w-100 w-50-m  w-25-ns pa2-ns`}>
                                    <div className={`aspect-ratio aspect-ratio--1x1`}>
                                        <img style={{ backgroundImage: `url(${get(show, 'img.original', '').replace('http://', '//')})` }}
                                            className={`db bg-center cover aspect-ratio--object`} />
                                    </div>
                                    <a onClick={() => {this.handleBookmark(show)}} className={`pointer ph2 ph0-ns pb3 link db`} style={{ position: 'relative' }}>
                                        <h3 className={`f5 f4-ns mb0 black-90`}>{show.title}</h3>
                                        <div style={{ position: 'absolute', zIndex: 100, right: 0, top: 0 }}>
                                            <svg className={`svgIcon-use`} style={{fill: 'rgba(0,0,0,.54)', display: this.isBookmarked(show) ? 'block' : 'none'}} width="25" height="26" viewBox="0 0 25 26"><path d="M19 7c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v14.66h.012c.01.103.045.204.12.285a.5.5 0 0 0 .706.03L12.5 17.85l5.662 4.126a.508.508 0 0 0 .708-.03.5.5 0 0 0 .118-.285H19V7z" fillRule="evenodd"></path></svg>
                                        </div>
                                        <div style={{ position: 'absolute', zIndex: 100, right: 0, top: 0 }}>
                                            <svg className={`svgIcon-use`} style={{fill: 'rgba(0,0,0,.54)', display: this.isBookmarked(show) ? 'none' : 'block'}} width="25" height="25" viewBox="0 0 25 25"><path d="M19 6c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v14.66h.012c.01.103.045.204.12.285a.5.5 0 0 0 .706.03L12.5 16.85l5.662 4.126a.508.508 0 0 0 .708-.03.5.5 0 0 0 .118-.285H19V6zm-6.838 9.97L7 19.636V6c0-.55.45-1 1-1h9c.55 0 1 .45 1 1v13.637l-5.162-3.668a.49.49 0 0 0-.676 0z" fillRule="evenodd"></path></svg>
                                        </div>
                                    </a>
                                </article>
                            )
                        })
                    }
                </section>
                <Notification
                    isActive={store.bookmarkNotificationIsOn}
                    dismissAfter={3}
                    getMessage={store.getMessage.bind(store)}
                    hideBookmarkNotification={store.hideBookmarkNotification.bind(store)}
                    />
            </div>
        )
    }
}