export default ( { dismissAfter, isActive, hideBookmarkNotification, getMessage }) => {
    if (dismissAfter) {
        setTimeout(hideBookmarkNotification, dismissAfter * 1000)
    }    
    return (        
    <div style={{display: isActive ? 'block' : 'none'}}>
        <p>{getMessage()}</p>       
        <style jsx>{`
      div {
        position: fixed; 
        z-index: 100;
        bottom: 2rem; 
        left: 50%;
        transform: translateX(-50%);
        padding: 0 1rem; 
        margin: 0; 
        color: rgb(250, 250, 250); 
        font-size: 1rem; 
        line-height: normal; 
        border-radius: 5px; 
        background: rgb(33, 33, 33); 
        box-shadow: rgba(10, 10, 11, 0.125) 0px 0px 1px 1px; 
        transition: 0.5s cubic-bezier(0.89, 0.01, 0.5, 1.1);         
      }
    `}</style>
    </div>
    )
}