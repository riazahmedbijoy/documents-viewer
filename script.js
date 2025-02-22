let scale = 1;
let startDist = 0;
let isDragging = false;
let startX = 0, startY = 0;
let translateX = 0, translateY = 0;

// Load image based on URL when page loads
window.onload = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get("type");
    if (type) showImages(type);
};

function showImages(type) {
    // Update URL without reloading
    history.pushState(null, "", `?type=${type}`);

    let container = document.getElementById("imageContainer");
    let buttons = document.getElementById("buttons");
    let allButtons = buttons.querySelectorAll("button");

    // Hide all buttons
    allButtons.forEach(button => {
        button.style.display = "none";
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
    container.innerHTML += `<button id="backButton" onclick="backToOptions()">Back</button>`;

    // Add event listeners for zoom and drag
    const images = container.querySelectorAll('.zoomable');
    images.forEach(img => {
        img.style.transform = `scale(1) translate(0px, 0px)`;

        // Touch events (mobile)
        img.addEventListener("touchstart", handleTouchStart, { passive: true });
        img.addEventListener("touchmove", handleTouchMove, { passive: true });
        img.addEventListener("touchend", handleTouchEnd, { passive: true });

        // Mouse events (desktop)
        img.addEventListener("mousedown", handleMouseDown);
        img.addEventListener("mousemove", handleMouseMove);
        img.addEventListener("mouseup", handleMouseUp);
        img.addEventListener("mouseleave", handleMouseUp);
    });
}

function handleTouchStart(e) {
    if (e.touches.length === 2) {
        startDist = getDistance(e.touches[0], e.touches[1]);
    } else if (e.touches.length === 1) {
        isDragging = true;
        startX = e.touches[0].clientX - translateX;
        startY = e.touches[0].clientY - translateY;
    }
}

function handleTouchMove(e) {
    const img = e.target;
    if (e.touches.length === 2) {
        let endDist = getDistance(e.touches[0], e.touches[1]);
        let diff = endDist - startDist;
        scale += diff * 0.01;
        scale = Math.min(Math.max(1, scale), 3);
        img.style.transform = `scale(${scale}) translate(${translateX}px, ${translateY}px)`;
        startDist = endDist;
    } else if (e.touches.length === 1 && isDragging) {
        translateX = e.touches[0].clientX - startX;
        translateY = e.touches[0].clientY - startY;
        img.style.transform = `scale(${scale}) translate(${translateX}px, ${translateY}px)`;
    }
}

function handleTouchEnd() {
    isDragging = false;
    startDist = 0;
}

function handleMouseDown(e) {
    isDragging = true;
    startX = e.clientX - translateX;
    startY = e.clientY - translateY;
}

function handleMouseMove(e) {
    if (!isDragging) return;
    const img = e.target;
    translateX = e.clientX - startX;
    translateY = e.clientY - startY;
    img.style.transform = `scale(${scale}) translate(${translateX}px, ${translateY}px)`;
}

function handleMouseUp() {
    isDragging = false;
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

    // Reset URL
    history.pushState(null, "", window.location.pathname);

    // Show all buttons again
    buttons.querySelectorAll("button").forEach(button => {
        button.style.display = "block";
    });

    // Reset zoom and position
    scale = 1;
    translateX = 0;
    translateY = 0;
}
