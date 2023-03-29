import React, { ReactElement } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Login from './pages/LoginLayout'
import Home from './pages/HomeLayout'
import  MyCourse  from './pages/MyCourseLayout'


function Router(): ReactElement {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/my-course/:courseId' element={<MyCourse/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Router