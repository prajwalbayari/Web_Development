import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Hi from root layout",
  description: "Desc from root",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <nav>
          <ul>
            <li>
              <Link href={"/"}>Home</Link>
            </li>
            <li>
              <Link href={"/about"}>About</Link>
            </li>
            <li>
              <Link href={"/team"}>Team</Link>
            </li>
          </ul>
        </nav>
        {children}
      </body>
    </html>
  );
}
