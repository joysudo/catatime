import CatCup from './pages/CatCup';

function App() {
  const ipcHandle = () => window.electron.ipcRenderer.send('ping')

  return (
    <CatCup />
  )
}

export default App
