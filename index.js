const express = require('express');
const net = require('net');
const app = express();
const PORT = 3000;

// Function to check TCP connection and gather detailed information
function checkTcpConnection(host, port, timeout = 5000) {
  return new Promise((resolve, reject) => {
    const socket = new net.Socket();
    const connectionDetails = {};
    const start = Date.now();

    // Set some socket-level options for TCP
    socket.setTimeout(timeout);
    socket.setKeepAlive(true); // Enable TCP keepalive
    socket.setNoDelay(true); // Disable Nagle's algorithm for lower latency

    // Capture the connection state at each event
    socket.on('connect', () => {
      const end = Date.now();
      connectionDetails.handshakeDuration = end - start;
      
      // Gather detailed socket information
      connectionDetails.remoteAddress = socket.remoteAddress;
      connectionDetails.remotePort = socket.remotePort;
      connectionDetails.localAddress = socket.localAddress;
      connectionDetails.localPort = socket.localPort;
      connectionDetails.family = socket.remoteFamily;
      connectionDetails.responseTime = connectionDetails.handshakeDuration;
      
      // Socket options and buffer sizes
      connectionDetails.bufferSize = socket.bufferSize;
      connectionDetails.bytesRead = socket.bytesRead;
      connectionDetails.bytesWritten = socket.bytesWritten;
      connectionDetails.connecting = socket.connecting;
      connectionDetails.destroyed = socket.destroyed;

      // Close the socket after successful connection
      socket.destroy();
      resolve(connectionDetails);
    });

    socket.on('timeout', () => {
      socket.destroy();
      reject(new Error('Connection timed out'));
    });

    socket.on('error', (err) => {
      reject(new Error(`Connection error: ${err.message}`));
    });

    // Initiate the connection
    socket.connect(port, host);
  });
}

// Endpoint to trigger TCP connection check (GET)
app.get('/check-connection', async (req, res) => {
  const host = req.query.host;
  const port = parseInt(req.query.port);

  if (!host || isNaN(port)) {
    return res.status(400).json({ success: false, message: 'Host and port are required' });
  }

  try {
    const connectionInfo = await checkTcpConnection(host, port);
    res.json({
      success: true,
      message: 'TCP connection successful',
      connectionInfo
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

// Serve static HTML for frontend
app.use(express.static('public'));

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});