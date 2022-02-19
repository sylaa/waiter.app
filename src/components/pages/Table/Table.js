import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTableId, singleTableUpdate } from "../../../redux/tablesRedux";
import { useParams } from 'react-router';
import Form from 'react-bootstrap/Form'

const Table = () => {

    const { id } = useParams();
    const table = useSelector(state => getTableId(state, id));
    const statusName = ["Busy", "Cleaning", "Reserved", "Free"]
    const dispatch = useDispatch();

    const [status, setStatus] = useState('');
    const [peopleAmount, setPeopleAmount] = useState('');
    const [maxPeopleAmount, setMaxPeopleAmount] = useState('');
    const [bill, setBill] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(singleTableUpdate({ status, peopleAmount, maxPeopleAmount, bill}));
        setStatus('');
        setPeopleAmount('');
        setMaxPeopleAmount('');
        setBill('');
    }

    return (
        <>
            <h1>Table {table.id}</h1>
            <Form onnSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Status:</Form.Label>
                    <Form.Select>
                        <option value={status}>{status}</option>
                    </Form.Select>
                </Form.Group>
            </Form>
        </>
    )
}

export default Table;