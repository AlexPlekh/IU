import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useUserData } from "../../hooks/useUserData"
import { fetchGetCourseById } from '../../components/fetches/fetches'
import { ICourse } from '../../../../types/Interfaces'

const CatalogDetail: React.FC = () => {
    const param = useParams()
    const [course, setCourse] = useState<ICourse>()
    const user = useUserData()

    useEffect(() => {
        const getCourse = async () => {
            try {
                if (param.id) {
                    const response = await fetchGetCourseById(param.id)
                    setCourse(response)
                }
            } catch (e: any) {
                console.error(e) //!
            }
        }
        getCourse()
    }, [param.id])

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
        <div className='container mx-auto mt-12'>
            {course &&
                <div>
                    <div className='text-2xl mb-5'>{course.name}</div>
                    <div className='text-gray-500'>
                        <p>{course.description}</p>
                        {/* {isFree?.length !== 0 && <p>{course.freeContent}</p>} */}
                    </div>
                    <div className='mt-12'>
                        {/* {isFree?.length === 0 &&
                        <button 
                            className='bg-transparent hover:bg-orange-600 border-2 border-orange-600 text-black hover:text-white rounded-lg px-5 py-2 text-black mr-5 duration-75'
                            onClick={onFreePartBtnClick}
                        >
                                Попробовать бесплатно
                        </button>
                        } */}
                        <Link 
                            className='bg-orange-600 border-4 border-orange-600 hover:bg-orange-400 hover:border-orange-400 rounded-lg px-5 py-2 text-white duration-75'
                            to={'/payment'}
                            state={course}
                        >
                                Приобрести
                        </Link>{/* Ребенок не может купить курс */}
                    </div>
                </div>
           }
        </div>
    );
};

export default CatalogDetail;