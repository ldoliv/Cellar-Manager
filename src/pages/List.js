import {useState} from "react"
import {NavLink, useNavigate} from 'react-router-dom';
import store from "store";
import FilterBar from "components/FilterBar";
import {slugifyy} from "helpers";


/*
	Filters structure:
	{
		[key]: {
			type: [type],
			value: [value]
		}
	}
*/

function getProducts() {
	return store.getProducts() || [];
}

function getFilters() {
	return store.getFilters() || {};
}


export function List() {

	const products = getProducts();
	const navigate = useNavigate();
	const [filters, setFilters] = useState(getFilters);


	function handleFilterChange(fltrs) {
		store.setFilters(fltrs);
		setFilters(fltrs);
	}

	function handleProdClick(prod) {
		// const slug = slugifyy(prod.name);
		const id = prod.id;
		navigate(id);
	}

	const filteredProducts = (() => {

		// Filter
		const filtered = products.filter(prod => {
			let found = true;

			Object.keys(filters).forEach(fieldName => {

				const {type, fieldType, value} = filters[fieldName];		// <-

				if (type === 'filter') {
					if (fieldType === 'text') {
						// search in all product fields
						found &= Object.keys(prod).some(property => prod[property].toLowerCase().includes(value.toLowerCase()))

					} else if (fieldType === 'checkbox' && value.length) {
						found &= value.includes(prod[fieldName]);
					}
				}

			})

			return found;
		});

		// Sort
		const orderBy = filters['orderby'] ? filters['orderby'].value : 'name';
		const direction = filters['direction'] ? filters['direction'].value : 'ascending';

		filtered.sort((a, b) => {
			const valA = a[orderBy].toLowerCase();
			const valB = b[orderBy].toLowerCase();

			// return (valA < valB) ? -1 : ((valA > valB) ? 1 : 0);
			return valA.localeCompare(valB);
		})
		if (direction !== 'ascending') filtered.reverse();

		return filtered;

	})();


	return (
		<div className="d-flex flex-column h-100">

			<div className="col d-flex flex-column" style={{overflow: 'hidden'}}>

				<FilterBar filters={filters} onFilterChange={handleFilterChange} />

				<div className="list-ct col p-3">
					{!filteredProducts.length && <div className="no-results">No results!</div>}
					{!!filteredProducts.length && filteredProducts.map(prod => {

						return (
							<div key={prod.name} className="product mb-3 px-3 py-2" onClick={() => handleProdClick(prod)}>
								<div className="row justify-content-between">
									<div className="col-auto">
										<div className="name">{prod.name}</div>
										<div className="vineyard">{prod.vineyard}</div>
									</div>
									<div className="col-auto">
										<div className="year">{prod.year}</div>
									</div>
								</div>
							</div>
						)
					})}

				</div>

			</div>

			<div className="btns-ct p-3 text-center">
				<NavLink className="btn btn-new" to="/new">Add Wine</NavLink>
			</div>

		</div>
	)
}
