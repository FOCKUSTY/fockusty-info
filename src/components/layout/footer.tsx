"use client";

import { Logo } from "@/components/logo/thevoid";
import { Api } from "api";
import { PathsSection } from "./sections";
import useMediaQuery from "@/hooks/media.hook";

type Props = {
	halloweenEnabled: boolean;
	setHalloweenEnabled: (v: boolean) => void;
	date: string;
	paths: Record<string, string>;
	currentPath: string;
	params: Record<string, string>;
};

export const Footer = ({ halloweenEnabled, setHalloweenEnabled, date, paths, currentPath }: Props) => {
	const isLessThanMinimal = useMediaQuery("(max-width: 425px)");
	const isLessThanMinimalTabletop = useMediaQuery("(max-width: 768px)");

	return (
		<footer>
			<Logo id="footer-logo" head={<h2>© {date} The Void</h2>} links={isLessThanMinimal ? Api.fockusty : Api.the_void} />

					<PathsSection
						paths={paths}
						currentPath={currentPath}
						className={isLessThanMinimalTabletop ? "paths-vertical" : "paths-horizontal"}
					/>

			<div>
				<button
					className="halloween-toggle"
					onClick={() => {
						try {
							const next = !halloweenEnabled;
							setHalloweenEnabled(next);
							localStorage.setItem("halloween_enabled", next ? "1" : "0");
						} catch {
							setHalloweenEnabled(!halloweenEnabled);
						}
					}}
				>
					{halloweenEnabled ? "Откл. Halloween" : "Вкл. Halloween"}
				</button>
			</div>
		</footer>
	);
};

export default Footer;
