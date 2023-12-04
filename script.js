const player = document.querySelector('.player');
const bullet = document.querySelector('.bullet');
const enemy = document.querySelector('.enemy');

let bulletInterval;
let enemySpeed = 2;

//  This is the function for keyboard input (left-arrow, right-arrow and space key).
document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft') {
        movePlayer('left');
    } else if (event.key === 'ArrowRight') {
        movePlayer('right');
    } else if (event.key === ' ') {
        shootBullet();
    }
});

//  This function is to for movement.
function movePlayer(direction) {
    const playerRect = player.getBoundingClientRect();

    if (direction === 'left' && playerRect.left > 0) {
        player.style.left = `${playerRect.left - 10}px`;
    } else if (direction === 'right' && playerRect.right < window.innerWidth) {
        player.style.left = `${playerRect.left + 10}px`;
    }
}

//  This function is for shooting the "yellow" bullet.
function shootBullet() {
    if (!bulletInterval) {
        bullet.style.display = 'block';
        const playerRect = player.getBoundingClientRect();
        bullet.style.left = `${playerRect.left + 20}px`;
        bullet.style.top = `${playerRect.top}px`;

        bulletInterval = setInterval(() => {
            const bulletRect = bullet.getBoundingClientRect();
            bullet.style.top = `${bulletRect.top - 5}px`;

            checkBulletCollision();

            if (bulletRect.top < 0) {
                clearInterval(bulletInterval);
                bulletInterval = null;
                bullet.style.display = 'none';
            }
        }, 16);
    }
}

//  This function is to check if the falling object is hit by the yellow bullet.
function checkBulletCollision() {
    const bulletRect = bullet.getBoundingClientRect();
    const enemyRect = enemy.getBoundingClientRect();

    if (
        bulletRect.top < enemyRect.bottom &&
        bulletRect.right > enemyRect.left &&
        bulletRect.bottom > enemyRect.top &&
        bulletRect.left < enemyRect.right
    ) {
        resetEnemyPosition();
        clearInterval(bulletInterval);
        bulletInterval = null;
        bullet.style.display = 'none';
    }
}

//  This function is to generate the random falling object whenever it is hit by the yellow bullet.
function resetEnemyPosition() {
    const randomPosition = Math.floor(Math.random() * (window.innerWidth - 50));
    enemy.style.top = '20px';
    enemy.style.left = `${randomPosition}px`;
}

//  This function is to check collision with the player and the falling object.
function checkEnemyCollision() {
    const playerRect = player.getBoundingClientRect();
    const enemyRect = enemy.getBoundingClientRect();

    if (
        playerRect.top < enemyRect.bottom &&
        playerRect.right > enemyRect.left &&
        playerRect.bottom > enemyRect.top &&
        playerRect.left < enemyRect.right
    ) {
        alert('Game Over!');
        resetEnemyPosition();
    }

    if (enemyRect.top > window.innerHeight) {
        alert('Game Over!');
        resetEnemyPosition();
    }
}

//  Falling object movement speed function.
function moveEnemy() {
    const enemyRect = enemy.getBoundingClientRect();
    enemy.style.top = `${enemyRect.top + enemySpeed}px`;

    checkEnemyCollision();
}

//  This function is to repeat game cycle.
function gameLoop() {
    moveEnemy();
    requestAnimationFrame(gameLoop);
}

gameLoop();