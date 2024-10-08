'use client';
import { useSearchParams } from 'next/navigation';
import Terms from '@/components/legal/terms';
import Privacy from '@/components/legal/privacy';

export default function Page() {
    const page = useSearchParams().get('page');

    if (!page) {
        window.location.href = '/legal?page=terms';
    }

    return <div>{page === 'terms' ? <Terms /> : page === 'privacy' ? <Privacy /> : <></>}</div>;
}
