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

			<body className={`${inter.className} w-full  bg-slate-400`}>
				<main className="w-full h-full  ">
					{children}
				</main>
			</body>
		</html>
	);
}
