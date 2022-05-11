import {useState} from 'react';
import {useParams, useNavigate, NavLink} from 'react-router-dom';
import store from 'store';
import toast, {Toaster} from 'react-hot-toast';



const saveSuccess = (msg) => toast.success(msg);
const saveError = (msg) => toast.error(msg);


export function Detail() {

	const navigate = useNavigate();
	const params = useParams();
	const id = params.id;

	const [fieldValues, setFieldValues] = useState(() => {

		const product = store.getProductByID(id) || {
			name: '',
			vineyard: '',
			year: '',
			comment: ''
		};

		return product;
	});

	// console.log(slug);



	function handleInputChange(e) {
		const {name, value} = e.target;
		setFieldValues({
			...fieldValues,
			[name]: value.trimStart()
		})
	}

	function handleSave() {

		const notRequired = ['comment'];

		// if any fields are empty show error
		Object.keys(fieldValues).some(fieldName => !notRequired.includes(fieldName) && !fieldValues[fieldName])
			? saveError('Fill in required fields!')
			// save field values
			: store.addProduct(fieldValues)
				? saveSuccess('Saved Successfully!')
				: saveError('Error Saving!')
	}

	return (
		<div className="d-flex flex-column h-100">

			<div className="inner-detail col" style={{overflow: 'hidden'}}>
				<div className="list-ct h-100 p-3 py-4">

					<div className="form-ct">

						<div className="field-ct mb-3">
							<label htmlFor="name" className="form-label">Name *</label>
							<input type="text" name="name" className="form-control" id="name" onChange={handleInputChange} value={fieldValues['name']} />
						</div>
						<div className="field-ct mb-3">
							<label htmlFor="vineyard" className="form-label">Vineyard *</label>
							<input type="text" name="vineyard" className="form-control" id="vineyard" onChange={handleInputChange} value={fieldValues['vineyard']} />
						</div>
						<div className="field-ct mb-3">
							<label htmlFor="year" className="form-label">Year *</label>
							<input type="number" name="year" className="form-control" id="year" onChange={handleInputChange} value={fieldValues['year']} />
						</div>
						<div className="field-ct mb-3">
							<label htmlFor="comment" className="form-label">Comment</label>
							<textarea name="comment" className="form-control" id="comment" onChange={handleInputChange} value={fieldValues['comment']} />
						</div>

					</div>
				</div>

				<Toaster
					position="bottom-center"
					containerStyle={{
						position: 'absolute',
						bottom: 40,
					}}
					toastOptions={{
						duration: 1500,
						// duration: 50000,
					}}
				/>

			</div>

			<div className="btns-ct p-3">
				<div className="row justify-content-between">
					<div className="col-auto">
						<button className="btn btn-back" onClick={() => navigate(-1)}>
							<div className="icon me-2">
								<i className="fa-solid fa-arrow-left"></i>
							</div>
							Back
						</button>
						{/* <NavLink className="btn btn-add-wine" to="/new">Add Wine</NavLink> */}
					</div>
					<div className="col-auto">
						<button className="btn btn-save" onClick={handleSave}>Save</button>
					</div>
				</div>
			</div>

		</div>
	)
}
