import type { JSX } from 'react';

export function App(): JSX.Element {
    return (
        <main className='app'>
            <section className='app__content'>
                <h1 className='app__title'>Bun, Vite, React, TypeScript.</h1>
                <p className='app__description'>
                    A centered starter with clear structure, sensible defaults,
                    and room to build without cleanup first.
                </p>
            </section>
        </main>
    );
}
