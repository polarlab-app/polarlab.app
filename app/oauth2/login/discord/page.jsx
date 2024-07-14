import { redirect } from 'next/navigation';
export default async function Page() {
    redirect(process.env.AUTH_URI);
}
