import { ReactNode } from 'react'
import { IUserCommentList } from '../interfaces/userComment'

function Card (props:IUserCommentList) {
    return (
        <div className="max-w-md max-h-[300px] w-[448px] h-[300px] rounded overflow-hidden shadow-lg m-10 bg-slate-600 border-slate-600">
            <div className="border-r border-b border-l bg-slate-600 border-slate-600 lg:border-l-0 lg:border-t lg:border-slate-600 rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                <div className="mb-8">
                    <div className="flex items-center">
                        <img className="w-10 h-10 rounded-full" src={props.icon}/>
                        <div className="mx-1"/>
                        <div className="text-sm">
                            <p className="text-white leading-none">{props.authorName}</p>
                            <p className="text-slate-200">{props.postDate}</p>
                        </div>
                    </div>
                    <p className="text-slate-200 text-base mt-3">{props.commentMessage}</p>
                </div>
            </div>  
        </div>
    );
}

export default Card