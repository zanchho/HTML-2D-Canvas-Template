/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas")
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d")

// Set canvas dimensions to match the window size
function setCanvastoParentSize() {
  canvas.width = canvas.getBoundingClientRect().width
  canvas.height = canvas.getBoundingClientRect().height
}
setCanvastoParentSize()

function drawRect(x, y, w, h, color) {
  ctx.fillStyle = color || "rgba(255, 0, 0, 0.1)"
  ctx.fillRect(x, y, w, h)
}

function drawCircle(x, y, radius, startAngle, endAngle, color) {
  ctx.strokeStyle = color
  ctx.beginPath()
  ctx.arc(x, y, radius, startAngle, endAngle)
  ctx.stroke()
}

function drawText(text, x, y, font) {
  if (font) ctx.font = font
  ctx.fillText(text, x, y)
}

class GridItem {
  constructor(height, width, x, y, row, col, color) {
    this.height = height
    this.width = width
    this.x = x
    this.y = y
    this.row = row
    this.col = col
    this.color = color
  }
}
function createGrid(rows, columns, color) {
  const grid = []

  function calculateDimensions(columns) {
    const cellWidth = canvas.width / columns
    const cellHeight = canvas.height / rows
    return { cellWidth, cellHeight }
  }

  const { cellWidth, cellHeight } = calculateDimensions(columns)

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      const x = col * cellWidth
      const y = row * cellHeight
      grid.push(new GridItem(cellHeight, cellWidth, x, y, row, col, color))
    }
  }

  return grid
}
function drawGrid(gridArray) {
  gridArray.forEach(grid => {
    ctx.beginPath()
    ctx.rect(grid.x, grid.y, grid.width, grid.height)
    ctx.strokeStyle = grid.color
    ctx.lineWidth = 1
    ctx.stroke()
  })
}

function loadRandomImageAndDraw(gridToDraw) {
  const img = new Image()
  // https://picsum.photos/width/height
  img.src = `https://picsum.photos/1920/1080.jpg`
  img.onload = function () {
    console.log("Image Loaded")
    ctx.drawImage(
      img,
      gridToDraw.x,
      gridToDraw.y,
      gridToDraw.width,
      gridToDraw.height
    )
  }
  console.log(`waiting for ${img} to load`)
}

function getGridItem(atRow, atCol) {
  return gridArray.find(({ col, row }) => {
    return col === atCol - 1 && row === atRow - 1
  })
}
//testing functions:
drawRect(190, 190, 70, 70, "aqua")
drawCircle(200, 200, 50, 0, Math.PI * 2, "red")
drawText("Hello World", 250, 300, "24px Arial")

const gridArray = createGrid(5, 5, "lightgray")

const gridToDraw = getGridItem(2, 2)
const gridToDraw2 = getGridItem(2, 3)
if (gridToDraw) loadRandomImageAndDraw(gridToDraw)
if (gridToDraw2) loadRandomImageAndDraw(gridToDraw2)

drawGrid(gridArray)
