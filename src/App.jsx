import React, {  useState, createContext, lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { Calendar } from "./elements/calendar/Calendara.jsx";
import { Navigation } from "./elements/navigation/Navigation.jsx";
import { Form } from "./elements/login/Form.jsx";
import { ToDOList } from "./elements/toDoList/ToDoList.jsx";
import { List } from "./elements/toDoList/List.jsx";
import { StyleMode } from "./elements/navigation/StyleMode.jsx";
import { WeatherComponent } from "./elements/weather/WeatherComponent.jsx";
import { useMediaQuery } from "react-responsive";
const LazyDashboard = lazy(() => import("./elements/table/Dashboard.jsx"))


const theme = {
    light: "light",
    dark: 'dark'
}

export const ThemeContext = createContext(theme.light);


const Modal = ({ fn }) => {
    return ReactDOM.createPortal(
        <div className="modal_wrapper">
            <Form setLoginFunction={fn} />
        </div>
        , document.querySelector('#modal'))
}



const Main = () => {
    const weatherComponent = useMediaQuery({ minWidth: 701 });

    return <main id="main">
        <ToDOList />
        <Calendar />
        {weatherComponent && <WeatherComponent />}
    </main>
}




export default function App() {
    const isLogin = localStorage.getItem('login') ? true : false;
    const modeTheme = localStorage.getItem('mode') || 'light';
    const [mode, setMode] = useState(modeTheme);

    const setTheme = () => {
        if (mode === 'light') {
            localStorage.setItem("mode", "dark");
            setMode(() => 'dark');
        }
        else {
            localStorage.setItem("mode", "light");
            setMode(() => 'light');
        }
    }

    const [login, setLogin] = useState(isLogin);

    const handleLogin = () => setLogin(() => localStorage.getItem('login') ? true : false);



    return <ThemeContext.Provider value={theme[mode]}>
        <div>
            <Navigation fn={handleLogin}>
                {<StyleMode
                    theme={mode}
                    handleSwitch={setTheme}
                    mode={mode}
                />}
            </Navigation>
        </div>
        <Routes>
            <Route path='/' element={<Main />} >
                <Route path="/" element={<List />} />
                <Route path="done" element={<List />} />
            </Route>
            <Route path="/dashboard" element={<>
                <Suspense fallback={<div>Загрузка...</div>}>
                    <LazyDashboard />
                </Suspense>
            </>} />
        </Routes>
        {login || <Modal fn={handleLogin} />}
    </ThemeContext.Provider>
}