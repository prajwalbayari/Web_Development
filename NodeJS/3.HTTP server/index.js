const http = require("http");
const fs = require("fs");
const url = require("url");

const myServer = http.createServer((req, res) => {
  if (req.url === "/favicon.ico") {
    return res.end(); // Ignore favicon request
  }
  const log = `\n${Date.now()} - New request received: ${req.method} ${
    req.url
  }\n`;
  const myUrl = url.parse(req.url, true);
  console.log("URL is: :", myUrl);

  fs.appendFile("server.log", log, (err) => {
    if (err) {
      console.error("Error writing to log file:", err);
    }
    switch (myUrl.pathname) {
      case "/":
        res.end("Welcome to the home page");
        break;
      case "/about":
        const name = myUrl.query.name || "Guest";
        res.end(`Welcome to the about page, ${name}!`);
        break;
      case "/search":
        const searchQuery =
          myUrl.query.search_query || "No search query provided";
        res.end(`Search results for: ${searchQuery}`);
        break;
      default:
        res.end("Page not found");
    }
  });
});

myServer.listen(8000, () => {
  console.log("Server is running on port 8000");
});

myServer.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(
      `Port 8000 is already in use. Please try a different port or stop the existing process.`
    );
    process.exit(1);
  } else {
    console.error("Server error:", err);
  }
});

process.on("SIGINT", () => {
  console.log("\nShutting down server...");

  myServer.close(() => {
    console.log("Server closed successfully");

    try {
      fs.truncateSync("server.log", 0, () => {
        console.log("Log file truncated successfully");
      });
    } catch (err) {
      console.error("Error truncating log file:", err);
    }

    console.log("Port 8000 is now free");
    process.exit(0);
  });
});

process.on("SIGTERM", () => {
  console.log("\nReceived SIGTERM, shutting down...");

  myServer.close(() => {
    console.log("Server closed successfully");
    console.log("Port 8000 is now free");
    process.exit(0);
  });
});
