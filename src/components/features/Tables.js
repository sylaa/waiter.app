import { useDispatch, useSelector } from 'react-redux';
import { fetchTables, getAllTables, isLoading } from '../../redux/tablesRedux';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useEffect } from 'react';
import SpinnerComponent from '../common/SpinnerComponent';

const Tables = () => {
  const dispatch = useDispatch();

  useEffect(() => dispatch(fetchTables()), [dispatch]);

  const tables = useSelector((state) => getAllTables(state));
  const areTablesLoading = useSelector(isLoading);

  return (
    <>
      <div>
        <h1>All Tables</h1>
      </div>
      {areTablesLoading && <SpinnerComponent />}
      {!areTablesLoading && (
        <>
          {tables.map((table) => (
            <div
              key={table.id}
              className='d-flex border-bottom align-items-center'
            >
              <h3 className='m-3'>Table {table.id}</h3>
              <p className='m-3'>
                <span className='fw-bold'>Status: </span>
                {table.status}
              </p>
              <Link className='ms-auto' to={`table/${table.id}`}>
                <Button>Show more</Button>
              </Link>
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default Tables;
