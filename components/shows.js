import React, { Component } from 'react'
import Show from '../components/show'
import { showsMainContainerStyle, showsContainerStyle } from '../components/styles.js'


export default ({ shows, showsInRow }) => {
    var i, j, temparray;
    var results = []
    for (i = 0, j = shows.length; i < j; i += showsInRow) {
        temparray = shows.slice(i, i + showsInRow);
        results.push(temparray)
    }
    const showsMarkup = results.map((showBucket, index) => {
        return (
            <div key={index}>
                {
                    showBucket.map((show, i) => {
                        const key = i + index * showsInRow
                        return <Show key={key} show={show} index={key} />
                    })
                }
            <style jsx>{showsContainerStyle}</style>
            </div>
        )
    });

    return (
        <div>
            {showsMarkup}
            <style jsx>{showsMainContainerStyle}</style>            
        </div>
    )
}