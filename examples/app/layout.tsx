"use client";

import "../styles/globals.css";

export default function Layout({ children }: { children: React.ReactNode }) {

    return (
        <html lang="en">
            <body>
                <main>
                    {children}
                </main>
            </body>
        </html>
    );

}
