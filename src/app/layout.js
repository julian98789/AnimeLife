import { Inter } from "next/font/google";
import "./globals.css";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "AnimeLife",
	description: "El mundo del anime esta en ti",
};

export default function RootLayout({ children }) {
	return (
		<html lang="es">

<body className={`${inter.className} w-full overflow-hidden`}>
        <div className="w-full h-screen bg-gradient-to-b from-black to-neutral-800 overflow-y-auto">
          <main className="min-h-screen">
            {children}
          </main>
        </div>
      </body>
		</html>
	);
}
