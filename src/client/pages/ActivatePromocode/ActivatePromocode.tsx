import React, { useState } from 'react';
import { useUserData } from '../../hooks/useUserData';
import { activatePromocode } from '../../components/fetches/fetches';

const ActivatePromocode = () => {
    const user = useUserData()
    const [toggle, setToggle] = useState<boolean>(true)
    const [shareWithFamilyGroup, setShareWithFamilyGroup] = useState<boolean>(false)
    const [promocode, setPromocode] = useState<string>('')
    const [promoStatus, setPromoStatus] = useState<string>('')

    const onClickYes = () => {
        setShareWithFamilyGroup(true)
        setToggle(false)
    }
    const onClickNo = () => {
        setToggle(false)
    }
    const onClickActivatePromo = async () => {
        if (promocode) {
            const response = await activatePromocode(promocode, shareWithFamilyGroup)
            setPromoStatus(response.message)
        }
    }

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
            : 
            <div>
                <div className='text-2xl font-medium mb-5'>Активация промокода</div>
                <input
                    type="text"
                    className="block bg-white border border-slate-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm mt-10"
                    value={promocode}
                    onChange={e => setPromocode(e.target.value)}
                    placeholder="Введите промокод"
                />
                <div>{promoStatus}</div>
                <button
                    className="bg-orange-600 border-2 border-orange-600 hover:bg-orange-400 hover:border-orange-400 rounded-lg px-5 py-2 text-white duration-75 mt-5"
                    onClick={onClickActivatePromo}
                >
                    Отправить
                </button>
            </div>
        }
        </div>
    );
};

export default ActivatePromocode;