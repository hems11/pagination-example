import { useEffect, useState } from "react";
import styles from "./Pagination.module.css"
const Pagination = () => {

    const [tableData, setTableData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = tableData.slice(indexOfFirstRow, indexOfLastRow);
    const totalPages = Math.ceil(tableData.length / rowsPerPage);


    useEffect(() => {
        fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json")
        .then((res) => res.json())
        .then((data) => {setTableData(data)})
        .catch((err) => console.error("Error fetching TableData:failed to fetch data", err))
        console.log("data",setTableData);
    },[])

    return (
        <div>
            <h1>Employee Data Table</h1>
            <table>
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                {currentRows.map((tdata) => (
                    <tr key={tdata.id}>    
                    <td>{tdata.id}</td>
                    <td>{tdata.name}</td>
                    <td>{tdata.email}</td>
                    <td>{tdata.role}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            
            <div className={styles.pagination}>
                <button 
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} 
                    disabled={currentPage === 1}
                >
                Previous
                </button>

                <span className={styles.currentPage}>{currentPage}</span> 

                <button 
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} 
                    disabled={currentPage === totalPages}
                >
                Next
                </button>
            </div>
        </div> 
    )
}

export default Pagination;