import {
    ADD_CASE,
    ADD_DISH,
    EDIT_DISH_NAME,
    REMOVE_DISH,
    DOWNLOAD_DISHS_DATA,
    MOVE_DISH_LEFT,
    MOVE_DISH_RIGHT
} from './actions';

const initialState = {
    dishcase: []
};

export default function reducer(state=initialState, {type, payload}) {
    let dishToMove = null;

    switch(type) {
    case ADD_CASE:
        return {
            ...state,
            dishcase: [
                ...state.dishcase, payload
            ]
        };
    case ADD_DISH:
        return {
            ...state,
            dishcase: state.dishcase.map((dishArr, index) => (
                index === payload.dishArrId ? {
                    ...dishArr,
                    dishs: [...dishArr.dishs, payload.dish]
                }
                : dishArr
            ))
        };
    case EDIT_DISH_NAME:
        return {
            ...state,
            dishcase: state.dishcase.map((dishArr, index) => (
                index === payload.dishArrId ? {
                    ...dishArr,
                    dishs: dishArr.dishs.map((dish, indexDish) => (
                        indexDish === payload.dishId ? {
                            ...dish,
                            name: payload.newName
                        }
                        : dish
                    ))
                }
                : dishArr
            ))
        };

    case REMOVE_DISH:
        return {
            ...state,
            dishcase: state.dishcase.map((dishArr, index) => (
                index === payload.dishArrId ? {
                    ...dishArr,
                    dishs: dishArr.dishs.filter((dish, dishIndex) => (dishIndex !== payload.dishId))
                }
                : dishArr
            ))
        };
    case DOWNLOAD_DISHS_DATA:
        return {
            ...state,
            dishcase: payload
        }
    case MOVE_DISH_LEFT:
        dishToMove = state.dishcase[payload.dishArrId].dishs[payload.dishId];

        return {
            ...state,
            dishcase: state.dishcase.map((dishArr, index) => {
                if (index === payload.dishArrId) {
                    return {
                        ...dishArr,
                        dishs: dishArr.dishs.filter((dish, dishIndex) => (dishIndex !== payload.dishId))
                    };
                }
                if (index === payload.dishArrId - 1) {
                    return {
                        ...dishArr,
                        dishs: [...dishArr.dishs, dishToMove]
                    };
                }
                return dishArr;
            })
        };
    case MOVE_DISH_RIGHT:
        dishToMove = state.dishcase[payload.dishArrId].dishs[payload.dishId];

        return {
            ...state,
            dishcase: state.dishcase.map((dishArr, index) => {
                if (index === payload.dishArrId) {
                    return {
                        ...dishArr,
                        dishs: dishArr.dishs.filter((dish, dishIndex) => (dishIndex !== payload.dishId))
                    };
                }
                if (index === payload.dishArrId + 1) {
                    return {
                        ...dishArr,
                        dishs: [...dishArr.dishs, dishToMove]
                    };
                }
                return dishArr;
            })
        };
    default:
        return state;
    }
};
