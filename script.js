// Get references to the input field, send button, and chat box
const chatInput = document.getElementById("chatInput");
const sendButton = document.getElementById("sendButton");
const chatBox = document.getElementById("chatBox");

// Function to create and display a message bubble
function createMessage(content, sender, isLoading = false) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", sender === "user" ? "user-message" : "bot-message");

    const bubbleDiv = document.createElement("div");
    bubbleDiv.classList.add("bubble");

    if (isLoading) {
        const spinner = document.createElement("div");
        spinner.classList.add("spinner"); // Add spinner class for loading animation
        bubbleDiv.appendChild(spinner);  // Show spinner in the bubble
    } else {
        bubbleDiv.innerText = content;  // Display the message content
    }

    messageDiv.appendChild(bubbleDiv);
    chatBox.appendChild(messageDiv);

    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
}

// Function to replace spinner with actual bot response
function replaceSpinnerWithMessage(messageDiv, content) {
    const bubbleDiv = messageDiv.querySelector(".bubble");
    bubbleDiv.innerHTML = "";  // Clear spinner
    bubbleDiv.innerText = content;  // Replace with actual response
}

// Function to handle sending a message
async function sendMessage() {
    const message = chatInput.value.trim();

    if (message !== "") {
        createMessage(message, "user"); // User's message

        chatInput.value = ""; // Clear input field

        // Create a placeholder for bot response with spinner
        const botMessageDiv = document.createElement("div");
        botMessageDiv.classList.add("message", "bot-message");
        const bubbleDiv = document.createElement("div");
        bubbleDiv.classList.add("bubble");
        
        const spinner = document.createElement("div");
        spinner.classList.add("spinner");
        bubbleDiv.appendChild(spinner);
        botMessageDiv.appendChild(bubbleDiv);
        chatBox.appendChild(botMessageDiv); // Add spinner to bot's message bubble

        chatBox.scrollTop = chatBox.scrollHeight; // Scroll to bottom for loading

        try {
            const response = await fetch('/process_query', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ question: message }),
            });

            if (response.ok) {
                const data = await response.json();
                replaceSpinnerWithMessage(botMessageDiv, data.response); // Replace spinner with bot's response
            } else {
                replaceSpinnerWithMessage(botMessageDiv, "Error: Unable to get a response."); // Show error
            }
        } catch (error) {
            console.error('Error:', error);
            replaceSpinnerWithMessage(botMessageDiv, "Error: Unable to get a response."); // Show error
        }
    }
}

// Event listener for the send button click
sendButton.addEventListener("click", sendMessage);

// Event listener for pressing the Enter key to send a message
chatInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        sendMessage();
    }
});