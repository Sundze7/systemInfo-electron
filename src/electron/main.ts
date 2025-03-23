import { app, BrowserWindow } from "electron";
import path from "path";
import { isDev } from "./util.js";

// type test = string;

app.on("ready", () => {
  const mainWindow = new BrowserWindow({});
  //app.getAppPath() -> gets the correct path and loads the index file for our app, regardless where the project is run
  //path.join() -> vital for windows OS, cuz it doesn't accept "/" in path
  if (isDev()) {
    mainWindow.loadURL("http://localhost:5123");
  } else {
    mainWindow.loadFile(path.join(app.getAppPath() + "/dist-react/index.html"));
  }
});
