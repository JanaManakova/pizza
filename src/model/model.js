const hostname = 'http://localhost:9999';

const getCases = async () => {
    const response = await fetch(hostname + '/disharr', {method: 'GET'});
    if (response.status !== 200) {
        throw new Error(`getCases returned ${response.status}`);
    }
    const jsonData = await response.json();
    return jsonData;
};

const addCase = async (dishArr) => {
    const response = await fetch(hostname + '/disharr', {
        method: 'POST', 
        body: JSON.stringify(dishArr),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.status !== 200) {
        throw new Error(`addCase returned ${response.status}`);
    }
    const { info } = await response.json();
    console.log(info);
};

const addDish = async ({ dish, dishArrId }) => {
    const response = await fetch(hostname + `/disharr/${dishArrId}/dish`, {
        method: 'POST', 
        body: JSON.stringify(dish),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    console.log(response);

    if (response.status !== 200) {
        throw new Error(`addDish returned ${response.status}`);
    }
    const { info } = await response.json();
    console.log(info);
};

const editDish = async ({ dishId, dishArrId, newName }) => {
    const response = await fetch(hostname + `/disharr/${dishArrId}/dish/${dishId}`, {
        method: 'PATCH', 
        body: JSON.stringify({ newName: newName }), 
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.status !== 200) {
        throw new Error(`editDishName returned ${response.status}`);
    }
    const { info } = await response.json();
    console.log(info);
};

const removeDish = async ({ dishId, dishArrId }) => {
    const response = await fetch(hostname + `/disharr/${dishArrId}/dish/${dishId}`, {
        method: 'DELETE'
    });

    if (response.status !== 200) {
        throw new Error(`removeDish returned ${response.status}`);
    }
    const { info } = await response.json();
    console.log(info);
};

const moveDish = async ({ dishId, dishArrId, destShelfId }) => {
    const response = await fetch(hostname + `/disharr/${dishArrId}`, {
        method: 'PATCH',
        body: JSON.stringify({ dishId: dishId, destShelfId: destShelfId }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.status !== 200) {
        throw new Error(`removeDish returned ${response.status}`);
    }
    const { info } = await response.json();
    console.log(info);
};

export {
    getCases,
    addCase,
    addDish,
    editDish,
    removeDish,
    moveDish,
};
