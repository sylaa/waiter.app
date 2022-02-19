import { useSelector } from "react-redux";
import { getAllTables } from "../../redux/tablesRedux";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const Tables = () => {

    const tables = useSelector(state => getAllTables(state))

    return (
        <>
            <div>
                <h1>All Tables</h1>
            </div>
            {tables.map(table => (
            <div key={table.id} className="d-flex border-bottom align-items-center">
                <h3 className="m-3">Table {table.id}</h3>
                <p className="m-3"><span className="fw-bold">Status: </span>{table.status}</p>
                <Link className="ms-auto" to={`table/${table.id}`}>
                    <Button>Show more</Button>
                </Link>
            </div>
            ))
            }
        </>
    )
}

export default Tables;