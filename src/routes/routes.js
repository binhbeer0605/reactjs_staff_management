import { Home, Employees, PageNotFound } from '@/pages';

const { default: config } = require('@/config');

const publicRoutes = [];

const privateRoutes = [
    { path: config.routes.home, component: Home, role: ['Admin', 'Employee', 'User'] },
    { path: config.routes.employees, component: Employees, role: ['Admin', 'Employee'] },
    { path: config.routes.notfound, component: PageNotFound, role: ['Admin', 'Employee', 'User'] },
];

export { publicRoutes, privateRoutes };
