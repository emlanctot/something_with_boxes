import React, { useState } from 'react';

const tooManyDivs = () => {
  const yumDivs = []
  const keyDiv = Math.round(randomNum(0, 99))
  // console.log(`screen ${window.screen.height}`)
  console.log(`innerHeight ${window.innerWidth}`)
  for (let i = 0; i < 100; i++) {
    let max = window.innerWidth / 3
    let min = window.innerHeight / 5
    let height = randomNum(min, max)
    let width = randomNum(min, max)
    yumDivs.push({
      id: i,
      height: height,
      width: width,
      x: randomNum((10 - width), (window.innerWidth)),
      y: randomNum((10 - height), (window.innerHeight)),
      zIndex: 0,
      keyLoc: i === keyDiv ? true : false
    })
  }
  return yumDivs;
};

const randomNum = (min, max) => {
  return Math.random() * (max - min) + min;
};


const Main = () => {
  const [divs, setDivs] = useState(tooManyDivs())
  const [clickedDivId, setClickedDivId] = useState(0)
  const [relativeCursor, setRelativeCursor] = useState({x: 0, y: 0})
  const [draggedPosition, setDraggedPosition] = useState({x: 0, y: 0})
  const [dragging, setDragging] = useState(false)
  const [keyFound, setKeyFound] = useState(false)

  const handleDown = (e) => {
    let currentDivId = e.target.id
    setDragging(true)
    setRelativeCursor({x: (e.pageX - divs[currentDivId].x), y: (e.pageY - divs[currentDivId].y)})
    setClickedDivId(currentDivId)
    let top = Math.max(...divs.map(item => item.zIndex))
    divs[currentDivId].zIndex = (top + 1)
    let newDivs = divs
    setDivs(newDivs);
  }

  const handleUp = (e) => {
    setDragging(false)
  }

  const handleDrag = (e) => {
    if (dragging) {
      setDraggedPosition({
        x: divs[clickedDivId].x = (e.pageX - relativeCursor.x),
        y: divs[clickedDivId].y = (e.pageY - relativeCursor.y)
      })
      setDivs(divs);
    } else {
      return false;
    }
  }

  const handleKeyClick = (e) => {
    setKeyFound(true)
  }

  const handleLockClick = (e) => {
    if (keyFound) {
      window.location.reload();
    } else {
      alert('There is no key in your inventory! Try again!');
      // return false;
    }
  }

  let inventoryStyle = {
    border: '3px dotted black',
    borderRadius: '5px',
    zIndex: 1000,
    boxShadow: '5px 10px 15px 6px rgba(0, 0, 0, 0.35)',
    position: 'fixed',
    width: '200px',
    height: '60px',
    margin: '20px',
    background: '#fff',
    font: '18px Courier New',
    fontWeight: 'bold'
  }

  let lockStyle = {
    position: 'absolute',
    top:  '50%',
    left: '50%',
    margin: 'auto',
    fontSize: '28px',
    textShadow: '4px 4px 4px rgba(0, 0, 0, 0.2)'
  }

  return (
    <div className="App">
      <div style={lockStyle} onClick={handleLockClick}>🔒</div>
      <div style={inventoryStyle}>
        <div style={{margin: '15px 12px 20px 12px', bottom: '0', position: 'absolute'}}>Inventory: {!!keyFound ? '🔑' : ''}</div>
      </div>
      {divs.map((item) => {
        let divStyle = {
          height: item.height,
          width: item.width,
          zIndex: item.zIndex,
          left: item.x + 'px',
          top: item.y + 'px',
          position: 'fixed',
          boxShadow: '5px 10px 15px 6px rgba(0, 0, 0, 0.35)',
          backgroundColor: '#fff',
          textAlign: 'center',
          cursor: dragging ? 'grabbing' : 'grab',
          border: '1px solid black',
          borderRadius: '5px'
        }

        return (
          <div id={item.id} key={item.id} onMouseDown={handleDown} onMouseUp={handleUp} onMouseMove={handleDrag} style={divStyle}>
            {!!item.keyLoc && (<p onClick={handleKeyClick} id={item.id} style={{paddingTop: (item.height/2-45), fontSize: '28px', textShadow: '4px 4px 4px rgba(0, 0, 0, 0.2)'}}>{!!keyFound ? '' : '🔑'}</p>)}
          </div>
        )
      })}
    </div>
  );
};

export default Main;
