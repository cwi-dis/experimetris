const electron = require("electron");
// Module to control application life.
const { app, Menu } = electron;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

const path = require("path");
const url = require("url");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1440,
    height: 920,
    title: app.name,
    titleBarStyle: "hidden"
  });

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, "index.html"),
    protocol: "file:",
    slashes: true
  }));

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  let menuTemplate = [{
    label: "View",
    submenu: [
      {role: "reload"},
      {role: "forcereload"},
      {role: "toggledevtools"},
      {type: "separator"},
      {role: "resetzoom"},
      {role: "zoomin"},
      {role: "zoomout"},
      {type: "separator"},
      {role: "togglefullscreen"}
    ]
  }];

  if (process.platform === "darwin") {
    menuTemplate.unshift({
      label: app.name,
      submenu: [
        {role: "about"},
        {type: "separator"},
        {role: "services", submenu: []},
        {type: "separator"},
        {role: "hide"},
        {role: "hideothers"},
        {role: "unhide"},
        {type: "separator"},
        {role: "quit"}
      ]
    });
  }

  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);

  // Emitted when the window is closed.
  mainWindow.on("closed", function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", function () {
  app.quit();
});

app.on("activate", function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
