import Card from './Card'
import { IUserCommentList } from '../interfaces/userComment'
import { useState } from 'react'

interface ICommentLists {
    userCommentLists : Array<IUserCommentList>
    totalPosts: number
    postPerPages: number
    setCurrentPage: (pageNumber: number) => void;
    currentPage: number
}

function CommentLists ({userCommentLists, totalPosts, postPerPages, setCurrentPage, currentPage}: ICommentLists) {
    let pages = []
    let i = 1

    for (i = 1; i<= Math.ceil(totalPosts/postPerPages); i++) {
        pages.push(i)
    }

    return (
        <div className='flex justify-center items-center'>
            <div className='max-w rounded overflow-hidden shadow-lg m-10 bg-light-blue border-light-blue'>
                <p className='flex justify-center items-center text-white font-bold text-xl mt-3'>กล่องความคิดเห็นของน้องที่เรียนกับพี่โอม</p>
                <div className='flex flex-row'>
                    {
                        userCommentLists.length > 0 &&
                        userCommentLists.map((obj, index) => {
                            return (
                                <Card
                                    key={index}
                                    icon={obj.icon}
                                    authorName={obj.authorName}
                                    postDate={obj.postDate}
                                    commentMessage={obj.commentMessage}
                                />
                            )
                        })
                    }
                </div>
                <div className='flex justify-center'>
                    {pages.map((page, index) => {
                        return (
                            <button 
                                key={index}
                                className={`flex justify-center items-center w-[15px] h-[15px] rounded-full mx-2 my-3 ${page == currentPage? 'bg-teal-200' : ' bg-white hover:bg-teal-200' }`}
                                onClick={() => setCurrentPage(page)}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default CommentLists