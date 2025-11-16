import { contextBridge, ipcRenderer } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';

// custom API object, contains persistence functions
const persistenceAPI = {
    readUserData: () => ipcRenderer.invoke('read-user-data'),
    writeUserData: (config) => ipcRenderer.invoke('write-user-data', config)
};

// expose the APIs to the renderer's global
if (process.contextIsolated) {
    try {
        contextBridge.exposeInMainWorld('electron', electronAPI);
        contextBridge.exposeInMainWorld('electronAPI', persistenceAPI);
    } catch (error) {
        console.error(error);
    }
} else {
    // fallback for context isolation disabled
    window.electron = electronAPI;
    window.electronAPI = persistenceAPI;
}
