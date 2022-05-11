import products from 'data/products.json';

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));


const api = {
	getProducts: async () => {
		await delay(1000);
		return products.items;
	},
	getCartItems: async () => {
		await delay(1000);
		const cartItems = [
			{
				sku: 'AWDT0001-M',
				qty: 1
			}, {
				sku: 'AWDT0002',
				qty: 2
			}, {
				sku: 'AWDT0003-M',
				qty: 1
			}
		]
		return cartItems;
	},
	buyProducts: async () => {
		await delay(500);
		return true;
	}
}

export default api;