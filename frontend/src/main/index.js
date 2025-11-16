import { app, shell, BrowserWindow, ipcMain } from 'electron';
import { join } from 'path';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';
import icon from '../../resources/icon.png?asset';
import * as fs from 'fs/promises';
import * as path from 'path';

const DATA_FILENAME = 'user_config.json';
const DEFAULT_CONFIG = {
    currency: 0,
    ownedItems: [],
    slackId: '',
    maxHours: 2 * 60 * 60,
    themeColor: 'pink',
};

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: is.dev
        ? join(process.cwd(), 'src', 'preload', 'index.js')
        : join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors');

app.whenReady().then(() => {
    const userPath = app.getPath('userData');
    const fullPath = path.join(userPath, DATA_FILENAME);
    console.log("Using config file:", fullPath);

    electronApp.setAppUserModelId('com.electron');

    app.on('browser-window-created', (_, window) => {
        optimizer.watchWindowShortcuts(window);
    });

    ipcMain.on('ping', () => console.log('pong'));

    ipcMain.handle('read-user-data', async () => {
      try {
        const data = await fs.readFile(fullPath, 'utf8');

        if (!data.trim()) {
          console.warn("Config file empty → using defaults.");
          return DEFAULT_CONFIG;
        }

        return JSON.parse(data);

      } catch (error) {
        if (error.code === 'ENOENT') {
          console.log('Config not found → using defaults.');
          return DEFAULT_CONFIG;
        }
        console.error("Bad config → using defaults.", error);
        return DEFAULT_CONFIG;
      }
    });

    ipcMain.handle('write-user-data', async (event, configData) => {
        try {
            const jsonString = JSON.stringify(configData, null, 2);
            await fs.writeFile(fullPath, jsonString);
            return { success: true };
        } catch (error) {
            console.error('Failed to write user data:', error);
            return { success: false, error: error.message };
        }
    });

    createWindow();

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
