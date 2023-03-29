import { ICourseLists } from "../interfaces/courseLists";

function CourseLists() {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-light-blue m-5">
      <img
        className="w-[400px]"
        src="./images/cal1_course_poster.png"
        alt="Calculus I (Full-course)"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-cream text-xl mb-2">Calculus I (Full-course)</div>
        <p className="text-cream text-base">
          คอร์สนี้จะช่วยให้น้องที่ไม่มีพื้นฐาน หรือ พื้นฐานอ่อน สามารถเรียนเนื้อหาแคลคูลัสได้อย่างเข้าใจ
          โดยพี่จะช่วยทวนพื้นฐานต่างๆที่ใช้ในการเรียน แคลคูลัส 1 โดยน้องสามารถไปทวนเนื้อหาได้ใน vdo
          พื้นฐาน มั่นใจได้เลยว่าคอร์สนี้จะช่วยให้น้องเข้าใจวิชาคณิตมากขึ้นและได้เกรดที่ดีในมหาลัยแน่นอนครับ 
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 cursor-pointer hover:bg-teal-200">
          ซื้อคอร์สเรียน
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 cursor-pointer hover:bg-teal-200">
          รายละเอียดคอร์สเรียน
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 hover:bg-teal-200">
          3500 บาท
        </span>
      </div>
    </div>
  );
}

export default CourseLists