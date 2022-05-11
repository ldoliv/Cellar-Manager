import './filtersmodal.scss';
import {useState} from 'react';
import {capitalizeFirstLetter} from 'helpers';



export function FiltersModal(props) {

	const [isOpened, setIsOpened] = useState(false);
	const [fieldVals, setFieldVals] = useState(getInitialState);


	// console.log('fieldValues: %o', fieldVals);


	// Build initial state based on checked values
	function getInitialState() {

		const initialState = {};

		props.fields.forEach(field => {
			const {name, type, fieldType, values} = field;

			initialState[name] = {
				type,
				fieldType,
				value: (fieldType === 'checkbox')
					// if every value is checked then [] no need to keep all the values
					? values.every(obj => obj.checked) ? [] : values.filter(obj => obj.checked).map(obj => obj.value)

					: (fieldType === 'radio')
						// get checked value
						? values.find(obj => obj.checked).value
						: null
			}
		})

		// console.log(initialState);
		return initialState;
	}

	const handleCheckChange = (e) => {
		const {name, value, checked, type} = e.target;
		const currFieldVals = fieldVals[name].value;
		const newFieldVals = {...fieldVals};
		let newVal;


		if (type === 'radio') {
			newVal = value;

		} else if (type === 'checkbox') {

			// set fieldVals[name].value = [] for when all checkboxes are checked

			const allFieldValues = props.fields.find(field => field.name === name).values.map(obj => obj.value);

			if (checked) {

				if (currFieldVals.length + 1 === allFieldValues.length) {
					newVal = [];
				} else {
					newVal = [...currFieldVals, value];
				}

			} else {

				if (!currFieldVals.length) {
					// <- if checkbox field has no set values, get all values and exclude the one that has been unchecked
					newVal = allFieldValues.filter(val => val !== value)

				} else {
					newVal = currFieldVals.filter(val => val !== value)
				}
			}
		}

		newFieldVals[name].value = newVal;

		setFieldVals(newFieldVals);
	}

	function toggleCheckAll(field) {

		const {name, values} = field;
		const newFieldVals = {...fieldVals};
		const currFieldVals = fieldVals[name].value;
		const allFieldValues = values.map(obj => obj.value);

		if (!currFieldVals.length) {

		} else {

		}

		setFieldVals(newFieldVals);
	}

	const openFilters = () => {
		setIsOpened(true);
	}

	const closeFilters = () => {
		setIsOpened(false);
		props.onFilterChange(fieldVals);
	}


	return (
		<div id="open-filters">

			<div className="open-filters-btn d-flex justify-content-end align-items-center ms-2" onClick={openFilters}>
				<i className="fas fa-sliders-h"></i>
			</div>

			<div className={`cs-modal filters-modal ${isOpened ? 'opened' : ''}`}>

				<div className="overlay" onClick={closeFilters}></div>

				<div className="cs-modal-outer pt-3 pb-4 d-flex flex-column">

					<div className="d-flex align-items-center mb-2 col-auto px-3">
						<div className="cs-modal-title text-center col">
							<span className="icon me-2">
								<i className="fas fa-sliders-h"></i>
							</span>
							<span className='text'>Filters</span>
						</div>
						<div className="cs-modal-close col-auto" onClick={closeFilters}>
							<i className="fas fa-times"></i>
						</div>
					</div>

					<div className="fields-outer-ct px-3">

						{props.fields.map(field => {

							const {name, label, fieldType, values} = field;
							const currFieldVals = fieldVals[name].value;

							return (
								<div className="fields-ct col p-3" key={`val-${name}`}>
									<div className="field-group">
										<div className="d-flex justify-content-between">
											<div className="field-group-title ms-2">{label}</div>
											{/* <div className="field-group-check" onClick={() => toggleCheckAll(field)}>{!currFieldVals.length ? 'Uncheck All' : 'Check All'}</div> */}
										</div>
										<div className="fields-list">
											{values.map((valObj, index) => {
												const {value} = valObj;
												const checked = (fieldType === 'radio')
													? currFieldVals.includes(value)
													: !currFieldVals.length
														? true		// <- set to checked if no checkbox values have been set
														: currFieldVals.includes(value)

												// console.log('checked: %o', checked);

												return (
													<div key={value} className="field px-3 d-flex align-items-center">
														<div className="pe-3 ms-auto">
															<div className="input-checkbox">
																<input className="form-check-input" name={name} type={fieldType} value={value} id={`${name}-${value}`} onChange={handleCheckChange} checked={checked} />
															</div>
														</div>
														<label className="w-100 pe-2" htmlFor={`${name}-${value}`}>{capitalizeFirstLetter(value)}</label>
													</div>)
											})}
										</div>
									</div>
								</div>
							)
						})}

					</div>

				</div>
			</div>
		</div>
	)
}