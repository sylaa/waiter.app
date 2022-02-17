//selectors
export const getTableId = ({ tables }, tableId) =>
  tables.find(table => table.id === tableId);
export const getAllTables = ({ tables }) => tables;

// actions
const createActionName = (actionName) => `app/tables/${actionName}`;
const UPDATE_TABLE = createActionName('UPDATE_TABLE');
const EDIT_TABLE = createActionName('EDIT_TABLE');

// action creators
export const updateTable = payload => ({ type: UPDATE_TABLE, payload });
const tablesReducer = (statePart = [], action) => {
  switch (action.type) {
    case UPDATE_TABLE:
      return action.payload;
    default:
      return statePart;
  }
};
export default tablesReducer;
