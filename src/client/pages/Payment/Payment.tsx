import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useUserData } from '../../hooks/useUserData'

const Payment: React.FC = () => {
    const location = useLocation()
    const post = location.state as any // проверка что переадан курс
    const user = useUserData()
    const [toggle, setToggle] = useState(true)
    const [shareWithFamilyGroup, setShareWithFamilyGroup] = useState(false)

    const onClickYes = () => {
        setShareWithFamilyGroup(true)
        setToggle(false)
    }
    const onClickNo = () => {
        setToggle(false)
    }

    const [invoice, setInvoice] = useState<any>(null)

    return (
        <div className='container mx-auto mt-12'>
            {user.inFamilyGroup && toggle
                ? <div>
                    <div>Приобрести и поделиться с семейной группой?</div>
                    <button 
                        className='bg-orange-600 hover:bg-orange-400 rounded-lg px-5 py-3 text-white mt-10 mr-3'
                        onClick={onClickYes}
                    >
                        Да
                    </button>
                    <button 
                        className='bg-orange-600 hover:bg-orange-400 rounded-lg px-5 py-3 text-white mt-10'
                        onClick={onClickNo}
                    >
                        Нет
                    </button>
                </div>
                : <div>
                    <p className='text-2xl mb-5'>Покупка курса {post.name}. {shareWithFamilyGroup && <div className='text-xs'>Делимся с семейной группой</div>}</p>
                    <p><input 
                            type="text" 
                            className='block bg-white border border-slate-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm'
                            value={invoice?.card} 
                            onChange={ e => setInvoice({...invoice, card: e.target.value}) }  
                            placeholder="Номер карты"/>
                        <button className='bg-orange-600 border-4 border-orange-600 hover:bg-orange-400 hover:border-orange-400 rounded-lg px-5 py-2 text-white duration-75 mt-5'>Оплатить</button>
                    </p>
                </div>
            }
        </div>
    );
};

export default Payment;
//! rework