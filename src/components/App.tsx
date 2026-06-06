import type { JSX } from 'react';

export function App(): JSX.Element {
    return (
        <main className='app'>
            <section className='app__content'>
                <h1 className='app__title'>Vite, React, TypeScript.</h1>
                <p className='app__description'>
                    A minimal template for you to kick start your project
                </p>
            </section>
        </main>
    );
}
