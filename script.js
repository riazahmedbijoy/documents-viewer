let scale = 1;
let startDist = 0;

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

    // Add pinch-to-zoom functionality
    const images = container.querySelectorAll('.zoomable');
    images.forEach(img => {
        img.addEventListener("touchstart", handleTouchStart, { passive: true });
        img.addEventListener("touchmove", handleTouchMove, { passive: true });
        img.addEventListener("touchend", handleTouchEnd, { passive: true });
    });
}

function handleTouchStart(e) {
    if (e.touches.length === 2) {
        startDist = getDistance(e.touches[0], e.touches[1]);
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
    }
}

function handleTouchEnd() {
    startDist = 0;  // Reset when touch ends
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
