import Nav from '../components/Navigation'
import Footer from '../components/Footer'
import LoginPopup from '../components/LoginPopup'
import { useEffect, useState } from 'react'
import { IUserCommentList } from '../interfaces/userComment'
import CommentLists from '../components/CommentLists'
import { ReactComponent as DisplayIcon } from '../assets/icons/DisplayIcon.svg'
import CourseLists from '../components/CourseLists'
import { ICourseLists } from '../interfaces/courseLists'
import { ReactComponent as InformationIcon } from '../assets/icons/InformationIcon.svg'
import { ReactComponent as PaymentIcon } from '../assets/icons/PaymentIcon.svg'
import { ReactComponent as TiktokIcon } from '../assets/icons/TiktokIcon.svg'
import { ReactComponent as FacebookIcon } from '../assets/icons/FacebookIcon.svg'
import { ReactComponent as YoutubeIcon } from '../assets/icons/YoutubeIcon.svg'

const commentList: Array<IUserCommentList> = [
    {
        userId: 1,
        icon: "./images/n_fon.jpg",
        authorName: "ภรภัทร ไชยมณี",
        postDate: "นักศึกษา วิศวกรรมศาสตร์ มจพ.",
        commentMessage: "พี่โอมสอนสนุกมากมีความเป็นกันเองชิวๆตามสไตล์รุ่นพี่บางอย่างที่อาจารย์สอนยากพี่โอมสามารถสอนให้เข้าใจได้ภายในไม่กี่นาที ทักถามได้ตลอดพร้อมตอบปัญหา เป็นคนที่ใส่ใจการสอนมากๆ"
    },
    {
        userId: 2,
        icon:"./images/n_prem.jpg",
        authorName:"เปรม บุญชู",
        postDate:"นักศึกษา วิศวกรรมศาสตร์ มจพ.",
        commentMessage:"สอนดีเข้าใจง่ายและไม่เร็วเกินไป"
    },
    {
        userId: 3,
        icon: "https://img.icons8.com/clouds/256/pixel-cat.png",
        authorName: "Student1",
        postDate: "นักศึกษา วิศวกรรมศาสตร์ มจพ.",
        commentMessage: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    },
    {
        userId: 4,
        icon: "https://img.icons8.com/clouds/256/pixel-cat.png",
        authorName: "Student1",
        postDate: "16 Jan 2023",
        commentMessage: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    },
    {
        userId: 5,
        icon: "https://img.icons8.com/clouds/256/pixel-cat.png",
        authorName: "Student1",
        postDate: "16 Jan 2023",
        commentMessage: "xxxxxxxxxxxxxxxxxxxxxxxxxx"
    },
    {
        userId: 6,
        icon: "https://img.icons8.com/clouds/256/pixel-cat.png",
        authorName: "Student1",
        postDate: "16 Jan 2023",
        commentMessage: "xxxxxxxxxxxxxxxxxxxxxxx"
    },
]

const courseLists: Array<ICourseLists> = [
    {
        courseId: 1,
        courseImage: "./images/cal1_full_course.png",
        courseName: "Calculus I (Full-course)",
        courseDetail: "คอร์สนี้จะช่วยให้น้องที่ไม่มีพื้นฐาน หรือ พื้นฐานอ่อน สามารถเรียนเนื้อหาแคลคูลัสได้อย่างเข้าใจ โดยพี่จะช่วยทวนพื้นฐานต่างๆที่ใช้ในการเรียน แคลคูลัส 1 โดยน้องสามารถไปทวนเนื้อหาได้ใน vdo พื้นฐาน มั่นใจได้เลยว่าคอร์สนี้จะช่วยให้น้องเข้าใจวิชาคณิตมากขึ้นและได้เกรดที่ดีในมหาลัยแน่นอนครับ",
        coursePrice: "3500 บาท",
    }
]

function Home () {
    const [isShowLoginModal, setIsShowLoginModal] = useState<boolean>(false)
    const [currentPages, setCurrentPages] = useState<number>(1)
    const [postPerPages, setPostPerpages] = useState<number>(3)

    const lastPostIndex = currentPages * postPerPages
    const firstPostIndex = lastPostIndex - postPerPages
    const currentPosts = commentList.slice(firstPostIndex, lastPostIndex)

    const updateIsshowModalDataFromNav = (isShowModal:boolean) => {
        setIsShowLoginModal(isShowModal)
    }

    const updateIsShowModakDateFromLoginPopup = (isShowModal:boolean) => {
        setIsShowLoginModal(isShowModal)
    }

    const updateCurrentPage = (setCurrentPage:number) => {
        setCurrentPages(setCurrentPage)
    }


    return (
        <div className='w-screen h-screen'>
            <div className='bg-dark-blue'>
                <Nav
                    onClickSignInBtn={updateIsshowModalDataFromNav}
                />
                {
                    isShowLoginModal ?
                    <LoginPopup
                       onClickCrossIcon={updateIsShowModakDateFromLoginPopup}
                    />
                    : ''
                }
                <div className='flex justify-center items-center'>
                    <div className='max-w-[1600px] w-[1600px] rounded overflow-hidden shadow-lg m-10 bg-light-blue border-light-blue'>
                        <div className="flex flex-row justify-center items-center">
                            <div className='flex-col p-8'>
                                <div className="font-bold text-teal-200 text-3xl">
                                    คณิต นายโอม
                                </div>
                                <div className='mt-2'></div>
                                <div className="font-bold text-cream text-2xl">
                                    ไม่มีพื้นฐานก็เรียนได้ !!!
                                </div>
                                <div className='mt-4'></div>
                                <p className='text-white text-lg'>
                                    การเรียนคณิตศาสตร์ ที่ดีมาจากพื้นฐานที่ดีครับ
                                    การที่น้องมีพื้นฐานที่ดีน้องจะสามารถ แก้โจทย์ปัญหาเองได้ วิเคราะห์โจทย์เป็น 
                                    และสามารถนําความรู้ไปต่อยอดได้ในระดับที่สูงขึ้นได้ 
                                    และในทุกคอร์สเรียนพี่จะมีคลิปพื้นฐานต่างๆให้น้องทบทวนครับ ไม่ต้องกลัวว่าจะเรียนไม่ทัน
                                    มั่นใจได้เลยครับว่าเรียนกับพี่โอมแล้วเราจะมีพื้นฐานที่ดี และเก่งขึ้นอย่างแน่นอนครับ
                                </p>
                            </div>
                            <img className="h-[300px] rounded" src="./images/Cal_Prof.jpg"/>
                        </div>
                    </div>
                </div>
                <div className='flex justify-center items-center'>
                    <div className='max-w-[1600px] w-[1600px] rounded overflow-hidden shadow-lg m-10 bg-light-blue border-light-blue'>
                        <div className="flex flex-row justify-center items-center">
                            <img className="h-[400px] rounded" src="./images/prof_detail_color.jpg"/>
                            <div className='flex-col p-8'>
                                <p className="font-bold text-teal-200 text-2xl">
                                    ประวัติพี่โอม
                                </p>
                                <div className='mt-2'></div>
                                <p className="text-white text-lg">
                                    ชื่อผู้สอน: พี่โอม
                                </p>
                                <p className="text-white text-lg">
                                    การศึกษา: คณะวิศวกรรมศาสตร์ สาขาวิชาวิศวกกรมหุ่นยนต์และระบบอัตโนมัติ มจพ.
                                </p>
                                <p className="text-white text-lg">
                                    ประสบการณ์การสอน: ปูพื้นฐานน้องวิชาแคลคูลัส 1 มิดเทอม-ไฟนอล (สอนฟรี), pep-โครงการปูพื้นฐานน้องก่อนเข้าเรียนวิศวะ (สอนแคลคูลัส เรื่อง การอินทิเกต), แคลคูลัส 1 มิดเทอม-ไฟนอล (สอนน้องปี 1), ผู้ช่วยสอน Automation-control (สอนน้องปี 3)
                                </p>
                                <p className="text-white text-lg">
                                    ประสบการณ์การทํางาน: นักพัฒนาซอฟต์แวร์, วิศวกรซอฟต์แวร์
                                </p>
                                <p className="text-white text-lg">
                                    ที่มาและแรงบันดาลใจในการสอน: สวัสดีครับ พี่โอมนะครับ สําหรับน้องๆที่ยังไม่เข้าใจหรือทําโจทย์ในวิชาคณิตศาสตร์ยังไม่ค่อยได้ ทําๆไปแล้วติด อยากจะบอกว่าอย่าพึ่งท้อนะครับ ไม่ใช่ว่าเราไม่เก่ง เราแค่ยังมีพื้นฐานที่ยังไม่แข็งพอต่างหากครับ พี่เคยเป็นคนที่ไม่เก่งคณิตศาสตร์มาก่อน เพราะฉะนั้นเวลาที่พี่สอนเราพี่จะเข้าใจว่าเราไม่เข้าใจตรงไหน ติดอะไรบ้าง และต้องดูพื้นฐานเรื่องไหนเพิ่มเติม(เพราะเคยเป็นคนไม่เก่งเลยเข้าใจ555) ครับ สําหรับการเรียนคณิตให้เข้าใจและเก่งขึ้นอย่างที่บอกครับ มาจากการที่เรามีพื้นฐานที่ดี และการทําโจทย์มากๆ(อันนี้สําคัญมาก) การเจอโจทย์หลายประเภทจะช่วยให้เราเก่งขึ้นมากครับ เพราะฉะนั้นคนที่เรียนคอร์สพี่ขอความกรุณาทําโจทย์ที่ให้ด้วยครับ555 และน้องมั่นใจได้เลยว่าจะมีพื้นฐานที่ดีและเก่งขึ้นทุกคนแน่นอนครับ 
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex justify-center items-center'>
                    <div className='max-w-[1600px] w-[1600px] rounded overflow-hidden shadow-lg m-10 bg-light-blue border-light-blue'>
                        <div className='flex flex-row justify-center items-center'>
                            <div className="flex flex-col justify-center items-center max-w-md max-h-[300px] w-[300px] h-[200px] rounded overflow-hidden shadow-lg m-10 bg-light-blue border-light-blue cursor-pointer hover:bg-slate-600">
                                <DisplayIcon />
                                <p className='font-bold text-cream text-xl'>
                                    ทดลองเรียนฟรี
                                </p>
                            </div>
                            <div className="flex flex-col justify-center items-center max-w-md max-h-[300px] w-[300px] h-[200px] rounded overflow-hidden shadow-lg m-10 bg-light-blue border-light-blue cursor-pointer hover:bg-slate-600">
                                <InformationIcon/>
                                <p className='font-bold text-cream text-xl'>
                                    รายละเอียดการซื้อคอร์สเรียน
                                </p>
                            </div>
                            <div className="flex flex-col justify-center items-center max-w-md max-h-[300px] w-[300px] h-[200px] rounded overflow-hidden shadow-lg m-10 bg-light-blue border-light-blue cursor-pointer hover:bg-slate-600">
                                <PaymentIcon/>
                                <p className='font-bold text-cream text-xl'>
                                    การชําระเงิน
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex justify-center items-center'>
                    <div className='max-w-sm h-[750px] rounded overflow-hidden shadow-lg'>
                        <div className="flex justify-center text-center font-bold text-cream text-3xl"> คอร์สเรียน </div>
                        <CourseLists/>
                    </div>
                </div>
                <div className='flex justify-center items-center'>
                    <div className='max-w-[1600px] w-[1600px] rounded overflow-hidden shadow-lg m-10 bg-light-blue border-light-blue'>
                        <div className="flex justify-center items-center font-bold text-cream text-2xl mt-3">
                            ติดตามทริคคณิตศาสตร์ และ คอนเทนต์สนุกๆได้ที่
                        </div>
                        <div className='flex flex-row justify-center items-center'>
                            <div className="flex flex-col justify-center items-center max-w-md max-h-[300px] w-[300px] h-[200px] rounded overflow-hidden shadow-lg m-10 bg-light-blue border-light-blue cursor-pointer hover:bg-slate-600">
                                <TiktokIcon />
                            </div>
                            <div className="flex flex-col justify-center items-center max-w-md max-h-[300px] w-[300px] h-[200px] rounded overflow-hidden shadow-lg m-10 bg-light-blue border-light-blue cursor-pointer hover:bg-slate-600">
                                <YoutubeIcon/>
                            </div>
                            <div className="flex flex-col justify-center items-center max-w-md max-h-[300px] w-[300px] h-[200px] rounded overflow-hidden shadow-lg m-10 bg-light-blue border-light-blue cursor-pointer hover:bg-slate-600">
                                <FacebookIcon/>
                            </div>
                        </div>
                    </div>
                </div>
                <CommentLists
                    totalPosts={commentList.length}
                    userCommentLists={currentPosts}
                    postPerPages={postPerPages}
                    setCurrentPage={updateCurrentPage}
                    currentPage={currentPages}
                />
                <Footer/>
            </div>
        </div>
    );
}

export default Home