import React, { FC } from 'react';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import 'tailwindcss/tailwind.css';

const App: FC<AppProps> = ({ Component, pageProps }) => <Component {...pageProps} />;

export default App;
