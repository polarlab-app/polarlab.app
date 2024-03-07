import dynamic from 'next/dynamic';
import { Suspense } from 'react';

export default function Page({ params }) {
    const issue = params.issue;
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <IssueContent />
        </Suspense>
    );
}
