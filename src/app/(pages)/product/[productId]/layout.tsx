export default function ProductDetailsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header>
          <p>header</p>
        </header>
        {children}
        <footer>
          <p>siema</p>
        </footer>
      </body>
    </html>
  );
}
