'use client';
import TopBar from '@/components/dashboard/topbar';
import { useGuild } from '../guildContext';

export default function Page() {
    const { selectedGuild, setSelectedGuild } = useGuild();

    return (
        <div className='dashboard'>
            <TopBar type='logging' />
            <div className='dashboardwrapper'></div>
        </div>
    );
}
