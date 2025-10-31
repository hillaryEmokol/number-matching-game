// Game state
const gameState = {
    score: 0,
    timeLeft: 60,
    isPlaying: false,
    selectedCells: [],
    timer: null,
    targetNumber: null
};

// Time settings for different difficulty levels
const difficultySettings = {
    easy: 60,
    medium: 45,
    hard: 30
};

// Generate a random number between 1 and 100
function generateNumber() {
    return Math.floor(Math.random() * 100) + 1;
}

// Fill table with random numbers and ensure there's a valid solution
function fillTable() {
    const cells = document.querySelectorAll('.cell');
    const cellsArray = Array.from(cells);
    
    // First fill with random numbers
    cellsArray.forEach(cell => {
        cell.textContent = generateNumber();
    });
    
    // Make sure there are three numbers that can sum to the target
    if (gameState.targetNumber) {
        // Pick three random positions
        const positions = Array.from({length: cellsArray.length}, (_, i) => i)
            .sort(() => Math.random() - 0.5)
            .slice(0, 3);
            
        // Calculate numbers that will sum to target
        const num1 = Math.floor(Math.random() * 70) + 1;
        const num2 = Math.floor(Math.random() * (gameState.targetNumber - num1 - 30)) + 1;
        const num3 = gameState.targetNumber - (num1 + num2);
        
        // Place these numbers in the selected positions
        cellsArray[positions[0]].textContent = num1;
        cellsArray[positions[1]].textContent = num2;
        cellsArray[positions[2]].textContent = num3;
    }
}

// Set new target number
function setNewTarget() {
    // Generate a target number between 100 and 300
    gameState.targetNumber = Math.floor(Math.random() * 200) + 100;
    document.getElementById('target-number').textContent = gameState.targetNumber;
}

// Set a new target number
function setNewTarget() {
    gameState.targetNumber = Math.floor(Math.random() * 200) + 100;
    document.getElementById('target-number').textContent = gameState.targetNumber;
}

// Handle cell clicks
function handleCellClick(e) {
    e.preventDefault(); // Prevent any default behavior
    
    if (!gameState.isPlaying) {
        console.log('Game is not active - start the game first!');
        return;
    }
    
    const cell = e.target.closest('td'); // Use closest to ensure we get the TD element
    if (!cell) {
        console.log('No cell clicked');
        return;
    }
    
    console.log('Cell clicked:', cell.textContent, 'Current selections:', gameState.selectedCells.length);
    
    // If cell is already selected, deselect it
    const cellIndex = gameState.selectedCells.indexOf(cell);
    if (cellIndex !== -1) {
        cell.classList.remove('selected');
        gameState.selectedCells.splice(cellIndex, 1);
        console.log('Deselected cell, remaining selections:', gameState.selectedCells.length);
        return;
    }
    
    // If we haven't selected 3 cells yet, select this one
    if (gameState.selectedCells.length < 3) {
        cell.classList.add('selected');
        gameState.selectedCells.push(cell);
        console.log('Selected cell, total selections:', gameState.selectedCells.length);
        
        // If we now have 3 cells, check for a match
        if (gameState.selectedCells.length === 3) {
            console.log('Checking match with cells:', gameState.selectedCells.map(c => c.textContent));
            checkMatch();
        }
    } else {
        console.log('Already have 3 cells selected');
    }
}

// Check if selected cells sum matches the target
function checkMatch() {
    if (gameState.selectedCells.length === 3) {
        const sum = gameState.selectedCells.reduce((total, cell) => {
            return total + parseInt(cell.textContent);
        }, 0);

        console.log(`Sum: ${sum}, Target: ${gameState.targetNumber}`); // Debug log

        if (sum === gameState.targetNumber) {
            // Correct match - sum equals target
            gameState.selectedCells.forEach(cell => {
                cell.classList.add('match-flicker');
            });

            setTimeout(() => {
                gameState.score += 10;
                document.getElementById('score').textContent = gameState.score;
                
                gameState.selectedCells.forEach(cell => {
                    cell.classList.remove('selected', 'match-flicker');
                });
                gameState.selectedCells = [];
                
                fillTable();
                setNewTarget(); // Set new target number after successful match
            }, 1500);
        } else {
            // No match - sum doesn't equal target
            setTimeout(() => {
                gameState.selectedCells.forEach(cell => {
                    cell.classList.remove('selected');
                });
                gameState.selectedCells = [];
            }, 500);
        }
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing game...');
    
    const table = document.getElementById('table');
    const startButton = document.getElementById('start-game');
    
    if (!table || !startButton) {
        console.error('Required elements not found!');
        return;
    }
    
    // Add click handler to table
    table.addEventListener('click', handleCellClick);
    console.log('Click handler added to table');
    
    // Add click handler to start button
    startButton.addEventListener('click', () => {
        console.log('Starting new game...');
        gameState.isPlaying = true;  // Set this first!
        
        const difficulty = document.getElementById('difficulty').value;
        gameState.timeLeft = difficultySettings[difficulty];
        gameState.score = 0;
        gameState.selectedCells = [];
        
        // Reset UI
        document.getElementById('score').textContent = '0';
        document.getElementById('timer').textContent = gameState.timeLeft;
        
        // Initialize game board
        setNewTarget();
        fillTable();
        
        // Clear any existing timer
        if (gameState.timer) {
            clearInterval(gameState.timer);
        }
        
        // Start countdown
        gameState.timer = setInterval(() => {
            gameState.timeLeft--;
            document.getElementById('timer').textContent = gameState.timeLeft;
            
            if (gameState.timeLeft <= 0) {
                clearInterval(gameState.timer);
                gameState.isPlaying = false;
                alert(`Game Over! Final Score: ${gameState.score}`);
            }
        }, 1000);
        
        console.log('Game started, isPlaying:', gameState.isPlaying);
    });

    // Duplicate start button handler removed because the start button listener is already added above.
//     let target = event.target; 
//     let i = 0;
//     while(target != this){
//         if(target.tagName == 'TD'){
//            highlight(target);
//            return;
//         }
//             }
//    target = target.parentNode;
   

// }
// function highlight(node){
//   if (selectedTd){
//     //selectedTd.classList.remove('highlight');
//   }
//   selectedTd = node;
//   selectedTd.classList.add('highlight');
// }

document.addEventListener('DOMContentLoaded', function() {

// Generate random number between 1 and 100
function generateNumber() {
    return Math.floor(Math.random() * 100) + 1;
}

// Fill table with random numbers
function fillTable() {
    const cells = document.querySelectorAll('td');
    cells.forEach(cell => {
        cell.className = 'cell'; // Ensure cell class is added
        cell.textContent = generateNumber();
        cell.classList.remove('selected', 'match-flicker');
    });
    console.log('Table filled with new numbers'); // Debug log
}

// Check if selected numbers match the target
function checkMatch() {
    if (gameState.selectedCells.length === 3) {
        const sum = gameState.selectedCells.reduce((acc, cell) => acc + parseInt(cell.textContent), 0);
        if (sum === gameState.targetNumber) {
            // Add flicker effect to matching cells
            gameState.selectedCells.forEach(cell => {
                cell.classList.add('match-flicker');
            });

            // Wait for animation to complete before updating
            setTimeout(() => {
                gameState.score += 10;
                document.getElementById('score').textContent = gameState.score;
                gameState.selectedCells.forEach(cell => {
                    cell.classList.remove('selected', 'match-flicker');
                });
                gameState.selectedCells = [];
                fillTable();
                setNewTarget();
            }, 1500); // Wait for flicker animation to complete
        } else {
            // Shake effect for incorrect match
            gameState.selectedCells.forEach(cell => {
                cell.classList.remove('selected');
            });
            gameState.selectedCells = [];
        }
    }
}

// Set new target number
function setNewTarget() {
    gameState.targetNumber = Math.floor(Math.random() * 200) + 100; // Target between 100-300
    document.getElementById('target-number').textContent = gameState.targetNumber;
}

// Handle cell click
function handleCellClick(e) {
    if (!gameState.isPlaying) return;
    
    const cell = e.target;
    if (!cell.classList.contains('cell')) return;
    
    console.log('Cell clicked:', cell.textContent); // Debug log
    
    if (gameState.selectedCells.includes(cell)) {
        cell.classList.remove('selected');
        gameState.selectedCells = gameState.selectedCells.filter(selected => selected !== cell);
    } else if (gameState.selectedCells.length < 3) {
        cell.classList.add('selected');
        gameState.selectedCells.push(cell);
        checkMatch();
    }
}

// Add click event listener to table
document.getElementById('table').addEventListener('click', handleCellClick);

// Start game
document.getElementById('start-game').addEventListener('click', function() {
    console.log('Game starting...'); // Debug log
    
    const difficulty = document.getElementById('difficulty').value;
    gameState.timeLeft = difficultySettings[difficulty];
    gameState.score = 0;
    gameState.isPlaying = true;
    gameState.selectedCells = [];
    
    document.getElementById('score').textContent = '0';
    document.getElementById('timer').textContent = gameState.timeLeft;
    
    fillTable();
    setNewTarget();
    
    // Clear existing timer if any
    if (gameState.timer) clearInterval(gameState.timer);
    
    // Start new timer
    gameState.timer = setInterval(() => {
        gameState.timeLeft--;
        document.getElementById('timer').textContent = gameState.timeLeft;
        
        if (gameState.timeLeft <= 0) {
            clearInterval(gameState.timer);
            gameState.isPlaying = false;
            alert(`Game Over! Final Score: ${gameState.score}`);
        }
    }, 1000);
});

}); // Close DOMContentLoaded event listener
//  function highlight(td){
//          if(selectedTd){
//         selectedTd.classList.remove('highlight');
//      }else{
//         selectedTd = td;
//         selectedTd.classList.add('highlight');
//      }
//      }

//     
//     function colorChanger(event){
//      let  primary_color = event.target
//     if(primary_color.tagName != 'TD') return;
//     highlight( primary_color);
//         }
     
//      function highlight(td){
//          if(selectedTd){
//         selectedTd.classList.remove('highlight');

//      }else{
//         selectedTd = td;
//         selectedTd.classList.add('highlight');
//      }
//      }
// window.addEventListener('onclick', colorChanger);

     
//     function reSet(){
//     const Resetter = document.getElementById('reset');
//     Resetter.addEventListener('click', colorChanger);
//     primary_color.style.backgroundColor = 'white';
    
// }


   // for(let el of primary_color){
    //     
    //         console.log(el);
    //             }
    //             primary_color.style.
    //const pick_tile_value = document.getElementById('tile');
   // pick_tile_value.innerHTML();
});
