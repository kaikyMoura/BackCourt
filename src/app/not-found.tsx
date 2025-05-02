'use client';

import Button from '@/components/Button';
import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold">Page not found</h1>
            <p className="mt-4">The page you are looking for does not exist</p>
            <Button style="primary" className='mt-4 p-4'>
                <Link href="/">Back to Home</Link>
            </Button>
        </div>
    );
}