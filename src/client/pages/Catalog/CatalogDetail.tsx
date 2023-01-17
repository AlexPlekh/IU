import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useUserData } from "../../hooks/useUserData";
import { enableFreePart, fetchGetCourseById } from "../../components/fetches/fetches";
import { ICourseClientData } from "../../../../types/Interfaces";
import { isAdult } from "../../components/functions/isAdult";

const CatalogDetail: React.FC = () => {
  const { id } = useParams();
  const [course, setCourse] = useState<ICourseClientData>();
  const [error, setError] = useState<string>();
  const user = useUserData();
  const isAdultUser = isAdult(user.dateOfBirth);
  const navigate = useNavigate();

  useEffect(() => {
    const getCourse = async (id: string) => {
      const response = await fetchGetCourseById(id);
      if (response.status !== 0) {
        setCourse(response.userCourseData);
      } else {
        setError(response.message);
      }
    };
    if (id) {
      getCourse(id);
    }
  }, [id, course]);

  const onFreePartBtnClick = () => {
    if (course) {
      enableFreePart(course.id)
    }
  };

  return (
    <div className="container mx-auto mt-12">
      {error && <div>{error}</div>}
      {course && (
        <div>
          <div className="text-2xl mb-5">{course.name}</div>
          <div className="text-gray-500">
            <p>{course.description}</p>
            {course.isTrialOpen && !course.isBought && <p>{course.freeContent}</p>}
            {course.isBought && <p>{course.mainContent}</p>}
          </div>

          {!course.isBought && (
            <div className="mt-12">
              {!course.isTrialOpen && (
                <button
                  className="bg-transparent hover:bg-orange-600 border-2 border-orange-600 text-black hover:text-white rounded-lg px-5 py-2 mr-5 duration-75"
                  onClick={onFreePartBtnClick}
                >
                  Попробовать бесплатно
                </button>
              )}
              {isAdultUser && (
                <button
                  className="bg-orange-600 border-4 border-orange-600 hover:bg-orange-400 hover:border-orange-400 rounded-lg px-5 py-2 text-white duration-75"
                  onClick={() => navigate('/payment', {
                    state: course
                  })}
                >
                  Приобрести
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CatalogDetail;