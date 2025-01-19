points = 0;

document.addEventListener('DOMContentLoaded', function() {
    const start = document.getElementById('ghost_button');
    const ghost = document.getElementById('follower');
    const coins = document.querySelectorAll(".coin");
    const count = document.getElementById("pointsCounter");
    const game = document.getElementById("Game");

    let lastX = null;

    start.onclick = function() {
        if (ghost.style.display === 'none' || !ghost.style.display) {
            ghost.style.display = 'block'; 
            count.style.display = 'block';
            coins.forEach(coin => {
                if (coin.style.display === 'none') {
                    coin.style.display = 'block';
                } else {
                    coin.style.display = 'none';
                }
                
            });
        } else {
            ghost.style.display = 'none';
            count.style.display = 'none';
            coins.forEach(coin => {
                coin.style.visibility = 'none';
            });
            return;
        }
    };

    // Handle mouse movement for positioning and flipping
    document.onmousemove = function(event) {
        if (ghost.style.display !== 'none') {
            ghost.style.left = event.clientX + 'px';
            ghost.style.top = event.clientY + 'px';

            // Touching the coins
            coins.forEach(coin => {
                if (isTouching(ghost, coin) && coin.style.visibility !== 'hidden') {
                    coin.style.visibility = "hidden";
                    points += 1;
                    count.textContent = `Points: ${points}`;
                    if (points == 6){

                        ghost.style.display ='none';
                        count.style.display = "none";
                
                        game.style.display = "block";
                        setTimeout(function() {
                            game.style.display = "none";
                        }, 3000);
                        
                        
                    }
                }
            });

            // Check if lastX has been initialized and flip image based on direction
            if (lastX !== null) {
                ghost.style.transform = event.clientX > lastX ? "scaleX(-1)" : "scaleX(1)";
            }
            lastX = event.clientX;
        }
    };


    //Touching function 
    function isTouching(ghost, coin) {
        const ghostRect = ghost.getBoundingClientRect();
        const coinRect = coin.getBoundingClientRect();
        return !(ghostRect.right < coinRect.left ||
                 ghostRect.left > coinRect.right ||
                 ghostRect.bottom < coinRect.top ||
                 ghostRect.top > coinRect.bottom);
    }


});
