import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { addCourseToUser } from '../../components/fetches/fetches';

const AfterPay: React.FC = () => {
    const [paymentStatus, setPaymentStatus] = useState<boolean>(false)
    const location = useLocation();
    const paymentData: {courseId: string, shareWithFamilyGroup: boolean} = location.state;

    useEffect(() => {
        // paymentId from cookies
        // если нет paymentId, ошибка
        // ->get status from payment api
        // ->get orderId from payment api

        // if (status === 'CONFIRMED')
            setPaymentStatus(true)
            addCourseToUser(paymentData.courseId, paymentData.shareWithFamilyGroup)
                .then( res => console.log(res))
    }, [])

    return (
        <div className='container mx-auto mt-12'>
        {paymentStatus 
            ? 
            <div>
                <div className='text-lg'>Курс успешно оплачен!</div>
                <Link 
                    to={'/catalog/' + paymentData.courseId} 
                    className='underline mt-5 inline-block hover:no-underline'>
                        Перейти к курсу
                </Link>
            </div>
            : 
            <p>Ошибка при оплате: Some error</p>
        }
        </div>
    );
};

export default AfterPay;