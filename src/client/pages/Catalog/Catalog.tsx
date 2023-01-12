import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ICourse } from 'types/Interfaces'
import { fetchGetCourses } from "../../components/fetches/fetches"
import Loader from '../../components/UI/Loader/Loader'

const Catalog: React.FC = () => {
    const [courses, setCourses] = useState<Array<ICourse>>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                setIsLoading(true)
                const response = await fetchGetCourses()
                setCourses(response.coursesData)
            } catch (e: any) {
                console.error(e) //!
            } finally {
                setIsLoading(false)
            }
        }
        fetchCourses()
    }, [])

    return (
        <div className='container mx-auto mt-12'>
            <h1 className='text-2xl font-medium mb-5'>Каталог</h1>
            <div className='flex flex-col'>
            {isLoading
                ? <div><Loader /></div>
                : <>
                    {courses.map( p => (
                        <Link 
                            key={p.id} 
                            className='py-3 hover:text-orange-600 duration-75' 
                            to={`/catalog/${p.id}`}
                        >
                            {p.name}
                        </Link>
                    ))}
                </>
            } 
            </div>
        </div>
    )
}

export default Catalog