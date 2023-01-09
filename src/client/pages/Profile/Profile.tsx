import React from 'react'
import { Link } from 'react-router-dom'
import { useUserData } from '../../hooks/useUserData'

const Profile: React.FC = () => {
    const user = useUserData()
    return (
        <div className="container mx-auto flex items-center mt-12">
            <div>
                <h1 className='text-2xl font-medium mb-5'>Профиль</h1>
                <div>Имя: <strong>{user.name}</strong></div>
                <div>Фамилия: <strong>{user.surname}</strong></div>
                <div>Дата рождения: <strong>{user.dateOfBirth?.toUTCString()}</strong></div>
                <div>Телефон: <strong>{user.tel}</strong></div>
                <div>Email: <strong>{user.email}</strong></div>
                <div className='mb-12 mt-5'>Основная страница профиля с данными из сессии авторизации</div>
                <Link 
                    className='bg-orange-600 hover:bg-orange-400 rounded-lg px-5 py-3 text-white'
                    to={'/activate-promocode'}
                >
                    Активация кода
                </Link>
            </div>
        </div>
    );
};

export default Profile;