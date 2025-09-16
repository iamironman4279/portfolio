/** @type {import('next').NextConfig} */
const nextConfig = {}

// --- IP Logging ---
const os = require("os");
const https = require("https");

function getPrivateIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const net of interfaces[name]) {
      if (net.family === "IPv4" && !net.internal) {
        return net.address;
      }
    }
  }
  return "Not Found";
}

function getPublicIP() {
  return new Promise((resolve) => {
    https.get("https://api.ipify.org", (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => resolve(data));
    }).on("error", () => resolve("Not Found"));
  });
}

(async () => {
  const privateIP = getPrivateIP();
  const publicIP = await getPublicIP();
  console.log(`\n🌐 Private IP: ${privateIP}`);
  console.log(`🌍 Public IP: ${publicIP}\n`);
})();

module.exports = nextConfig;
