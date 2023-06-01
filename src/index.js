import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import { MenuProvider } from './store';

import GlobalStyles from '@/components/GlobalStyles';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <MenuProvider>
        <GlobalStyles>
            <App />
        </GlobalStyles>
    </MenuProvider>,
);
