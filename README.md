# TCP Connection Checker

This is a simple web application that checks the TCP connection to a specified host and port. It provides an intuitive user interface to enter the host and port details, making it easy to verify connectivity.

## Features

- **Input Form**: Users can enter a host and port to check the connection.
- **API Access**: Utilizes a RESTful API to perform the connection check.
- **Prettified JSON Output**: Displays detailed connection information in a user-friendly format.
- **Popular Ports**: Provides quick access buttons for commonly used ports for convenience.

## Technologies Used

- HTML
- CSS (Tailwind CSS)
- JavaScript
- Fetch API

## Installation

To run this project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/aamitn/tcp-connection-checker.git
   ```
   
2. **Navigate to the project directory**:
   ```bash
   cd tcp-connection-checker
   ```
3. **Get Dependencies**:
   ```bash
   npm install 
   ```
   
3. **Run Program** (use a mature process manager like pm2 for prod):
   ```bash
   node index.js 
   ```
   
   
4. Navigate to **http://localhost:3000 ** 



## API
The application communicates with the following API endpoint:
 ```bash
GET /check-connection?host=<host>&port=<port>: Checks the TCP connection to the specified host and port. ```


## Contributing
Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

- **Fork the repository.**
- **Create a new branch (git checkout -b feature-branch).**
- **Make your changes and commit them (git commit -m 'Add some feature').**
- **Push to the branch (git push origin feature-branch).**
- **Create a new Pull Request.**