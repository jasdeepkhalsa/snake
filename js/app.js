// TODO: Bug whereby food can spawn inside the snake
;(function () {
  const canvas = document.querySelector('.game')
  const context = canvas.getContext('2d')
  const fifteenASecond = 1000 / 15
  const gridSize = 20
  const tileCount = 20

  let xPlayer = 10
  let yPlayer = 10
  let xFood = 15
  let yFood = 15
  let xVelocity = 0
  let yVelocity = 0
  let trail = []
  let tail = 5

  const Keys = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
  }

  window.addEventListener('load', load)

  function load() {
    document.addEventListener('keydown', keyPush)
    setInterval(game, fifteenASecond)
  }

  function game() {
    // Add velocity to the player
    xPlayer += xVelocity
    yPlayer += yVelocity

    // Wrap the player when going off-screen
    if (xPlayer < 0) {
      xPlayer = tileCount - 1
    }

    if (xPlayer > tileCount - 1) {
      xPlayer = 0
    }

    if (yPlayer < 0) {
      yPlayer = tileCount - 1
    }

    if (yPlayer > tileCount - 1) {
      yPlayer = 0
    }

    // Make the background
    context.fillStyle = 'black'
    context.fillRect(0, 0, canvas.width, canvas.height)

    // Make the snake
    context.fillStyle = 'lime'

    // Create the snake's trail
    for (let i = 0; i < trail.length; i++) {
      let currentTrail = trail[i]

      context.fillRect(
        currentTrail.x * gridSize,
        currentTrail.y * gridSize,
        gridSize - 2,
        gridSize - 2
      )

      // If player steps on its own tail, reset its size
      if (currentTrail.x === xPlayer && currentTrail.y === yPlayer) {
        tail = 5
      }
    }

    // Record the player position
    trail.push({
      x: xPlayer,
      y: yPlayer,
    })

    // If trail becomes too long, trim it
    while (trail.length > tail) {
      trail.shift()
    }

    // If player eats food, increase tail size
    // and randomize position of new food
    if (xFood === xPlayer && yFood === yPlayer) {
      tail++
      xFood = Math.floor(Math.random() * tileCount)
      yFood = Math.floor(Math.random() * tileCount)
    }

    // Make the food
    context.fillStyle = 'red'
    context.fillRect(
      xFood * gridSize,
      yFood * gridSize,
      gridSize - 2,
      gridSize - 2
    )

    // Update the text or score
    context.fillStyle = 'white'
    const score = tail - 5

    if (xVelocity === 0 && yVelocity === 0) {
      context.font = '1.5em Verdana'
      context.textAlign = 'center'
      context.fillText(
        'Push ↑ ↓ ← → to start',
        canvas.width / 2,
        canvas.height / 2
      )
    } else {
      context.font = '1em Verdana'
      context.textAlign = 'left'
      context.fillText(`Points: ${score}`, 5, gridSize)
    }
  }

  // Add/remove velocity based on arrow keys pushed
  function keyPush(event) {
    switch (event.keyCode) {
      case Keys.LEFT:
        xVelocity = -1
        yVelocity = 0
        break
      case Keys.UP:
        xVelocity = 0
        yVelocity = -1
        break
      case Keys.RIGHT:
        xVelocity = 1
        yVelocity = 0
        break
      case Keys.DOWN:
        xVelocity = 0
        yVelocity = 1
        break
    }
  }
})()
