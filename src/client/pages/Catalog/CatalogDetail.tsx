import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
//import { coursesArr } from './Catalog'
// import Button from './UI/Button/Button';
// import { useCurrentUser, setCurrentUser } from '../hooks/useUserData';
//import { Course } from 'types/types'
import { useUserData } from "../../hooks/useUserData"


const CatalogDetail: React.FC = () => {
    const param = useParams()
    const id = Number(param.id)
   // const [post, setPost] = useState<Course | null>(null)

    const user = useUserData()

    // useEffect(() => {
    //     if (id) {
    //         setPost(coursesArr.filter(p => p.id === id)[0])
    //     }
    // }, [id, user.purchasedСourses])

    // const onFreePartBtnClick = () => {
    //     if (post) {
    //         // send data to server, then
    //         setCurrentUser({
    //             ...user,
    //             purchasedСourses: [...user.purchasedСourses, {...post, status: 'free'}]
    //         })
    //     }
    // }
    // const isFree = user.purchasedСourses?.filter( c => c.id === post?.id)

    return (
        <div>
            {/* {post && '123'
                <div>
                    <div className='text-2xl mb-5'>{post.name}</div>
                    <div className='text-gray-500'>
                        <p>{post.description}</p>
                        {isFree?.length !== 0 && <p>{post.freepart}</p>}
                    </div>
                    <div className='mt-12'>
                        {isFree?.length === 0 &&
                        <button 
                            className='bg-transparent hover:bg-orange-600 border-2 border-orange-600 text-black hover:text-white rounded-lg px-5 py-2 text-black mr-5 duration-75'
                            onClick={onFreePartBtnClick}
                        >
                                Попробовать бесплатно
                        </button>
                        }
                        <Link 
                            className='bg-orange-600 border-4 border-orange-600 hover:bg-orange-400 hover:border-orange-400 rounded-lg px-5 py-2 text-white duration-75'
                            to={'/payment'}
                            state={post}
                        >
                                Приобрести
                        </Link>
                    </div>
                </div>
           } */}
        </div>
    );
};

export default CatalogDetail;