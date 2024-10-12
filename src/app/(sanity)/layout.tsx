import "@/app/globals.css";
import ReturnBar from "@/components/ReturnBar";

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
        <ReturnBar />
        {children}
      </body>
    </html>
  )
}
