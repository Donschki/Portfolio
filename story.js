// State object to keep track of stats and animation status
let state = {
    trust: 50,
    sanity: 100,
    walking: false, // Whether the walking animation is active
};

const canvas = document.getElementById("pixel-animation-canvas");
const ctx = canvas.getContext("2d");
const spriteWidth = 32;  // Width of one frame
const spriteHeight = 32; // Height of one frame
const spriteRowCount = 4; // Number of rows in the sprite sheet (for animation)
const spriteColumnCount = 4; // Number of columns in the sprite sheet

let currentFrame = 0;
let walkingSpeed = 150;  // Speed of the walking animation
let spriteSheet = new Image();
spriteSheet.src = 'walking_sprites.png'; // Replace with your own pixel art sprite sheet

// Resize canvas based on the screen size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Draw walking character on canvas
function drawCharacter() {
    const frameX = currentFrame % spriteColumnCount * spriteWidth; // Find which frame to display
    const frameY = Math.floor(currentFrame / spriteColumnCount) * spriteHeight; // Find row of sprite sheet
    
    // Clear canvas before drawing new frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw the character at a fixed position (e.g., walking across the screen)
    ctx.drawImage(spriteSheet, frameX, frameY, spriteWidth, spriteHeight, 50, canvas.height - spriteHeight - 50, spriteWidth, spriteHeight);
    
    currentFrame++;
    if (currentFrame >= spriteRowCount * spriteColumnCount) {
        currentFrame = 0; // Loop the animation
    }
}

// Start the walking animation loop
function startWalkingAnimation() {
    if (!state.walking) return;  // Don't start animation unless walking state is active
    drawCharacter();
    setTimeout(startWalkingAnimation, walkingSpeed);  // Adjust walking speed here
}

let storyData = {
    start: {
        text: "You stand at the edge of the cursed forest. The trees loom like dark sentinels, their gnarled branches twisting in unnatural patterns. The air is thick with foreboding, and the ground beneath you feels too soft, like it’s breathing.",
        choices: {
            enter: "Enter the forest",
            leave: "Leave the forest"
        },
        nextScenes: {
            enter: 'enter',
            leave: 'leave'
        }
    },
    enter: {
        text: "You step into the forest, the fog parting around your feet, and the shadows seem to follow your every move. The air grows colder, and strange sounds echo from the deep, untouched parts of the woods. An ancient ruin lies ahead, half-swallowed by moss and vines. The forest seems to be alive, its whispers beckoning.",
        choices: {
            explore: "Explore deeper",
            return: "Return to the village",
            rest: "Rest for a moment"
        },
        nextScenes: {
            explore: 'explore',
            return: 'leave',
            rest: 'rest'
        }
    },
    explore: {
        text: "As you venture deeper, the forest becomes denser. The whispering grows louder, a constant presence in your mind. You stumble upon a strange altar, carved from stone, with bloodstains smeared across its surface. Atop it lies an ancient artifact, glowing faintly, but the moment you reach for it, the ground trembles.",
        choices: {
            take: "Take the artifact",
            leave: "Leave the altar",
            flee: "Flee in panic"
        },
        nextScenes: {
            take: 'take',
            leave: 'enter',
            flee: 'leave'
        }
    },
    take: {
        text: "The moment your fingers brush the artifact, the forest roars in anger. Vines whip out, wrapping around your arms and legs, pulling you towards the altar. You hear a voice in your mind—inhuman, ancient. 'You should not have disturbed me.' Your sanity begins to crack as the forest bends to its will.",
        choices: {
            resist: "Try to resist",
            surrender: "Surrender to the forest"
        },
        nextScenes: {
            resist: 'resist',
            surrender: 'surrender'
        }
    },
    resist: {
        text: "You struggle, fighting against the crushing weight of the forest’s influence. Your mind teeters on the edge of madness, but you pull yourself free, leaving the artifact behind. The forest howls, but you make your way back to the village, shaken but alive.",
        choices: {
            rest: "Rest and recover",
            travel: "Travel to the next location"
        },
        nextScenes: {
            rest: 'rest',
            travel: 'travel'
        }
    },
    surrender: {
        text: "You let go, giving in to the dark pull of the forest. A cold, invasive presence fills your mind. Your body becomes rigid, like a puppet controlled by invisible strings. The forest has claimed you as its own. You are lost to it forever.",
        choices: {
            escape: "Attempt an escape",
            surrender: "Fully surrender"
        },
        nextScenes: {
            escape: 'escape',
            surrender: 'surrender'
        }
    },
    leave: {
        text: "You turn away from the forest, retreating to the safety of the village. The air feels lighter, but you can't shake the feeling that the forest is watching you. You have escaped—for now.",
        choices: {
            rest: "Rest and recover",
            travel: "Travel to the next location"
        },
        nextScenes: {
            rest: 'rest',
            travel: 'travel'
        }
    },
    rest: {
        text: "You find a safe spot, away from the eerie whispers of the forest, and settle down to rest. The tension in your body begins to ease, and your mind clears. You feel slightly better, though the dark presence of the forest still looms in the back of your mind.",
        choices: {
            travel: "Continue your journey",
            leave: "Leave the cursed forest"
        },
        nextScenes: {
            travel: 'travel',
            leave: 'leave'
        }
    },
    travel: {
        text: "You set off again, your body tired but determined. The path is long, and though the forest still feels like a presence behind you, you manage to move forward. The world beyond awaits, but the lingering fear of what you’ve experienced here will follow you for a long time.",
        choices: {
            continue: "Continue onward",
            rest: "Stop and rest"
        },
        nextScenes: {
            continue: 'travel',
            rest: 'rest'
        }
    }
};

// Function to load a scene and update story text
function loadScene(scene) {
    const sceneData = storyData[scene];
    const storyText = document.getElementById("story-text");
    storyText.textContent = sceneData.text;

    // Add new choices with animation
    const choicesContainer = document.getElementById("choices-container");
    choicesContainer.innerHTML = '';  // Clear old choices

    Object.keys(sceneData.choices).forEach(choice => {
        const button = document.createElement('button');
        button.className = 'choice';
        button.textContent = sceneData.choices[choice];
        button.onclick = () => makeChoice(choice, scene);
        choicesContainer.appendChild(button);
    });

    // Update stats
    document.getElementById("trust-level").textContent = `Trust: ${state.trust}`;
    document.getElementById("sanity-level").textContent = `Sanity: ${state.sanity}`;
}

// Function to handle the choices
function makeChoice(choice, currentScene) {
    if (choice === 'enter') {
        state.sanity -= 10;
        state.trust -= 5;
    } else if (choice === 'leave') {
        state.sanity += 5;
        state.trust += 5;
    } else if (choice === 'explore') {
        state.sanity -= 5;
    } else if (choice === 'rest') {
        state.sanity += 10;
    } else if (choice === 'take') {
        state.sanity -= 15;
        state.trust -= 10;
    } else if (choice === 'flee') {
        state.sanity -= 5;
        state.trust -= 5;
    } else if (choice === 'resist') {
        state.sanity -= 10;
    } else if (choice === 'surrender') {
        state.sanity -= 20;
        state.trust -= 10;
    } else if (choice === 'escape') {
        state.sanity -= 15;
        state.trust -= 5;
    } else if (choice === 'continue') {
        state.sanity -= 5;
    }

    // Update the walking state and trigger animation if necessary
    if (choice === 'enter') {
        state.walking = true;  // Start walking animation
        startWalkingAnimation();
    }

    // Load the next scene based on the player's choice
    const nextScene = storyData[currentScene].nextScenes[choice];
    if (nextScene) {
        loadScene(nextScene);
    }

    // Check for game over state
    if (state.sanity <= 0 || state.trust <= 0) {
        alert('Your journey ends here... You have succumbed to the forest\'s curse.');
        return;
    }

  
}

// Initialize the game
loadScene('start');
