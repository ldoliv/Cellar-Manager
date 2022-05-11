import './filterbar.scss';
import FiltersModal from 'components/FiltersModal';
import store from 'store';



export function FilterBar(props) {


	function handleTextSearch(e) {
		const {name, type, value} = e.target;

		props.onFilterChange({
			...props.filters,
			[name]: {
				type: 'filter',
				fieldType: type,
				value: value.trimStart()
			}
		})
	}

	function handleModalFiltersChange(newFltrs) {

		props.onFilterChange({
			...props.filters,
			...newFltrs
		})
	}


	const textSearchFName = 'text-search';
	const textSearchFVal = props.filters[textSearchFName]?.value || '';

	// Exclude the text search from filters, in order to send the remaining filter values to FiltersModal Component
	// const filtersExcludeTextSearch = {...props.filters};
	// delete filtersExcludeTextSearch[textSearchFName];


	return (
		<div className="filter-bar px-3 py-2 col-auto">
			<div className="d-flex align-items-center">

				<div className="col">
					<input type="text" className="form-control" name={textSearchFName} placeholder='Search' onChange={handleTextSearch} value={textSearchFVal} />
				</div>

				<div className="col-auto">
					<FiltersModal fields={[
						{
							name: 'year',		// <- same as product field
							label: 'Years',
							type: 'filter',
							fieldType: 'checkbox',
							values: store.getProductYears().map(year => {
								const filterVal = props.filters['year']?.value;
								return {
									value: year,
									checked: !filterVal ? true : filterVal.includes(year)
								}
							})
						},
						{
							name: 'orderby',
							label: 'Order by',
							type: 'sort',
							fieldType: 'radio',
							values: store.getProductProperties().map((prop, index) => {
								const filterVal = props.filters['orderby']?.value;
								return {
									value: prop,
									checked: !filterVal
										? index === 0 ? true : false
										: filterVal.includes(prop)
								}
							})
						},
						{
							name: 'direction',
							label: 'Order Direction',
							type: 'sort',
							fieldType: 'radio',
							values: ['ascending', 'descending'].map((dir, index) => {
								const filterVal = props.filters['direction']?.value;
								return {
									value: dir,
									checked: !filterVal
										? index === 0 ? true : false
										: filterVal.includes(dir)
								}
							})
						}
					]}
						// filters={filtersExcludeTextSearch}
						onFilterChange={handleModalFiltersChange} />
				</div>
			</div>
		</div>
	)
}