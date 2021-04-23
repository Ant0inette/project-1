
//! CLEAN/ FINAL CODE REPO

const grid = document.querySelector('.grid')
const width = 9
const cells = []
// const newNumber = 0 
// let cellsToClear = 71


for (let index = 0; index < width ** 2; index++) {
  const div = document.createElement('div')
  grid.appendChild(div)
  // div.innerHTML = index
  div.style.width = `${100 / width}%`
  div.style.height = `${100 / width}%`
  cells.push(div)
}


function addMines() {
  const randomisedMineIndexes = []
  const numberGenerator = function (arr) {
    if (arr.length >= 15) return
    const newNumber = Math.floor(Math.random() * 80)
    if (arr.indexOf(newNumber) < 0) {
      arr.push(newNumber)
    }
    numberGenerator(arr)
  }
  numberGenerator(randomisedMineIndexes)
  randomisedMineIndexes.forEach(randomisedMineIndex => {
    const newMine = cells[randomisedMineIndex]
    newMine.classList.add('mine')
  })
  cells.forEach(cell => {
    if (cell !== document) {
      cell.classList.add('notmine')
    }
    if (cell.classList.contains('mine')) {
      cell.classList.remove('notmine')
    }
  })
}

function plusOne(el) {
  if (!el.innerHTML) {
    el.innerHTML = 1
    el.classList.add('hiddentext')
    return
  }
  el.innerHTML = Number(el.innerHTML) + 1
  el.classList.add('hiddentext')
}

function assignCells(arr, el) {
  arr.forEach((el) => {
    if (el.classList.contains('mine')) {
      if ((!(arr.indexOf(el) < width - 1)) && ((!(arr.indexOf(el) % width === width - 1)) && (arr[arr.indexOf(el) - width + 1]).classList.contains('notmine'))) {
        plusOne(arr[arr.indexOf(el) - width + 1])
      }


      if ((!(arr.indexOf(el) < width)) && ((!(arr.indexOf(el) % width === 0))) && (arr[arr.indexOf(el) - width - 1]).classList.contains('notmine')) {
        plusOne(arr[arr.indexOf(el) - width - 1])

      }

      if ((!(arr.indexOf(el) % width === width - 1)) && (!(arr.indexOf(el) > (width ** 2) - width - 1)) && (arr[arr.indexOf(el) + width + 1].classList.contains('notmine'))) {
        plusOne(arr[arr.indexOf(el) + width + 1])
      }


      if ((!(arr.indexOf(el) % width) === (width - 1)) && (!(arr.indexOf(el) > (width ** 2) - width - 1)) && (arr[arr.indexOf(el) + width - 1].classList.contains('notmine'))) {
        plusOne(arr[arr.indexOf(el) + width - 1])

      }

      if ((!(arr.indexOf(el) % width === width - 1)) && (arr[arr.indexOf(el) + 1].classList.contains('notmine'))) {
        plusOne(arr[arr.indexOf(el) + 1])

      }

      if ((!(arr.indexOf(el) % width === 0)) && (arr[arr.indexOf(el) - 1].classList.contains('notmine'))) {
        plusOne(arr[arr.indexOf(el) - 1])

      }

      if ((!(arr.indexOf(el) < width)) && (arr[arr.indexOf(el) - width].classList.contains('notmine'))) {
        plusOne(arr[arr.indexOf(el) - width])
      }

      if ((!(arr.indexOf(el) > (width ** 2) - width - 1)) && (arr[arr.indexOf(el) + width].classList.contains(('notmine')))) {
        plusOne(arr[arr.indexOf(el) + width])
      }
    }
  })
}

//! what resets the game
function resetGame() {
  // ? remove previous board
  cells.forEach(cell => {
    cell.classList.remove('processed', 'mine', 'notmine', 'cover', 'flag', 'explosion', 'clear', 'hiddentext')
    cell.innerHTML = ''
    cell.classList.add('cover')
  })
  //? reset counters and timers
 

  addMines()
  assignCells(cells)
  
}


//! what initiates the game
addMines()
assignCells(cells)
cells.forEach((cell) => {
  cell.classList.add('cover')
})
cells.forEach((cell) => {
  if (!(cell.innerHTML) && (!(cell.classList.contains('mine')))) {
    cell.classList.add('clear')
  }
})




//! event listeners

//? start div
document.getElementById('start').addEventListener('click', () => {
  alert('restart')
  resetGame()

})



//? cells onclick
cells.forEach((cell, index) => {
  cell.addEventListener('click', () => {

    if (cell.classList.contains('mine')) {
      cell.classList.remove('cover')
      //? set interval 
      //? 
      cell.classList.add('explosion')
      cells.forEach(cell => {
        if (cell.classList.contains('mine')){
          cell.classList.remove('cover')
        }
      })
      setTimeout(alertFunc, 1000)
      // eslint-disable-next-line no-inner-declarations
      function alertFunc() {
        alert('GAME OVER, press start to play again')
      }
    } else if (cell.classList.contains('hiddentext')){
      cell.classList.remove('hiddentext', 'cover')
    } else if (cell.classList.contains('clear')) {
      process(cell)
    }
  })
})




const flags = document.querySelector('p')
const flaggedCells = document.getElementsByClassName('flag')
flags.innerHTML = 10
// ? something to count the remaining flags
function flagCounter() {
  if (10 - flaggedCells.length >= 0) {

    console.log(flaggedCells)
    flags.innerHTML = 10 - flaggedCells.length
  }
}



//? cells oncontextmenu
cells.forEach((cell) => {
  if (cell.addEventListener) {
    cell.addEventListener('contextmenu', function (e) {
      e.preventDefault()
      cell.classList.toggle('flag')
      flagCounter()
    }, false)
  } else {
    cell.attachEvent('oncontextmenu', function () {
      window.event.returnValue = false
    })
  }
})


//! function to create an array of cells around a cell:

function createCellsAround(cell) {
  const cellMates = []
  if (
    !(cells.indexOf(cell) < width - 1) &&
    !(cells.indexOf(cell) % width === width - 1) &&
    cells[cells.indexOf(cell) - width + 1].classList.contains('notmine')
  ) {
    cellMates.push(cells[cells.indexOf(cell) - width + 1])
  }
  if (
    !(cells.indexOf(cell) < width) &&
    !(cells.indexOf(cell) % width === 0) &&
    cells[cells.indexOf(cell) - width - 1].classList.contains('notmine')
  ) {
    cellMates.push(cells[cells.indexOf(cell) - width - 1])
  }
  if (
    !(cells.indexOf(cell) % width === width - 1) &&
    !(cells.indexOf(cell) > width ** 2 - width - 1) &&
    cells[cells.indexOf(cell) + width + 1].classList.contains('notmine')
  ) {
    cellMates.push(cells[cells.indexOf(cell) + width + 1])
  }
  if (
    !(cells.indexOf(cell) % width === width - 1) &&
    !(cells.indexOf(cell) > width ** 2 - width - 1) &&
    cells[cells.indexOf(cell) + (width - 1)].classList.contains('notmine')
  ) {
    console.log('success')
    cellMates.push(cells[cells.indexOf(cell) + width - 1])
  }
  if (
    !(cells.indexOf(cell) % width === width - 1) &&
    cells[cells.indexOf(cell) + 1].classList.contains('notmine')
  ) {
    cellMates.push(cells[cells.indexOf(cell) + 1])
  }
  if (
    !(cells.indexOf(cell) % width === 0) &&
    cells[cells.indexOf(cell) - 1].classList.contains('notmine')
  ) {
    cellMates.push(cells[cells.indexOf(cell) - 1])
  }
  if (
    !(cells.indexOf(cell) < width) &&
    cells[cells.indexOf(cell) - width].classList.contains('notmine')
  ) {
    cellMates.push(cells[cells.indexOf(cell) - width])
  }
  if (
    !(cells.indexOf(cell) > width ** 2 - width - 1) &&
    cells[cells.indexOf(cell) + width].classList.contains('notmine')
  ) {
    cellMates.push(cells[cells.indexOf(cell) + width])
  }
  console.log(cellMates)
  // ? Now to check through this array and get rid of elements in it that arent empty cells
  const clearCellMates = cellMates.filter(cell => cell.classList.contains('clear'))
  clearCellMates.forEach(cellMate => {
    cellMate.classList.remove('cover', 'hiddentext')
    cellMate.classList.add('processed')
  })
  console.log(cells[cells.indexOf(cell) + width - 1])
  console.log(clearCellMates)
  return clearCellMates



}
// const cleanCellMates = cellMates.filter(el => el.innerHTML === 0)

// clearCellMates.forEach(cellMate) => process(cellMate)


function process(cell) {
  const cellsAround = createCellsAround(cell)
  if (cellsAround.every(cellAround => (cellAround.classList.contains('clear')) && !((cellsAround.every(cellAround => (cellAround.classList.contains('cover'))))))) {
    cell.classList.remove('cover','hiddentext')
    return
  }

  cellsAround.forEach(cellAround => {
    if (!isNaN(cellAround.innerHTML)) {
      cellAround.classList.remove('cover')
      cellAround.classList.add('processed')
    }

    if (cellAround.classList.contains('clear')) {
      process(cellAround)
    }
  })

}










