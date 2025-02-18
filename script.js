let scale = 1;
let startDist = 0;
let startPos = { x: 0, y: 0 };
let isDragging = false;

function showImages(type) {
    let container = document.getElementById("imageContainer");
    let buttons = document.getElementById("buttons");
    let allButtons = buttons.querySelectorAll("button");

    // Hide all buttons except the one clicked
    allButtons.forEach(button => {
        button.style.display = "none";  // Hide all options
    });

    container.innerHTML = ""; // Clear previous images

    if (type === "license") {
        container.innerHTML = `
            <h3>Driving Licence</h3>
            <img src="https://i.imgur.com/CBZ6eMf.jpeg" alt="Driving Licence Front" class="zoomable">
            <img src="https://i.imgur.com/CWUpy3Y.jpeg" alt="Driving Licence Back" class="zoomable">
        `;
    } else if (type === "registration") {
        container.innerHTML = `
            <h3>Bike Registration Card</h3>
            <img src="https://i.imgur.com/18wIbSO.jpeg" alt="Bike Registration Card Front" class="zoomable">
            <img src="https://i.imgur.com/7NOYeWt.jpeg" alt="Bike Registration Card Back" class="zoomable">
        `;
    } else if (type === "tax") {
        container.innerHTML = `
            <h3>Tax Token</h3>
            <img src="https://i.imgur.com/SockYv9.jpeg" alt="Tax Token" class="zoomable">
        `;
    }

    // Add the back button
    container.innerHTML += `
        <button id="backButton" onclick="backToOptions()">Back</button>
    `;

    // Add pinch-to-zoom and pan functionality
    const images = container.querySelectorAll('.zoomable');
    images.forEach(img => {
        img.addEventListener("touchstart", handleTouchStart, { passive: true });
        img.addEventListener("touchmove", handleTouchMove, { passive: true });
        img.addEventListener("touchend", handleTouchEnd, { passive: true });
        img.addEventListener("mousedown", handleMouseDown);
        img.addEventListener("mousemove", handleMouseMove);
        img.addEventListener("mouseup", handleMouseUp);
    });
}

function handleTouchStart(e) {
    if (e.touches.length === 2) {
        startDist = getDistance(e.touches[0], e.touches[1]);
    } else if (e.touches.length === 1) {
        isDragging = true;
        startPos = {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY
        };
    }
}

function handleTouchMove(e) {
    if (e.touches.length === 2) {
        let endDist = getDistance(e.touches[0], e.touches[1]);
        let diff = endDist - startDist;
        scale += diff * 0.01;  // Adjust zoom sensitivity
        scale = Math.min(Math.max(1, scale), 3); // Limit scale to prevent extreme zoom
        e.target.style.transform = `scale(${scale})`;
        startDist = endDist;
    } else if (e.touches.length === 1 && isDragging) {
        let dx = e.touches[0].clientX - startPos.x;
        let dy = e.touches[0].clientY - startPos.y;
        let img = e.target;
        img.style.transform += `translate(${dx}px, ${dy}px)`;
    }
}

function handleTouchEnd() {
    startDist = 0;  // Reset when touch ends
    isDragging = false; // Reset dragging state
}

function getDistance(touch1, touch2) {
    let x = touch1.clientX - touch2.clientX;
    let y = touch1.clientY - touch2.clientY;
    return Math.sqrt(x * x + y * y);
}

function backToOptions() {
    let container = document.getElementById("imageContainer");
    let buttons = document.getElementById("buttons");
    container.innerHTML = "";
    // Show all buttons again
    buttons.querySelectorAll("button").forEach(button => {
        button.style.display = "block";
    });
}

// Mouse-based dragging support
function handleMouseDown(e) {
    isDragging = true;
    startPos = {
        x: e.clientX,
        y: e.clientY
    };
}

function handleMouseMove(e) {
    if (isDragging) {
        let dx = e.clientX - startPos.x;
        let dy = e.clientY - startPos.y;
        let img = e.target;
        img.style.transform += `translate(${dx}px, ${dy}px)`;
        startPos = {
            x: e.clientX,
            y: e.clientY
        };
    }
}

function handleMouseUp() {
    isDragging = false;
}
