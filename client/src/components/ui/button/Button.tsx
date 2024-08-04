"use client";

import styles from "./button.module.scss";

interface IButtonProps {
	text: string;
	type: "submit" | "reset" | "button"; // Added "button" type
	onClick?: () => void;
}

const Button = ({ text, type, onClick }: IButtonProps) => {
	return (
		<button type={type} className={styles.button} onClick={onClick}>
			{text}
		</button>
	);
};

export default Button;

//"use client";
//
//import styles from "./button.module.scss";
//
//interface IButtonProps {
//	id: string;
//	text: string;
//	type: "submit" | "reset";
//	onClick?: () => void;
//}
//
//export const Button = (props: IButtonProps) => {
//	const { id, text, type } = props;
//	return (
//		<button type={type} className={styles.button}>
//			{text}
//		</button>
//	);
//};
//
//export default Button;
