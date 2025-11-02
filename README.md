This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


- 1er error:
  ```Console TypeError
        (0 , _stellar_freighter_api__WEBPACK_IMPORTED_MODULE_2__.getPublicKey) is not a function
        src\components\WalletConnect.jsx (38:41) @ WalletConnect.useEffect.checkConnection


        36 |         // Verificar si Freighter está instalado y conectado
        37 |         if (await isConnected()) {
        > 38 |           const key = await getPublicKey();
            |                                         ^
        39 |           setPublicKey(key);
        40 |           onConnect(key);
        41 |         }
        Call Stack
        1

        WalletConnect.useEffect.checkConnection
        src\components\WalletConnect.jsx (38:41)
 ```

- 2do error: habilite la marca __jsx en el archivo de configuracion
```json

//jsconfig.json
{
  "compilerOptions": {
    "jsx": "react-jsx"
  },
  "include": ["src"]
}
```