import * as ReactDOM from 'react-dom/client';
import './styles.css';
import axios from 'axios';
import Page from './pages/Main';

axios.defaults.baseURL = "https://editor-api.lidojs.com"

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(<Page />);
