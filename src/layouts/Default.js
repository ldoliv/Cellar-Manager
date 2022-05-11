import {Outlet} from 'react-router-dom';


export function DefaultLayout() {

	return (
		<div className="page d-flex flex-column">

			<div className="top-ct col-auto">
				<header className="header-bar text-center p-3">
					<div>🍷 Cellar Manager</div>
				</header>
			</div>

			<div className="content-ct col" style={{overflow: 'hidden'}}>
				<Outlet />
			</div>

		</div>
	)
}
