import React from 'react'
import ReactPlayer from 'react-player'

interface vdoUrl {
  courseName:string,
  courseTopic:string,
  vdoLink: string
}

function DisplayVdo(props: vdoUrl) {
  return (
    <div className="flex items-center justify-center w-screen h-screen overflow-hidden">
      <div className="w-[800px] h-[700px] z-30 p-5 text-2xl text-white bg-gray-600 bg-opacity-50 rounded-xl ">
      {props.courseName && props.courseTopic && props.vdoLink ?
          <div className="flex flex-col">
            <span className="text-xl text-white font-medium">
              Course Name: {props.courseName}
            </span>
            <span className="text-xl text-white font-medium">
              Lesson topic: {props.courseTopic}
            </span>
          </div>
        :
          <span className="flex justify-center text-xl text-white font-medium">
            Please click some topic stupid !!!
          </span>
      }
        <ReactPlayer
          className="mt-3"
          url={props.vdoLink}
          controls
          playing
          width="100%"
          height="90%"
        />
      </div>
    </div>
  );

}

export default DisplayVdo
