import UserLayout from '@/layouts/UserLayout'
import ThemeProvider from '@/providers/theme-provider'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { ReactNode } from 'react'
import '@/styles/home.css'
import '@/styles/common.css'
import '@/styles/commonMarginPadding.css'
import '@/app/(web)/globals.css'

const Maison = localFont({
  src: [
    {
      path: '../../public/fonts/Maison-Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Maison-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Maison-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Maison-Demi.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Maison-Bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-maison',
})
export const metadata: Metadata = {
  title: 'Gayatri Travels Web',
  description: 'Gayatri Travels customer portal',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={Maison.className}>
      <ThemeProvider>
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin=""
          />
        <link href="/src/style.css" rel="stylesheet"/>
        </head>
        <body>
          <UserLayout>{children}</UserLayout>
          {/* <Toast limit={1} /> */}
        </body>
      </ThemeProvider>
    </html>
  )
}
