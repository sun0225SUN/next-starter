import { type Metadata } from "next"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { Geist } from "next/font/google"
import { notFound } from "next/navigation"
import { ThemeProvider } from "~/components/theme/provider"
import { routing } from "~/i18n/routing"
import "~/styles/globals.css"
import { TRPCReactProvider } from "~/trpc/react"

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
  preload: true,
  weight: "400",
  fallback: ["system-ui", "sans-serif"],
})

export const metadata: Metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
}

type Params = Promise<{ locale: string }>

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Params
}) {
  const { locale } = await params

  // Ensure that the incoming `locale` is valid
  // eslint-disable-next-line
  if (!routing.locales.includes(locale as any)) {
    notFound()
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  // eslint-disable-next-line
  const messages = await getMessages()

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={geistSans.className}
    >
      <body>
        <NextIntlClientProvider messages={messages}>
          <TRPCReactProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </TRPCReactProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
