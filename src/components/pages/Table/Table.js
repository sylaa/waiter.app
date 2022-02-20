import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTableId, singleTableUpdate } from '../../../redux/tablesRedux';
import { useParams } from 'react-router';
import { Form, Button, Spinner } from 'react-bootstrap';
import shortid from 'shortid';
import styles from './Table.module.scss';
// import SpinnerComponent from '../../common/SpinnerComponent';

const Table = () => {

  const { id } = useParams();
  const table = useSelector(state => getTableId(state, parseInt(id)));

  const dispatch = useDispatch();

  const [status, setStatus] = useState(table.status);
  const [peopleAmount, setPeopleAmount] = useState('');
  const [maxPeopleAmount, setMaxPeopleAmount] = useState('');
  const [bill, setBill] = useState('');

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
    dispatch(singleTableUpdate({ status, peopleAmount, maxPeopleAmount, bill })
    );
    setStatus('');
    setPeopleAmount('');
    setMaxPeopleAmount('');
    setBill('');
  };

  const infoSend = e => {
    console.log("info send")
  };


  return (
    <>
      <h1>Table {id}</h1>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      <Form onSubmit={handleSubmit}>

        <Form.Group>
          <div className='d-flex justify-content-start align-items-center mt-3'>
            <div className={styles.label}>
              <Form.Label>Status: </Form.Label>
            </div>
            <div className=''>
              <Form.Select onChange={(e) => updateTableDetails(e)}>
                <option value={status}>{status}</option>
                {otherStatuses.map(statusName => (
                  <option key={shortid()} value={statusName}>
                    {statusName}
                  </option>
                ))}
              </Form.Select>
            </div>
          </div>
        </Form.Group>

        <Form.Group>
          <div className="d-flex justify-content-start align-items-center mt-3">
            <div className={styles.label}>
              <Form.Label>People: </Form.Label>
            </div>
            <div className={styles.numberInput}>
              <Form.Control 
                type="text" 
                value={peopleAmount}
                onChange={e => setPeopleAmount(e.target.value) }>
              </Form.Control>
            </div>
            <div>
              <p className="mx-2 mt-3">/</p>
            </div>
            <div className={styles.numberInput}>
              <Form.Control 
                type="text" 
                value={maxPeopleAmount}
                onChange={e => setMaxPeopleAmount(e.target.value)}>
              </Form.Control>
            </div>
          </div>
          </Form.Group>

          <Form.Group>
            <div className="d-flex justify-content-start align-items-center mt-3">
              <div className={styles.label}>
                <Form.Label >Bill:</Form.Label>
              </div>
              <p className="mx-2 mt-2">$</p>
              <div className={styles.numberInput}>
                <Form.Control
                  type="text"
                  value={bill}
                  onChange={e => setBill(e.target.value)}
                >

                </Form.Control>
              </div>
            </div>
          </Form.Group>

          <Button onSubmit={infoSend()} type="submit" className='mt-3'>Update</Button>
      </Form>
    </>
  );
};

export default Table;

