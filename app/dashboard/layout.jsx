import DashboardNav from './dashboardNav.jsx';
import '../../src/css/dashboard/dashboard.css';

export const metadata = {
    title: 'Polar Lab | Polaris Dashboard',
    description: 'The one and only Polaris V2 dashboard',
};

export default function DashboardLayout({ children }) {
    return (
        <>
            <DashboardNav />
            <div className='dashboard'>{children}</div>
        </>
    );
}
