const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20; // size of one snake box
let snake = [{ x: 9 * box, y: 9 * box }]; // snake starts in the middle of the grid
let food = { x: Math.floor(Math.random() * 19) * box, y: Math.floor(Math.random() * 19) * box };
let direction = null;
let score = 0;

// Draw the snake and food
function draw() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw snake
    snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? "#2ecc71" : "#27ae60"; // head is bright green, body is darker green
        ctx.shadowBlur = 15;
        ctx.shadowColor = "#2ecc71"; // Add glow effect to the snake
        ctx.fillRect(segment.x, segment.y, box, box);

        ctx.strokeStyle = "#34495e";
        ctx.strokeRect(segment.x, segment.y, box, box);
    });

    // Draw food with a glow
    ctx.fillStyle = "#e74c3c"; // Red food
    ctx.shadowBlur = 15;
    ctx.shadowColor = "#e74c3c";
    ctx.fillRect(food.x, food.y, box, box);

    // Move the snake
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction === "LEFT") snakeX -= box;
    if (direction === "UP") snakeY -= box;
    if (direction === "RIGHT") snakeX += box;
    if (direction === "DOWN") snakeY += box;

    // Check if the snake eats the food
    if (snakeX === food.x && snakeY === food.y) {
        // Increase score
        score++;
        document.getElementById("score").innerHTML = "Score: " + score;

        // Randomize new food location
        food = {
            x: Math.floor(Math.random() * 19) * box,
            y: Math.floor(Math.random() * 19) * box
        };
    } else {
        // Remove the last part of the snake if not eating food
        snake.pop();
    }

    // Add new head to the snake
    let newHead = { x: snakeX, y: snakeY };

    // Check for collisions with wall or self
    if (snakeX < 0 || snakeY < 0 || snakeX >= canvas.width || snakeY >= canvas.height || collision(newHead, snake)) {
        clearInterval(game); // Stop the game
        alert("Game Over! Your score is: " + score);
        location.reload(); // Reload the page to restart the game
    }

    snake.unshift(newHead);
}

// Check for snake collision with itself
function collision(head, snake) {
    for (let i = 0; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }
    return false;
}

// Control the snake with arrow keys
document.addEventListener("keydown", event => {
    if (event.keyCode === 37 && direction !== "RIGHT") {
        direction = "LEFT";
    } else if (event.keyCode === 38 && direction !== "DOWN") {
        direction = "UP";
    } else if (event.keyCode === 39 && direction !== "LEFT") {
        direction = "RIGHT";
    } else if (event.keyCode === 40 && direction !== "UP") {
        direction = "DOWN";
    }
});

// Start the game loop
let game = setInterval(draw, 100);
