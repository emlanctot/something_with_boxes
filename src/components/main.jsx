import React, { useState } from 'react';

const tooManyDivs = () => {
  const yumDivs = []
  for (let i = 0; i < 400; i++) {
    let max = window.screen.height / 2
    let min = window.screen.height / 5
    yumDivs.push({
      id: i,
      height: initialPosition(min, max),
      width: initialPosition(min, max),
      x: initialPosition(-40, window.screen.width),
      y: initialPosition(-40, window.screen.height),
      zIndex: 0,
      // rel: null // position relative to cursor
    })
  }
  return yumDivs;
};

const initialPosition = (min, max) => {
  return Math.random() * (max - min) + min;
};


const Main = () => {
  const [divs, setDivs] = useState(tooManyDivs())
  const [clickedDiv, setClickedDiv] = useState(0)
  const [relativeCursor, setRelativeCursor] = useState({x: 0, y: 0})
  const [draggedPosition, setDraggedPosition] = useState({x: 0, y: 0})
  const [dragging, setDragging] = useState(false)

  const handleDown = (e) => {
    let currentDiv = e.target.id
    setDragging(true)
    setRelativeCursor({x: e.pageX - currentDiv.x, y: e.pageY - currentDiv.y})
    setClickedDiv(currentDiv)
    let top = Math.max(...divs.map(item => item.zIndex))
    divs[currentDiv].zIndex = (top + 1)
    let newDivs = divs
    setDivs(newDivs);
  }

  const handleUp = (e) => {
    // console.log("UP!")
    setDragging(false)
  }

  const handleDrag = (e) => {
    if (dragging) {
      // console.log(e.target.id)
      // let delta = {x: (e.pageX - cursorPosition.x)/15, y: (e.pageY - cursorPosition.y)/15}
      // console.log(`currentPosition: (${draggedPosition.x}, ${draggedPosition.y})`)
      // console.log(`mouse: (${e.pageX}, ${e.pageY})`)
      // console.log(`delta: (${delta.x}, ${delta.y})`)

      setDraggedPosition({x: (divs[clickedDiv].x -= relativeCursor.x), y: (divs[clickedDiv].y -= relativeCursor.y)})
      setDivs(divs);
    } else {
      return false;
    }
  }

  return (
    <div className="App">
    {divs.map((item) => {
      let divStyle = {
        height: item.height,
        width: item.width,
        zIndex: item.zIndex,
        left: item.x + 'px',
        top: item.y + 'px',
        position: 'fixed',
        boxShadow: '5px 10px 15px 6px rgba(0, 0, 0, 0.35)',
        backgroundColor: '#fff'
      }
      return (
        <div id={item.id} key={item.id} onMouseDown={handleDown} onMouseUp={handleUp} onMouseMove={handleDrag} style={divStyle}></div>
      )
    })}
    </div>
  );
};

export default Main;
