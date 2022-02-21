//selectors
export const getTableId = ({ tables }, tableId) =>
  tables.data.find((table) => table.id === tableId);
export const getAllTables = ({ tables }) => tables.data;
export const isLoading = (state) => state.tables.isLoading;
export const error = (state) => state.tables.error;

// actions
const createActionName = (actionName) => `app/tables/${actionName}`;
const UPDATE_TABLES = createActionName('UPDATE_TABLES');
const EDIT_TABLE = createActionName('EDIT_TABLE');
const FETCH_START = createActionName('FETCH_START');
const FETCH_ERROR = createActionName('FETCH_ERROR');

// action creators
export const updateTables = (payload) => ({ type: UPDATE_TABLES, payload });
export const editTable = (payload) => ({ type: EDIT_TABLE, payload });
export const fetchStart = (payload) => ({ type: FETCH_START, payload });
export const fetchError = (payload) => ({ type: FETCH_ERROR, payload });

export const fetchTables = () => {
  return (dispatch) => {
    dispatch(fetchStart());
    fetch('http://localhost:3131/api/tables')
      .then((res) => res.json())
      .then((tables) => dispatch(updateTables(tables)))
      .catch((error) =>
        dispatch(fetchError(error.message || 'sthWrongHappend'))
      );
  };
};

export const singleTableUpdate = (tableData) => {
  return (dispatch) => {
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status: tableData.status,
        peopleAmount: tableData.peopleAmount,
        maxPeopleAmount: tableData.maxPeopleAmount,
        bill: tableData.bill,
      }),
    };
    dispatch(fetchStart())
    fetch(`http://localhost:3131/tables/${tableData.id}`, options).then(() =>
      dispatch(editTable(tableData))
    )
    .catch((error) =>
        dispatch(fetchError(error.message || 'sthWrongHappend'))
      );
  };
};
export const initialTablesState = {
  data: [],
  isLoading: false,
  error: false,
};

const tablesReducer = (statePart = initialTablesState, action) => {
  switch (action.type) {
    case FETCH_START:
      return { ...statePart, isLoading: true, error: false };
    case UPDATE_TABLES:
      return { data: action.payload, isLoading: false, error: false };
    case EDIT_TABLE:
      return {
        data: statePart.data.map((table) =>
          table.id === action.payload.id ? action.payload : table
        ),
        isLoading: false,
        error: false,
      };
    case FETCH_ERROR:
      return { ...statePart, isLoading: false, error: action.payload };

    default:
      return statePart;
  }
};
export default tablesReducer;
