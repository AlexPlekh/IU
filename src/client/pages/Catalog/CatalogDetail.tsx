import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useUserData } from "../../hooks/useUserData"
import { fetchGetCourseById } from '../../components/fetches/fetches'
import { ICourseClientData } from '../../../../types/Interfaces'
import { isAdult } from '../../components/functions/isAdult';

const CatalogDetail: React.FC = () => {
    const {id} = useParams()
    const [course, setCourse] = useState<ICourseClientData>()

    const user = useUserData()
    const isAdultUser = isAdult(user.dateOfBirth)

    // Проверка куплен курс или активирована бесплатная часть?

    useEffect(() => {
        const getCourse = async () => {
            try {
                if (id) {
                    const response = await fetchGetCourseById(id)
                    setCourse(response)
                }
            } catch (e: any) {
                console.error(e) //!
            }
        }
        getCourse()
    }, [id])

    const onFreePartBtnClick = () => {
        if (course) {
            console.log('send to server what free part is enabled');
            // send data to server, then


            // setCurrentUser({
            //     ...user,
            //     purchasedСourses: [...user.purchasedСourses, {...post, status: 'free'}]
            // })
        }
    }
    // const isFree = user.purchasedСourses?.filter( c => c.id === post?.id)

    return (
        <div className='container mx-auto mt-12'>
            {course &&
                <div>
                    <div className='text-2xl mb-5'>{course.name}</div>
                    <div className='text-gray-500'>
                        <p>{course.description}</p>
                        <p>{course.freeContent}</p>
                        <p>{course.mainContent}</p>
                    </div>

                    {!course.isBought &&
                        <div className='mt-12'>

                            <button 
                                className='bg-transparent hover:bg-orange-600 border-2 border-orange-600 text-black hover:text-white rounded-lg px-5 py-2 text-black mr-5 duration-75'
                                onClick={onFreePartBtnClick}
                            >
                                    Попробовать бесплатно
                            </button>

                            { isAdultUser &&
                                <Link 
                                    className='bg-orange-600 border-4 border-orange-600 hover:bg-orange-400 hover:border-orange-400 rounded-lg px-5 py-2 text-white duration-75'
                                    to={'/payment'}
                                    state={course}
                                >
                                        Приобрести
                                </Link>
                            }

                        </div>
                    }
                </div>
           }
        </div>
    );
};

export default CatalogDetail;

// При обновлении страницы скидывает на главную