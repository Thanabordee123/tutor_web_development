import { ReactComponent as LeftChevronIcon } from '../assets/icons/LeftChevronIcon.svg'
import { ReactComponent as RightChevronIcon } from '../assets/icons/RightChevronIcon.svg'
import { ReactComponent as DownChevronIcon } from '../assets/icons/DownChevronIcon.svg'
import { ReactComponent as UpChevronIcon } from '../assets/icons/UpChevronIcon.svg'
import { ReactComponent as BookIcon } from '../assets/icons/BookIcon.svg'
import { ReactComponent as TermIcon } from '../assets/icons/TermIcon.svg'
import { ReactComponent as ListIcon } from '../assets/icons/ListIcon.svg'
import { ReactComponent as GrowthIcon } from '../assets/icons/GrowthIcon.svg'
import { ReactComponent as DotIcon } from '../assets/icons/DotIcon.svg'
import { useState, ReactNode, useEffect } from 'react'
import { useParams } from "react-router-dom";


interface ISubMenu {
    subMenuId: number,
    subMenuName: string,
    vdoUrl: string
}

interface IMenu {
    menuId: number,
    menuName: string,
    subMenu: Array<ISubMenu>, 
    leftIcon: ReactNode,
    rightIcon?: ReactNode,
}

interface ICourse {
    courseId:string,
    courseName:string,
    menu:Array<IMenu>
}

interface IVdoData {
    onClickSubMenu: (courseName:string, topic:string, vdoUrl:string) => void
  }  


function SideBar({ onClickSubMenu }:IVdoData) {
    const [isOpen, setIsOpen] = useState<boolean>(true)
    const [isOpenSubMenu, setIsOpenSubMenu] = useState<boolean>(false)
    const [checkedMenuItems, setCheckedMenuItems] = useState<Array<number>>([])
    const [checkedSubMenuItems, setCheckedSubMenuItems] = useState<Array<number>>([])
    const [selectedSubMenu, setSelectedSubMenu] = useState<string>("");
    const [courseNames, setCourseNames] = useState<string>("");
    const [courseTopic, setCourseTopic] = useState<string>("");



    const { courseId } = useParams()
    const courseIdParam = courseId?.split("=")[1];

    const courseLists: Array<ICourse> = [
        {
            courseId: "1",
            courseName:"Calculus I (Full-course)",
            menu:[
                {
                    menuId: 1,
                    menuName: "Midterm",
                    subMenu: [
                        {
                            subMenuId: 1,
                            subMenuName: "Limit of function",
                            vdoUrl: "https://www.youtube.com/watch?v=EkOcPuBcMxQ"
                        },
                        {
                            subMenuId: 2,
                            subMenuName: "Derivative by theorem",
                            vdoUrl: "https://www.youtube.com/watch?v=Ip6cw8gfHHI"
                        },
                        {
                            subMenuId: 3,
                            subMenuName: "Derivative technique",
                            vdoUrl: "https://www.youtube.com/watch?v=MwpMEbgC7DA"
                        },
                    ], 
                    leftIcon: <TermIcon/>,
                    rightIcon: <UpChevronIcon/>,
                },
                {
                    menuId: 2,
                    menuName: "Final",
                    subMenu: [
                        {
                            subMenuId: 1,
                            subMenuName: "Polar coordinate",
                            vdoUrl: "xxx"
                        },
                        {
                            subMenuId: 2,
                            subMenuName: "Integral technique",
                            vdoUrl: "xxx1"
                        },
                        {
                            subMenuId: 3,
                            subMenuName: "Integral graph",
                            vdoUrl: "xxx2"
                        },
                    ], 
                    leftIcon: <ListIcon/>,
                    rightIcon: <UpChevronIcon/>,
                },
                {
                    menuId: 3,
                    menuName: "Basic",
                    subMenu: [
                        {
                            subMenuId: 1,
                            subMenuName: "Basic1",
                            vdoUrl: "xxx"
                        },
                        {
                            subMenuId: 2,
                            subMenuName: "Basic2",
                            vdoUrl: "xxx1"
                        },
                        {
                            subMenuId: 3,
                            subMenuName: "Basic3",
                            vdoUrl: "xxx2"
                        },
                    ], 
                    leftIcon: <GrowthIcon/>,
                    rightIcon: <UpChevronIcon/>,
                }
            ]
        },
        {
            courseId: "2",
            courseName:"High School",
            menu:[
                {
                    menuId: 1,
                    menuName: "Midterm",
                    subMenu: [
                        {
                            subMenuId: 1,
                            subMenuName: "test1",
                            vdoUrl: "xxx"
                        },
                        {
                            subMenuId: 2,
                            subMenuName: "test2",
                            vdoUrl: "xxx1"
                        },
                        {
                            subMenuId: 3,
                            subMenuName: "test3",
                            vdoUrl: "xxx2"
                        },
                    ], 
                    leftIcon: <TermIcon/>,
                    rightIcon: <UpChevronIcon/>,
                }
            ]
        }
    ]

    const selectMenuItem = (itemId:number) => {
        if (checkedMenuItems.includes(itemId)){
            setCheckedMenuItems(checkedMenuItems.filter((id) => id!==itemId))
        } else {
            setCheckedMenuItems([...checkedMenuItems, itemId])
        }
    }

    const selectedSubMenuItem = (menuId:number, subMenuId:number, courseName:string, topic:string, vdoUrl:string) => {
        setCheckedSubMenuItems(prevState => ({
            ...prevState,
            [menuId]: subMenuId
        }));
        setCourseNames(courseName)
        setCourseTopic(topic)
        setSelectedSubMenu(vdoUrl)
        onClickSubMenu(courseNames, courseTopic, selectedSubMenu)
    }

    console.log(checkedSubMenuItems)

    return (
        <div className={` ${ isOpen? "w-80" : "w-16" } duration-500 h-screen bg-light-blue border-light-blue rounded-md`}>
            <div className="flex justify-end p-3">
                <div className="flex justify-end w-8 h-8 rounded-full bg-light-blue hover:bg-gray-600 cursor-pointer border border-white">
                    {
                        isOpen ?
                            <LeftChevronIcon 
                                className="w-8 h-8"
                                onClick={() => setIsOpen(!isOpen)}
                            />
                        :
                            <RightChevronIcon
                                className="w-8 h-8"
                                onClick={() => setIsOpen(!isOpen)}
                            />
                    }
                    
                </div>
            </div>
            <ul className="mt-2 flex flex-col gap-2">
                {courseLists.filter(course => course.courseId === courseIdParam).map((course) => (
                    <li 
                        className="text-base text-white font-medium"
                    >  
                        <h2 className={`whitespace-pre duration-500 p-2 ${ !isOpen && "opacity-0 translate-x-28 overflow-hidden" }`}>
                            {course.courseName}
                        </h2>
                        {course.menu.map((menuItem) => (
                            <div className="text-base text-white hover:bg-gray-600 cursor-pointer font-medium p-2 hover: bg-light-blue rounded-md">
                                <div className="flex item-center gap-3.5">
                                    <div>
                                        {menuItem.leftIcon}
                                    </div>
                                    <h2
                                        className={`whitespace-pre duration-500 ${ !isOpen && "opacity-0 translate-x-28 overflow-hidden" }`}
                                    >
                                        {menuItem.menuName}
                                    </h2>
                                    <div
                                        className={`whitespace-pre duration-500 ${ !isOpen && "opacity-0 translate-x-28 overflow-hidden" }`}
                                        onClick={() => selectMenuItem(menuItem.menuId)} 
                                    >
                                        {checkedMenuItems.includes(menuItem.menuId) ? <UpChevronIcon/> : <DownChevronIcon/>}
                                    </div>
                                </div>
                                {checkedMenuItems.includes(menuItem.menuId) && menuItem.subMenu && (
                                    <ul className="flex-col px-10">
                                        {menuItem.subMenu.map((subItem) =>(
                                            <li 
                                                className={`text-base font-normal ${subItem.subMenuId === checkedSubMenuItems[menuItem.menuId] ? "text-teal-200" : "text-white"} hover:text-teal-200`}
                                            >
                                                <div className="flex item-center gap-1">
                                                    <div className={`whitespace-pre duration-500 ${ !isOpen && "opacity-0 translate-x-28 overflow-hidden" }`}>
                                                        <DotIcon/>
                                                    </div>
                                                    <span 
                                                        className={`whitespace-pre duration-500 ${ !isOpen && "opacity-0 translate-x-28 overflow-hidden" }`}
                                                        onClick={() => selectedSubMenuItem(menuItem.menuId, subItem.subMenuId, course.courseName, subItem.subMenuName, subItem.vdoUrl)}
                                                        >
                                                        {subItem.subMenuName}
                                                    </span>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SideBar