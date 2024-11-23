import "~/styles/globals.css"

import { Geist } from "next/font/google"

import { type Metadata } from "next"

import { TRPCReactProvider } from "~/trpc/react"

const geistSans = Geist({
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={geistSans.className}>
      <body>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  )
}
