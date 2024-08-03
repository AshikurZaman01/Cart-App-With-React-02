
const getBottlesToLocalStorage = () => {
    const bottles = localStorage.getItem('bottles');

    if (bottles) {
        return JSON.parse(bottles);
    } else {
        return [];
    }
}

const saveBottlesToLocalStorage = (bottle) => {
    if (bottle) {
        return localStorage.setItem('bottles', JSON.stringify(bottle));
    }
}

const addToCartLocalStorage = (id) => {

    const bottles = getBottlesToLocalStorage();

    bottles.push(id);

    saveBottlesToLocalStorage(bottles);
}


export {
    getBottlesToLocalStorage,
    saveBottlesToLocalStorage,
    addToCartLocalStorage

}