import { Loader as LoaderIcon } from "lucide-react";
import styles from "./loader.module.scss";

export const Loader = () => {
	return (
		<div className={styles.loaderHolder}>
			<LoaderIcon className={"animate-spin h-5 w-5 text-white"} />
		</div>
	);
};

export default Loader;
