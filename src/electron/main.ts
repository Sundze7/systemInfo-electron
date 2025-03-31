import { app, BrowserWindow } from "electron";
import { ipcHandle, isDev } from "./util.js";
import { getStaticData, pollResources } from "./resourceManager.js";
import { getPreloadPath, getUIPath } from "./pathResolver.js";

// type test = string;

app.on("ready", () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: getPreloadPath(),
    },
  });
  //app.getAppPath() -> gets the correct path and loads the index file for our app, regardless where the project is run
  //path.join() -> vital for windows OS, cuz it doesn't accept "/" in path
  if (isDev()) {
    mainWindow.loadURL("http://localhost:5123");
  } else {
    mainWindow.loadFile(getUIPath());
  }
  pollResources(mainWindow);

  ipcHandle("getStaticData", () => {
    return getStaticData();
  });
});
