let scale = 1;
let startPos = { x: 0, y: 0 };
let isDragging = false;
let img = document.getElementById("zoomImage");
let container = document.getElementById("imageContainer");

function openImage(imageType) {
    let imageSrc = "";
    if (imageType === "image1") {
        imageSrc = "https://via.placeholder.com/800x600"; // Replace with your image URL
    } else if (imageType === "image2") {
        imageSrc = "https://via.placeholder.com/800x600"; // Replace with your image URL
    } else if (imageType === "image3") {
        imageSrc = "https://via.placeholder.com/800x600"; // Replace with your image URL
    }
    
    // Display the selected image
    img.src = imageSrc;
    img.onload = function() {
        // Initialize zoom and dragging behavior once the image is loaded
        img.style.transform = "scale(1)";
        scale = 1;
        container.style.display = "flex";
        img.style.cursor = "grab";
        container.style.overflow = "hidden"; // Hide overflow while dragging
    };
}

// Handle mouse down event to start dragging
img.addEventListener("mousedown", function(e) {
    if (scale > 1) { // Only allow dragging if zoomed in
        isDragging = true;
        startPos = {
            x: e.clientX,
            y: e.clientY
        };
        img.style.cursor = "grabbing";
    }
});

// Handle mouse move event to drag the image
img.addEventListener("mousemove", function(e) {
    if (isDragging && scale > 1) { // Only allow dragging if zoomed in
        let dx = e.clientX - startPos.x;
        let dy = e.clientY - startPos.y;
        let transform = `translate(${dx}px, ${dy}px) scale(${scale})`;
        img.style.transform = transform;
    }
});

// Handle mouse up event to stop dragging
img.addEventListener("mouseup", function() {
    if (isDragging) {
        isDragging = false;
        img.style.cursor = "grab";
        // Store the current transformation
        let transform = img.style.transform.match(/translate\((.*)px, (.*)px\)/);
        if (transform) {
            startPos = { x: parseFloat(transform[1]), y: parseFloat(transform[2]) };
        }
    }
});

// Handle pinch to zoom for touch devices
img.addEventListener("touchstart", function(e) {
    if (e.touches.length === 2) {
        let startDist = getDistance(e.touches[0], e.touches[1]);
        img.style.transition = "none"; // Disable transition during zoom
        e.preventDefault(); // Prevent default touch actions
    }
});

img.addEventListener("touchmove", function(e) {
    if (e.touches.length === 2) {
        let endDist = getDistance(e.touches[0], e.touches[1]);
        let scaleChange = endDist / startDist;
        scale = Math.min(Math.max(1, scale * scaleChange), 3); // Limit scale
        img.style.transform = `scale(${scale})`;
        e.preventDefault(); // Prevent default touch actions
    }
});

img.addEventListener("touchend", function(e) {
    if (e.touches.length < 2) {
        img.style.transition = "transform 0.1s ease"; // Re-enable transition after zoom
    }
});

// Helper function to calculate the distance between two points
function getDistance(touch1, touch2) {
    let x = touch1.clientX - touch2.clientX;
    let y = touch1.clientY - touch2.clientY;
    return Math.sqrt(x * x + y * y);
}
