import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Button from '../components/UI/Button/Button'
import { useState } from 'react'
import { PaymentInvoice, Programm } from '../../../types/types.d';
import { useCurrentUser } from '../hooks/useUserData';
import ShareWithFamily from '../components/ShareWithFamily';
import { useEffect } from 'react';

const Payment: React.FC = () => {
    const location = useLocation()
    const post = location.state as Programm // проверка что переадан курс

    const user = useCurrentUser()

    const [toggle, setToggle] = useState(true)
    const [shareWithFamilyGroup, setShareWithFamilyGroup] = useState(false)

    const onClickYes = () => {
        setShareWithFamilyGroup(true)
        setToggle(false)
    }
    const onClickNo = () => {
        setToggle(false)
    }

    const [invoice, setInvoice] = useState<PaymentInvoice | null>(null)

    const nav = useNavigate()
    useEffect(() => {
        if (!post) {
            nav('/')
        }
    }, [post])

    return (
        <div>
            {user.familyGroup?.length && toggle
                ? <ShareWithFamily onClickYes={onClickYes} onClickNo={onClickNo}/>
                : <div>
                    <p className='text-2xl mb-5'>Покупка курса {post.name}. {shareWithFamilyGroup && <div className='text-xs'>Делимся с семейной группой</div>}</p>
                    <p><input 
                            type="text" 
                            className='block bg-white border border-slate-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm'
                            value={invoice?.card} 
                            onChange={ e => setInvoice({...invoice, card: e.target.value}) }  
                            placeholder="Номер карты"/>
                        <Button className='bg-orange-600 border-4 border-orange-600 hover:bg-orange-400 hover:border-orange-400 rounded-lg px-5 py-2 text-white duration-75 mt-5'>Оплатить</Button>
                    </p>
                </div>
            }
        </div>
    );
};

export default Payment;