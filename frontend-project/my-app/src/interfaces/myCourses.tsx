export interface courseDetail {
    courseDetailId: number
    courseDetailName: string,
}

export interface courseSylabus {
    courseId?: number,
    courseName:string,
    midtermDetail: Array<courseDetail>,
    finalDetail: Array<courseDetail>
}