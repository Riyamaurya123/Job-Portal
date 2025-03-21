import React from 'react';
import { useSelector } from 'react-redux';

const AppliedJobTable = () => {
      const {allAppliedJobs} = useSelector(store=>store.job)

    return (
        <div style={{ margin: "auto", marginTop: "20px" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr style={{ backgroundColor: "#f2f2f2", textAlign: "left" }}>
                        <th style={{ padding: "10px" }}>Date</th>
                        <th style={{ padding: "10px" }}>Job Role</th>
                        <th style={{ padding: "10px" }}>Company</th>
                        <th style={{ padding: "10px" }}>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {allAppliedJobs.length <= 0?<span>You haven't applied any job yet.</span>:(
                    allAppliedJobs.map((item, index) => (
                        <React.Fragment key={index}>
                            <tr>
                                <td style={{ padding: "10px" }}>{item?.job?.createdAt.split("T")[[0]]}</td>
                                <td style={{ padding: "10px" }}>{item?.job?.title}</td>
                                <td style={{ padding: "10px" }}>{item?.job?.company?.name}</td>
                                <td style={{ padding: "10px" }}>
                                <button key={index} className='px-5 rounded-2xl py-0.5 my-4 bg-black text-white'>{item?.status}</button>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="4"><hr style={{ margin: "5px 0", border: "0.5px solid #ddd" }} /></td>
                            </tr>
                        </React.Fragment>
                    )))}
                </tbody>
            </table>
        </div>
    );
};

export default AppliedJobTable;
