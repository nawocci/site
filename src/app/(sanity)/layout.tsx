import "@/app/globals.css";

export const metadata = {
  title: 'Sanity Studio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-w-full">
        {children}
      </body>
    </html>
  )
}
