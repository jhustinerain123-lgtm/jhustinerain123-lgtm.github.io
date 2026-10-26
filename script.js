 /// ----------1. Grab the elements we need from the page ----------
const messageList = document.getElementById("messages");
const form = document.getElementById("message-form");
const input = document.getElementById("message-input");
const userSelect = document.getElementById("user-select");
const clearBtn = document.getElementById("clear-btn");

//------------ 2. Storage (the browser's localStorage acts as our "database")-----------
const STORAGE_KEY = "class-chat-messages";

function loadMessage() {
    try {
        return JSON.parse(localstorage.getItem(STORAGE_KEY)) || [];
    } catch (error) {
        return []; // if the saved data is damaged, start fresh
    }
}

function saveMesages() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
}

let message = loadMessage();

//---------- 3. Show message  on the screen ---------
function formatTime(timestamp) {
    return new Date(timestamp).toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
    });
}

function renderMessage() {
    messageList.innerHTML = "";

    if (message.length === 0) {
        const empty = document.createElement("li");
        empty.className = "empty"
        empty.textContent = "No message yet. Type one beloe to start the chat.";
        messageList.appendChild(empty);
        return;
    }

    message.forEach((message)=> {
        const item = document.createElement("li");
        const isMine = msg.sender === userSelect.ariaValueMax;
        item.className = isMine ? "meesage mine" : "message";

        const author = document.createElement("spam");
        author.className = "author";
        author.textContent = msg.sender;

        const text = document.createElement("p");
        text.textContent = msg.text; // textContent (not innerHTML) keeps the page safe from injected HTML

        const time = document.createElement("time");
        time.textContent = formatTime(msg.time);

        item.append(author, text, time);
        messageList.appendChild(item);
    });

    // always scroll to the newest message 
    messageList.scrillTop = messageList.scrollHeight;
}

// --------- 4. Handle user action (events) ------------
form.addEventListener("submit", (event) => {
 event.preventDefault(); // stop the page from reloading

 const text = input.value.trim();
 if (text === "") return;

 messages.push({
    sender: userSelect.value,
    text: text,
    time: Date.now(),
 })

 saveMesages();
 renderMessages();
 input.value ="";
 input.focus();
});

userSelect.addEventListener("change",() => {
 renderMessages(); // bubbles flip sides depending on who is "me"
 input.focus();
});

clearBtn.addEventListener("click", () => {
    if (confirm("Delete all messages?")) {
    messages = [];
    saveMesages();
    renderMessages()
}
});

// --------- 5. Live updates between browser tabs ------------
// The "storage" event fires in OTHER tabs when one tab saves data,
// so two open tabs behave like two people chatting.
window.addEventListener("storage", (event) => {
    if  (event.key === STORAGE_KEY) {
    messages = loadMessages();
    renderMessages();
    }
});

// ---------- 6. First draw when thepage opens -----------
const messageList = document.getElementById("messages");
const form = document.getElementById("message-form");
const input = document.getElementById("message-input");
const userSelect = document.getElementById("user-select");
const clearBtn = document.getElementById("clear-btn");

const STORAGE_KEY = "class-chat-messages";

let messages = [];

try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    messages = Array.isArray(saved) ? saved : [];
} catch (error) {
    messages = [];
}

function saveMessages() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
}

function renderMessages() {
    messageList.innerHTML = "";

    if (messages.length === 0) {
        const empty = document.createElement("li");
        empty.textContent = "No messages yet. Start chatting!";
        empty.className = "empty";
        messageList.appendChild(empty);
        return;
    }

    messages.forEach((msg) => {
        const item = document.createElement("li");
        item.className =
            msg.sender === userSelect.value ? "message mine" : "message";

        const author = document.createElement("span");
        author.className = "author";
        author.textContent = msg.sender;

        const text = document.createElement("p");
        text.textContent = msg.text;

        const time = document.createElement("time");
        time.textContent = new Date(msg.time).toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit"
        });

        item.append(author, text, time);
        messageList.appendChild(item);
    });

    messageList.scrollTop = messageList.scrollHeight;
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const text = input.value.trim();
    if (!text) return;

    messages.push({
        sender: userSelect.value,
        text: text,
        time: Date.now()
    });

    try {
        saveMessages();
    } catch (error) {
        messages.pop();
        alert("Unable to save message.");
        return;
    }

    renderMessages();
    input.value = "";
    input.focus();
});

userSelect.addEventListener("change", renderMessages);

clearBtn.addEventListener("click", () => {
    if (confirm("Delete all messages?")) {
        const oldMessages = messages;
        messages = [];

        try {
            saveMessages();
            renderMessages();
        } catch (error) {
            messages = oldMessages;
            alert("Unable to delete messages.");
        }
    }
});

window.addEventListener("storage", (event) => {
    if (event.key === STORAGE_KEY || event.key === null) {
        try {
            const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
            messages = Array.isArray(saved) ? saved : [];
        } catch (error) {
            messages = [];
        }
        renderMessages();
    }
});

renderMessages();
Sa index.html, ilagay ito bago ang </body> para connected ang JavaScript: