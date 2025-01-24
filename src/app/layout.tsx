/* eslint-disable react/no-children-prop */
import type { Metadata } from 'next'
import './globals.css'
import Layout from '@/components/sidebar-layout'
import { Poppins } from 'next/font/google'

const poppins = Poppins({ subsets: ['latin'], weight: '400' })

export const metadata: Metadata = {
  title: 'Miau Lanches',
  description: 'Venha saborear nossos lanches!'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${poppins.className} antialiased flex flex-grow`}>
        <Layout children={children} />
      </body>
    </html>
  )
}
