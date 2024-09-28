import DashboardNav from './dashboardNav.jsx';
import '@css/global/dashboard.global.css';
import { GuildProvider } from '@components/context/guildContext.jsx';

export const metadata = {
    title: 'Polar Lab | Polaris Dashboard',
    description: 'The one and only Polaris V2 dashboard',
};

export default function DashboardLayout({ children }) {
    return (
        <div className='mainWrapper'>
            <GuildProvider>
                <DashboardNav />
                {children}
            </GuildProvider>
        </div>
    );
}
