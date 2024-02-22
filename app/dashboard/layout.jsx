import DashboardNav from './dashboardNav.jsx';
import '../../src/css/dashboard/dashboard.css';

export default function DashboardLayout({ children }) {
    return (
        <>
            <DashboardNav />
            <div className='dashboard'>{children}</div>
        </>
    );
}
