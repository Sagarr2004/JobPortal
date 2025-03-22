// import React, { useEffect } from 'react';
// import Navbar from '../shared/Navbar';
// import ApplicantsTable from './ApplicantsTable';
// import axios from 'axios';
// import { APPLICATION_API_END_POINT } from '@/utils/constant';
// import { useParams } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { setAllApplicants } from '@/redux/applicationSlice';

// const Applicants = () => {
//     const params = useParams();
//     const dispatch = useDispatch();
//     const { applicants } = useSelector((store) => store.application);

//     useEffect(() => {
//         const fetchAllApplicants = async () => {
//             try {
//                 const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, { withCredentials: true });
//                 dispatch(setAllApplicants(res.data.job));
//             } catch (error) {
//                 console.error(error);
//             }
//         };
//         fetchAllApplicants();
//     }, [params.id, dispatch]);

//     return (
//         <div>
//             <Navbar />
//             <div className="max-w-7xl mx-auto">
//                 <h1 className="font-bold text-xl my-5">
//                     Applicants {applicants?.applications?.length || 0}
//                 </h1>
//                 <ApplicantsTable />
//             </div>
//         </div>
//     );
// };

// export default Applicants;

import React, { useEffect } from 'react';
import Navbar from '../shared/Navbar';
import ApplicantsTable from './ApplicantsTable';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from '@/redux/applicationSlice';

const Applicants = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const { applicants } = useSelector((store) => store.application);

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, { withCredentials: true });
                dispatch(setAllApplicants(res.data.job));
            } catch (error) {
                console.error(error);
            }
        };
        fetchAllApplicants();
    }, [params.id, dispatch]);

    const handleCollectResumes = () => {
        // Handle collecting all resumes logic here
        console.log("Collecting all resumes...");
    };

    return (
        <div>
            <Navbar />
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="font-bold text-xl">
                        Applicants {applicants?.applications?.length || 0}
                    </h1>
                    <button 
                        onClick={handleCollectResumes} 
                        className="bg-blue-500 text-white py-2 px-4 mt-5 rounded"
                    >
                        Collect all Resum's
                    </button>
                </div>
                <ApplicantsTable />
            </div>
        </div>
    );
};

export default Applicants;



