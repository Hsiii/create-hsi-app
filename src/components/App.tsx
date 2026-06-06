import type { JSX } from 'react';

export function App(): JSX.Element {
    return (
        <main className='app'>
            <section className='app__content'>
                <h1 className='app__title'>Vite, React, TypeScript.</h1>
                <p className='app__description'>
                    create-hsi-app - kick start your frontend project.
                </p>
            </section>
        </main>
    );
}
