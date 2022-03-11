import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Layout from './layouts/Layout';
import SearchLayout from './components/SearchLayout';


ReactDOM.render(
    <React.StrictMode>
      <Layout 
        mainLayout={<App/>}
        subLayout= {<SearchLayout/>}>
      </Layout>
    </React.StrictMode>,
  document.getElementById('root')
);

