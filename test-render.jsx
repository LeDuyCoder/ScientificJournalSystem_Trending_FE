import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import Sidebar from './src/components/sidebar/Sidebar';

const html = renderToString(
  <StaticRouter location="/journals">
    <Sidebar />
  </StaticRouter>
);

console.log(html);
