const { app, BrowserWindow, Menu } = require("electron");
const path = require("path");

if (require("electron-squirrel-startup")) {
  app.quit();
}

app.on("certificate-error", (event, webContents, url, error, certificate, callback) => {
  event.preventDefault();
  callback(true);
});

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: "assets/TeamTracker.png",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  const mainSession = mainWindow.webContents.session;

  mainSession.clearCache(() => {
    mainSession.setCacheEnabled(true);
  });

  mainWindow.loadURL("https://team-tracker.duckdns.org/");
};

app.on("ready", () => {
  createWindow();
  Menu.setApplicationMenu(null);
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});