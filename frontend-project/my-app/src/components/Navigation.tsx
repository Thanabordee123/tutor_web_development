import { ReactComponent as BoxIcon } from "../assets/icons/BoxIcon.svg";
import { ReactElement, useState, useEffect } from 'react'
import { Link, useNavigate} from 'react-router-dom'

interface Navigation {
  onClickSignInBtn: (isShowModal : boolean) => void
}  

function Nav({ onClickSignInBtn }:Navigation) {
  const navigate = useNavigate();

  interface CourseList {
    id: number,
    courseName: string
  }

  const allCourse : Array<CourseList> = [
    {
        id:1,
        courseName:"CalculusI Full-Course"
    },
    {
        id:2,
        courseName:"CalculusI Mid-Term"
    },
    {
        id:3,
        courseName:"CalculusI Final"
    }
  ]

  const [isShowProfileDropdown, setIsShowProfileDropdown] = useState<boolean>(false)
  const [isShowMyCourseDropdown, setIsShowMyCourseDropdown] = useState<boolean>(false)
  const [isHavePermission, setIsHavePermission] = useState<boolean>(false)
  const [isShowLogin, setIsShowLogin] = useState<boolean>(false)

  useEffect(() => {
    updateShowLoginData()
  }, [])

  const updateShowLoginData = () => {
    setIsShowLogin(true)
    onClickSignInBtn(isShowLogin)
  }

  const navToHome = () => {
    navigate('/')
  }

  const navToCourse = (courseIdParam: Number) => {
    navigate(`/my-course/courseId=${courseIdParam}`)
  }

  return (
    <nav className="flex items-center justify-between flex-wrap bg-hard-dark-blue	p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <BoxIcon className="w-10 h-10"/>
        <span className="font-semibold text-teal-200 text-xl tracking-tight m-2">
          คณิต นายโอม
        </span>
      </div>
      <div className="block lg:hidden">
        <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <a
            className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-teal-200 mr-4 cursor-pointer"
            onClick={() => navToHome()}
          >
            หน้าหลัก
          </a>
          <a
            className="relative block mt-4 lg:inline-block lg:mt-0 text-white hover:text-teal-200 mr-4 cursor-pointer"
            onClick={() => setIsShowMyCourseDropdown(!isShowMyCourseDropdown)}
          >
            คอร์สเรียนของฉัน
            <div className="relative inline-block text-left">
                <div
                className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabIndex={1}
                >
                    { 
                        isShowMyCourseDropdown ?
                        <div className="py-1" role="none">
                          {allCourse.map((course, index) => (
                             <a
                             className={`text-gray-700 block px-4 py-2 text-sm hover:text-gray-400 ${index < allCourse.length - 1 ? "border-b" : ""}`}
                             role="menuitem"
                             tabIndex={index+1}
                             id={`menu-item-${index}`}
                             onClick={() => navToCourse(course.id)}
                            >
                             {course.courseName}
                            </a>
                          ))}
                        </div>
                        : ''
                    }
                </div>
            </div>
          </a>
        </div>

        <div className="relative inline-block text-left">
          {
            isHavePermission ?
            <div>
              <button
                type="button"
                className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-cyan-900 focus:ring-offset-2 focus:ring-offset-white"
                id="menu-button"
                aria-expanded="true"
                aria-haspopup="true"
                onClick={() => setIsShowProfileDropdown(!isShowProfileDropdown)}
              >
                โปรไฟล์
                <svg
                  className="-mr-1 ml-2 h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>
            : 
            <div>
              <button
                type="button"
                className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-cyan-900 focus:ring-offset-2 focus:ring-offset-white"
                id="menu-button"
                aria-expanded="true"
                aria-haspopup="true"
                onClick={() => updateShowLoginData()}
              >
                เข้าสู่ระบบ
              </button>
            </div>
          }

          <div
            className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabIndex={1}
          >
            { 
                isShowProfileDropdown && isHavePermission ?
                <div className="py-1" role="none">
                    <a
                        href="#"
                        className="text-gray-700 block px-4 py-2 text-sm"
                        role="menuitem"
                        tabIndex={1}
                        id="menu-item-0"
                    >
                        ตั้งค่าโปรไฟล์
                    </a>
                    <a
                        href="#"
                        className="text-gray-700 block px-4 py-2 text-sm"
                        role="menuitem"
                        tabIndex={1}
                        id="menu-item-2"
                    >
                        แจ้งปัญหาการใช้งาน
                    </a>
                    <form method="POST" action="#" role="none">
                        <button
                        type="submit"
                        className="text-gray-700 block w-full px-4 py-2 text-left text-sm"
                        role="menuitem"
                        tabIndex={1}
                        id="menu-item-3"
                        onClick={() => navigate('/login')}
                        >
                        ออกจากระบบ
                        </button>
                    </form>
                </div>
                :''
            }

          </div>
        </div>

      </div>
    </nav>
  );
}

export default Nav;
