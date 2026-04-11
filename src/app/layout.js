// "use client"
import "./globals.css";
import AuthProvider from "./AuthProvider";

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200"
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
