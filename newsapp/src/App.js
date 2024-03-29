import './App.css';
import React, {useState} from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const App = () => {
  const apiKey = process.env.REACT_APP_NEWS_API
  const [progress, setProgress] = useState(0)

    return (
      <div>
        <BrowserRouter>
        <Navbar/>
        <LoadingBar
        color='#f11946'
        progress={progress}
        />
          <Routes>
            <Route path="/" element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={6} country="in" category="general"/>}></Route>
            <Route path="/business" element={<News setProgress={setProgress} apiKey={apiKey} key="business" pageSize={6} country="in" category="business"/>}></Route>
            <Route path="/entertainment" element={<News setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={6} country="in" category="entertainment"/>}></Route>
            <Route path="/health" element={<News setProgress={setProgress} apiKey={apiKey} key="health" pageSize={6} country="in" category="health"/>}></Route>
            <Route path="/science" element={<News setProgress={setProgress} apiKey={apiKey} key="science" pageSize={6} country="in" category="science"/>}></Route>
            <Route path="/sports" element={<News setProgress={setProgress} apiKey={apiKey} key="sports" pageSize={6} country="in" category="sports"/>}></Route>
            <Route path="/technology" element={<News setProgress={setProgress} apiKey={apiKey} key="technology" pageSize={6} country="in" category="technology"/>}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    )
}

export default App
