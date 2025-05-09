// static/script.js

async function sendMessage() {
    const userInput = document.getElementById("user-input");
    const chatWindow = document.getElementById("chat-window");
  
    const message = userInput.value.trim();
    if (!message) return;
  
    // Display user message
    chatWindow.innerHTML += `<div class="message user">🧑‍💬 You: ${message}</div>`;
    chatWindow.scrollTop = chatWindow.scrollHeight;
  
    // Send message to Flask server
    const response = await fetch("/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message })
    });
  
    const data = await response.json();
  
    if (data.answer) {
      // Display bot answer
      chatWindow.innerHTML += `<div class="message bot">🤖 Bot: ${data.answer}</div>`;
      chatWindow.scrollTop = chatWindow.scrollHeight;
    } else {
      chatWindow.innerHTML += `<div class="message bot">⚠️ Error getting response.</div>`;
    }
  
    // Clear input
    userInput.value = "";
  }
  