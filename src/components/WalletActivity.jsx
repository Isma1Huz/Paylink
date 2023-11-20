import React, { useState, useEffect, useContext } from "react";
import WalletActivityRecord from "./WalletActivityRecord";
import { dataContext } from "../ContexProvider/MyContext";

export default function WalletActivity() {
  const { currentUserData } = useContext(dataContext);
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 4;
  if (!currentUserData || currentUserData.length === 0) {
    // Render a loading indicator
    return (
      <div className="text-center">
        <p>Loading...</p>
      </div>
    );
  }

  // const [walletActivityData, setWalletActivityData] = useState([]);
  // useEffect(() => {
  //   fetch("http://localhost:5555/wallet/wallet-Activity")
  //     .then((res) => {
  //       if (!res.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       return res.json();
  //     })
  //     .then((response) => {
  //       // console.log(response);
  //       setWalletActivityData(response);
  //     })
  //     .catch((error) => {
  //       console.error("There was a problem with the fetch operation:", error);
  //     });
  // }, []);

  if (!currentUserData || currentUserData.length === 0) {
    // Render a loading indicator
    return (
      <div className="text-center">
        <p>Loading...</p>
      </div>
    );
  }

  // console.log(currentUserData);
  let filteredData = currentUserData.wallet_ctivities;
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const currentEntries = currentUserData.wallet_ctivities.slice(
    indexOfFirstEntry,
    indexOfLastEntry
  );

  const activityRow = currentEntries.map((activity) => {
    return (
      <tr key={activity.id}>
        <WalletActivityRecord
          activity_id={activity.id}
          activity_amount={activity.amount}
          activity_created_at={activity.created_at}
          activity_description={activity.description}
          activity_transaction_type={activity.transaction_type}
        />
      </tr>
    );
  });
  return (
    <div className="bg-white  rounded-sm border border-gray-200 flex-1">
      <strong className="text-lg mx-4 ">Wallet Activities</strong>
      <table className="w-full">
        <thead className="bg-gray-100 rounded-xl  border-b-2 border-gray-300">
          <tr>
            <th className="w-20 p-2 text-sm font-semibold tracking-wide text-left">
              #
            </th>
            <th className="p-2 text-sm font-semibold tracking-wide text-left">
              Descriptions
            </th>
            <th className="  w-24 p-2 text-sm font-semibold tracking-wide text-left">
              Type
            </th>
            <th className="w-24 p-2 text-sm font-semibold tracking-wide text-left">
              Date
            </th>
            <th className="w-20 p-2 text-sm font-semibold tracking-wide text-left">
              Amount
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-300">{activityRow}</tbody>
      </table>
      <div className="flex justify-center mt-4">
        {Array.from(
          { length: Math.ceil(filteredData.length / entriesPerPage) },
          (_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`mx-1 px-2 py-1 rounded-md ${
                currentPage === i + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {i + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
}

// import React from 'react'

// const Pagination = ({ nPages, currentPage, setCurrentPage }) => {

//     const pageNumbers = [...Array(nPages + 1).keys()].slice(1)

//     const goToNextPage = () => {
//             if(currentPage !== nPages) setCurrentPage(currentPage + 1)
//     }
//     const goToPrevPage = () => {
//         if(currentPage !== 1) setCurrentPage(currentPage - 1)
//     }
//     return (
//         <nav>
//             <ul className='pagination justify-content-center'>
//                 <li className="page-item">
//                     <a className="page-link"
//                         onClick={goToPrevPage}
//                         href='#'>

//                         Previous
//                     </a>
//                 </li>
//                 {pageNumbers.map(pgNumber => (
//                     <li key={pgNumber}
//                         className= {`page-item ${currentPage == pgNumber ? 'active' : ''} `} >

//                         <a onClick={() => setCurrentPage(pgNumber)}
//                             className='page-link'
//                             href='#'>

//                             {pgNumber}
//                         </a>
//                     </li>
//                 ))}
//                 <li className="page-item">
//                     <a className="page-link"
//                         onClick={goToNextPage}
//                         href='#'>

//                         Next
//                     </a>
//                 </li>
//             </ul>
//         </nav>
//     )
// }

// export default Pagination

// import React from 'react'

// const Records = ({data}) => {

//   return (
//     <table className="table">
//         <thead>
//             <tr>
//                 <th scope='col'>ID</th>
//                 <th scope='col'>First Name</th>
//                 <th scope='col'>Last Name</th>
//                 <th scope='col'>City</th>

//             </tr>
//         </thead>
//         <tbody>
//             {data.map(item => (
//                 <tr>
//                     <td>{item.id} </td>
//                     <td>{item.first_name} </td>
//                     <td>{item.last_name} </td>
//                     <td>{item.city} </td>
//                 </tr>
//             ))}
//         </tbody>
//     </table>
//   )
// }

// export default Records

// import React, { useState, useEffect } from 'react'
// import axios from 'axios'
// import Records from './components/Records';
// import Pagination from './components/Pagination';

// function App() {

//     // To hold the actual data
//     const [data, setData] = useState([])
//     const [loading, setLoading] = useState(true);

//     const [currentPage, setCurrentPage] = useState(1);
//     const [recordsPerPage] = useState(10);

//     useEffect(() => {
//         axios.get('data.json')
//             .then(res => {
//                     setData(res.data);
//                     setLoading(false);
//                 })
//                 .catch(() => {
//                     alert('There was an error while retrieving the data')
//                 })
//     }, [])

//     const indexOfLastRecord = currentPage * recordsPerPage;
//     const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
//     const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);
//     const nPages = Math.ceil(data.length / recordsPerPage)

//     return (
//         <div className='container mt-5'>
//             <h2> Simple Pagination Example in React </h2>
//             <Records data={currentRecords}/>
//             <Pagination
//                 nPages={nPages}
//                 currentPage={currentPage}
//                 setCurrentPage={setCurrentPage}
//             />
//         </div>
//     );
// }

// export default App;
