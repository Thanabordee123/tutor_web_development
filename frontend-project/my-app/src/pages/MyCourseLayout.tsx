import SideBar from "../components/SideBar";
import Footer from "../components/Footer";
import DisplayVdo from "../components/DisplayVdo"
import Nav from "../components/Navigation"
import { useState } from "react"

function MyCourse () {
    const [isShowLoginModal, setIsShowLoginModal] = useState<boolean>(false)
    const [courseName, setCourseNames] = useState<string>("")
    const [courseTopic, setCourseTopic] = useState<string>("")
    const [vdoUrl, setVdoUrl] = useState<string>("")
 
    const updateIsshowModalDataFromNav = (isShowModal:boolean) => {
        setIsShowLoginModal(isShowModal)
    }

    const vdoUrlData = (courseNames:string, courseTopic:string, vdoUrl:string) => {
        setCourseNames(courseNames)
        setCourseTopic(courseTopic)
        setVdoUrl(vdoUrl)
    }

    return (
        <div className='w-screen h-screen'>
            <div className='bg-dark-blue'>
                <Nav onClickSignInBtn={updateIsshowModalDataFromNav}/>
                <div className="flex">
                    <SideBar
                        onClickSubMenu={vdoUrlData}
                    />
                    <DisplayVdo
                        courseName={courseName}
                        courseTopic={courseTopic}
                        vdoLink={vdoUrl}
                    />
                </div>
                <Footer/>
            </div>
        </div>
    );
}

export default MyCourse