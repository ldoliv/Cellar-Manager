
import {config} from 'config';
import {unique} from 'helpers';
import prodJSON from 'data/products.json';
import uuid from 'react-uuid';



const localKeys = config.localStoreKeys;
const {LOCAL_APP_FILTERS, LOCAL_APP_PROD} = localKeys;




const getLocalStore = (key) => {
	return JSON.parse(localStorage.getItem(key));
}
const setLocalStore = (key, data) => {
	localStorage.setItem(key, JSON.stringify(data));
}

const removeLocalStore = (key) => {
	localStorage.removeItem(key);
}

// -------------------------------------------------------------------------

const getFilters = () => {
	return getLocalStore(LOCAL_APP_FILTERS);
}

const setFilters = (prefs) => {
	setLocalStore(LOCAL_APP_FILTERS, prefs);
}

// -------------------------------------------------------------------------

const getProductByID = (id) => {
	const products = getProducts();
	return products.find(prod => prod.id === id);
}

const getProducts = () => {

	let products = getLocalStore(LOCAL_APP_PROD);
	if (!products) {
		products = prodJSON.map(prod => ({
			...prod,
			id: uuid()
		}));
		addProducts(products);
	}

	return products;
}

const getProductYears = () => {
	const products = getProducts();
	const years = products.map(prod => prod.year).sort();
	const uniqYears = years.filter(unique)
	return uniqYears;
}

const getProductProperties = () => {

	const excludeProperties = ['id', 'comment'];
	const properties = [];
	const products = getProducts();
	products.forEach(prod => {
		Object.keys(prod).forEach(prop => (!excludeProperties.includes(prop) && !properties.includes(prop)) ? properties.push(prop) : null);
	});

	properties.sort();
	return properties;
}


const addProduct = (product) => {
	const products = getProducts();

	if (!product.id) {
		products.push({
			...product,
			id: uuid()
		});
	} else {
		const foundIndex = products.findIndex(prod => prod.id === product.id);
		if (foundIndex > -1) {
			products.splice(foundIndex, 1, product);
		} else {
			return false;
		}
	}

	setLocalStore(LOCAL_APP_PROD, products);
	return true;
}

const addProducts = (products = []) => {
	setLocalStore(LOCAL_APP_PROD, products);
	return true;
}

// -------------------------------------------------------------------------

const deleteStore = () => {
	Object.keys(localKeys).forEach(key => removeLocalStore(localKeys[key]));
}



export const store = {
	getFilters,
	setFilters,

	getProductByID,
	getProducts,
	getProductYears,
	getProductProperties,

	addProduct,
	addProducts,

	deleteStore
}
