const ADD_CASE = 'ADD_CASE';
const ADD_DISH = 'ADD_DISH';
const EDIT_DISH_NAME = 'EDIT_DISH_NAME';
const REMOVE_DISH = 'REMOVE_DISH';
const DOWNLOAD_DISHS_DATA = 'DOWNLOAD_DISHS_DATA';
const MOVE_DISH_LEFT = 'MOVE_DISH_LEFT';
const MOVE_DISH_RIGHT = 'MOVE_DISH_RIGHT';


const addCaseAction = (dishArr) => ({
    type: ADD_CASE,
    payload: dishArr
});

const addDishAction = ({ dish, dishArrId }) => ({
    type: ADD_DISH,
    payload: { dish, dishArrId }
});

const editDishNameAction = ({ dishId, dishArrId, newName }) => ({
    type: EDIT_DISH_NAME,
    payload: { dishId, dishArrId, newName }
});

const removeDishAction = ({ dishId, dishArrId }) => ({
    type: REMOVE_DISH,
    payload: { dishId, dishArrId }
});

const downloadDishsDataAction = (dishcase) => ({
    type: DOWNLOAD_DISHS_DATA,
    payload: dishcase
});

const moveDishLeftAction = ({ dishId, dishArrId }) => ({
    type: MOVE_DISH_LEFT,
    payload: { dishId, dishArrId }
});

const moveDishRightAction = ({ dishId, dishArrId  }) => ({
    type: MOVE_DISH_RIGHT,
    payload: { dishId, dishArrId }
});

export {
    ADD_CASE,
    ADD_DISH,
    EDIT_DISH_NAME,
   // EDIT_DISH_AUTHOR,
    REMOVE_DISH,
    DOWNLOAD_DISHS_DATA,
    MOVE_DISH_LEFT,
    MOVE_DISH_RIGHT,
    addCaseAction,
    addDishAction,
    editDishNameAction,
   // editDishAuthorAction,
    removeDishAction,
    downloadDishsDataAction,
    moveDishLeftAction,
    moveDishRightAction
};
