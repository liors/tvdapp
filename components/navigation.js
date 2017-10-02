import Link from 'next/link'
import NProgress from 'nprogress'
import Router from 'next/router'

Router.onRouteChangeStart = url => NProgress.start()
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()
  
export default ( { selected }) => {
    let {selectionFreshClass, selectionNewClass, selectionPopularClass, selectionBookmarksClass} = 'gray'
    
    switch(selected) {
        case 'fresh':
        selectionFreshClass = 'black b'
            break;
        case 'new':
        selectionNewClass = 'black b'
            break;
        case 'popular':
        selectionPopularClass = 'black b'
            break;
        case 'bookmarks':
        selectionBookmarksClass = 'black b'
                break;
    }
    return (        
    <nav className={`pa3 pa4-ns`}>
        <Link href="/tv/fresh"><span className={`pointer link dim ${selectionFreshClass} f6 f5-ns dib mr3`} title="Fresh">Fresh</span></Link>
        <Link href="/tv/new"><span className={`pointer link dim ${selectionNewClass} f6 f5-ns dib mr3`} title="New">New</span></Link>
        <Link href="/tv/popular"><span className={`pointer link dim ${selectionPopularClass} f6 f5-ns dib mr3`} title="Popular">Popular</span></Link>
        <Link href="/tv/bookmarks"><span className={`pointer link dim ${selectionBookmarksClass} f6 f5-ns dib mr3`} title="Bookmarks">Bookmarks</span></Link>    
    </nav>
    )
}