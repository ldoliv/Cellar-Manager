import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/scss/style.scss';

import {Routes, Route} from 'react-router-dom';
import {List, Detail} from 'pages';
import {DefaultLayout} from 'layouts/Default';


function App() {

   return (
      <Routes>
         <Route path="/" element={<DefaultLayout />}>
            <Route index element={<List />} />
            <Route path=":id" element={<Detail />} />
         </Route>
      </Routes>
   );
}

export default App;
