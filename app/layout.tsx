import './globals.css'

export const metadata = {
  title: 'Job Application Tracker (Lite)'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="site-banner">
          <div className="banner-inner">
            <div className="banner-title">Job Tracker</div>
            <div className="banner-sub">Find and apply to jobs near Jaipur</div>
          </div>
        </div>
        <main className="container">{children}</main>
      </body>
    </html>
  )
}
