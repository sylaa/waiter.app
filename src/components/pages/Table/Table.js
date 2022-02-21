import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getTableId,
  singleTableUpdate,
  isLoading,
  fetchTables,
} from '../../../redux/tablesRedux';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { Form, Button } from 'react-bootstrap';
import shortid from 'shortid';
import styles from './Table.module.scss';
import SpinnerComponent from '../../common/SpinnerComponent';
import NotFound from '../NotFound/NotFound';

const Table = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const table = useSelector((state) => getTableId(state, parseInt(id)));

  const [status, setStatus] = useState('');
  const [peopleAmount, setPeopleAmount] = useState('');
  const [maxPeopleAmount, setMaxPeopleAmount] = useState('');
  const [bill, setBill] = useState('');

  const dispatch = useDispatch();
  useEffect(() => dispatch(fetchTables()), [dispatch]);
  useEffect(() => {
    if (table) {
      setStatus(table.status);
      setPeopleAmount(table.peopleAmount);
      setMaxPeopleAmount(table.maxPeopleAmount);
      setBill(table.bill);
    }
  }, [table]);

  const isTableLoading = useSelector(isLoading);

  const statusName = ['Busy', 'Cleaning', 'Reserved', 'Free'];
  const otherStatuses = statusName.filter(
    (statusName) => statusName !== status
  );

  const updateTableDetails = (e) => {
    setStatus(e.target.value);

    if (e.target.value === 'Busy') {
      setBill(0);
      console.log('Busy condition met');
    } else if (e.target.value === 'Cleaning' || 'Free') {
      setPeopleAmount(0);
      console.log('Cleaning || Free condition met');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      singleTableUpdate({ status, peopleAmount, maxPeopleAmount, bill })
    );
    // setStatus('');
    // setPeopleAmount('');
    // setMaxPeopleAmount('');
    // setBill('');
    navigate('/');
  };

  return (
    <>
      {isTableLoading && <SpinnerComponent />}
      {!isTableLoading && !table && <NotFound />}

      {!isTableLoading && table && (
        <>
          <h1>Table {id}</h1>

          <Form>
            <Form.Group>
              <div className='d-flex justify-content-start align-items-center mt-3'>
                <div className={styles.label}>
                  <Form.Label>Status: </Form.Label>
                </div>
                <div className=''>
                  <Form.Select onChange={(e) => updateTableDetails(e)}>
                    <option value={status}>{status}</option>
                    {otherStatuses.map((statusName) => (
                      <option key={shortid()} value={statusName}>
                        {statusName}
                      </option>
                    ))}
                  </Form.Select>
                </div>
              </div>
            </Form.Group>

            <Form.Group>
              <div className='d-flex justify-content-start align-items-center mt-3'>
                <div className={styles.label}>
                  <Form.Label>People: </Form.Label>
                </div>
                <div className={styles.numberInput}>
                  <Form.Control
                    type='text'
                    value={peopleAmount}
                    onChange={(e) => setPeopleAmount(e.target.value)}
                  ></Form.Control>
                </div>
                <div>
                  <p className='mx-2 mt-3'>/</p>
                </div>
                <div className={styles.numberInput}>
                  <Form.Control
                    type='text'
                    value={maxPeopleAmount}
                    onChange={(e) => setMaxPeopleAmount(e.target.value)}
                  ></Form.Control>
                </div>
              </div>
            </Form.Group>

            {status === 'Busy' && (
              <Form.Group>
                <div className='d-flex justify-content-start align-items-center mt-3'>
                  <div className={styles.label}>
                    <Form.Label>Bill:</Form.Label>
                  </div>
                  <p className='mx-2 mt-2'>$</p>
                  <div className={styles.numberInput}>
                    <Form.Control
                      type='text'
                      value={bill}
                      onChange={(e) => setBill(e.target.value)}
                    />
                  </div>
                </div>
              </Form.Group>
            )}

            <Button onClick={handleSubmit} type='submit' className='mt-3'>
              Update
            </Button>
          </Form>
        </>
      )}
    </>
  );
};

export default Table;
