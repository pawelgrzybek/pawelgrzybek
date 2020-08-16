const fs = require("fs");

const readmeContent = fs.readFileSync("./README.md", "utf-8").split("\n");

console.log(`👉 readmeContent: ${readmeContent} 👈`);
