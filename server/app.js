const express = require('express');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve the HTML client
app.use(express.static(path.join(__dirname, 'public')));

// Create a WebSocket server
const server = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    console.log('New WebSocket connection');

    // Send a message to the connected client
    ws.send('Hello from the WebSocket server!');

    // Handle incoming messages
    ws.on('message', (message) => {
        console.log(`Received: ${message}`);

        // Broadcast the message to all connected clients
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(`${message}`);
            }
        });
    });

    // Handle client disconnect
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});
