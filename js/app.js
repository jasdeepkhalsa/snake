// TODO: Bug whereby food can spawn inside the snake
;(function () {
  // Values that are immutable - don't change
  const canvas = document.querySelector('.game')
  const context = canvas.getContext('2d')
  const fifteenASecond = 1000 / 15
  const gridSize = 20
  const tileCount = 20

  // Values that change
  let xPlayer = 10
  let yPlayer = 10
  let xFood = 15
  let yFood = 15
  let xVelocity = 0
  let yVelocity = 0
  let trail = []
  let tail = 5

  // Arrow key mappings
  const Keys = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
  }

  // Load the game once all page resources have been loaded
  // Including DOM, stylesheets, JavaScript, images etc.
  window.addEventListener('load', load)

  function load() {
    // Link the keydown event to our keyPush function
    document.addEventListener('keydown', keyPush)
    // Load the game function at a frame rate of 15 frames per second
    // Which should produce a smooth animation for this game
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

    // Create the background, fill all the canvas area
    context.fillStyle = 'black'
    context.fillRect(0, 0, canvas.width, canvas.height)

    // Create the snake
    context.fillStyle = 'lime'

    // Create the snake's tail
    // By looping over the trail array
    // Which lists each of the player's previous positions
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
    // To produce a tail on the next frame
    trail.push({
      x: xPlayer,
      y: yPlayer,
    })

    // If trail array becomes longer than the tail size, trim it
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

    // If there is no velocity, lets draw the starting screen
    if (xVelocity === 0 && yVelocity === 0) {
      context.font = '1.5em Verdana'
      context.textAlign = 'center'
      context.fillText(
        'Push ↑ ↓ ← → to start',
        canvas.width / 2,
        canvas.height / 2
      )
    }
    // Otherwise, lets draw the points in the top-left corner
    else {
      context.font = '1em Verdana'
      context.textAlign = 'left'
      context.fillText(`Points: ${score}`, 5, gridSize)
    }
  }

  // Add/remove velocity based on arrow keys pushed
  // This will be applied to all the following frames
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
