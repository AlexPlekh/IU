import React from 'react'

import { useState } from 'react'
//import ShareWithFamily from '../components/ShareWithFamily'
import { useUserData } from '../../hooks/useUserData';

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
        <>
        {user.inFamilyGroup && toggle //! Проверка на семейную группу не правильная, потому как если он там только один то делиться не с кем
            ? <div>Делимся с семейной группой</div>//<ShareWithFamily onClickYes={onClickYes} onClickNo={onClickNo} />
            : <div>Активация промокода</div>
        }
        </>
    );
};

export default ActivatePromocode;