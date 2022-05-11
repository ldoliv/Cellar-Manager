import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/scss/style.scss';

import {Routes, Route} from 'react-router-dom';
import {DefaultLayout} from 'layouts/Default';
import {List, Detail} from 'pages';


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
