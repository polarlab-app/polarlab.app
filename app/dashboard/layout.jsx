import DashboardNav from './dashboardNav.jsx';
import '@css/global/dashboard.global.css';
import { GuildProvider } from '@components/context/guildContext.jsx';

export const metadata = {
    title: 'Polar Lab | Polaris Dashboard',
    description:
        'Access the Polaris Dashboard, your central hub for managing your Discord server with powerful tools, analytics, and features designed to optimize your server management experience using this discord bot.',
    keywords: ['dashboard', 'Polar Lab', 'services', 'community'],
    authors: [{ name: 'Aertic', url: 'https://polarlab.app' }],
    creator: 'Aertic',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    openGraph: {
        images: [
            {
                url: 'https://cdn.polarlab.app/src/img/polarlogo.png',
                width: 1200,
                height: 630,
            },
        ],
    },
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
