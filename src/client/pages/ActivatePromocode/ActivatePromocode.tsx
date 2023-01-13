import React from 'react'
import { useState } from 'react'
import { useUserData } from '../../hooks/useUserData'

const ActivatePromocode = () => {
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
            : <div>Активация промокода</div>
        }
        </div>
    );
};

export default ActivatePromocode;
//! rework