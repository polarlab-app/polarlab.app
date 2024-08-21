import DashboardNav from './dashboardNav.jsx';
import '@css/global/dashboard.global.css';
import { GuildProvider } from './guildContext';

export const metadata = {
    title: 'Polar Lab | Polaris Dashboard',
    description: 'The one and only Polaris V2 dashboard',
};

export default function DashboardLayout({ children }) {
    return (
        <div className='mainwrapper'>
            <GuildProvider>
                <DashboardNav />
                {children}
            </GuildProvider>
        </div>
    );
}
