import React from 'react'

const BackToTopButton = props => {
  // When the user scrolls down 20px from the top of the document, show the button
  window.onscroll = function() {scrollFunction()};

  function scrollFunction() {
    if (document.body.scrollTop >= 800 || document.documentElement.scrollTop >= 800) {
        document.getElementById("myBtn").style.display = "block";
    } else {
        document.getElementById("myBtn").style.display = "none";
    }
  }

  return (
    <div>
      <button onClick={props.topFunction} id="myBtn" title="Go to top">Back to game</button>
    </div>
  )
}

export default BackToTopButton
