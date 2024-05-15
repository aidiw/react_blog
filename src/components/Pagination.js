import PropTypes from 'prop-types';


const Pagination = ({ currentPage, numberOfPages, onClick, limit}) => {
    const currentSet = Math.ceil(currentPage/limit);
    const lastSet = Math.ceil(numberOfPages/limit);
    const startPage = limit * (currentSet - 1) + 1;
    const numberOfPagesForSet = currentSet === lastSet ? numberOfPages%limit : limit;

    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
                {currentSet !== 1&&<li className="page-item">
                    <div 
                        className="page-link cusor-pointer"
                        onClick={()=>onClick(startPage-limit)}>

                            Previous
                    </div>
                </li>}
                {Array(numberOfPagesForSet).fill(startPage).map((value, index) => value + index).map((pageNumber)=>{
                    return   <li key={pageNumber} className={`page-item ${currentPage === pageNumber ? 'active': ''}`}>
                    <div 
                        className="page-link cusor-pointer"
                        onClick={()=>{
                            onClick(pageNumber);
                        }}
                    >
                        {pageNumber}
                    </div>
                </li>
                })}
                {currentSet !== lastSet &&<li className="page-item">
                    <div 
                        className="page-link cusor-pointer"
                        onClick = {()=>onClick(startPage+limit)}
                    >
                    Next</div>
                </li>}
            </ul>
        </nav>
    )
}

Pagination.propTypes = {
    currentPage: PropTypes.number,
    numberOfPages: PropTypes.number.isRequired,
    onclick: PropTypes.func.isRequired,
    limit : PropTypes.number
}

export default Pagination;
