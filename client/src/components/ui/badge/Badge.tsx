import type { CSSProperties, PropsWithChildren } from "react";
import { tv } from "tailwind-variants";
import styles from "./badge.module.scss";

interface IBadgeProps {
	className?: string;
	variants?: string;
	style?: CSSProperties;
}

const badge = tv({
	base: styles.badge,
	variants: {
		backgroundColor: {
			gray: "bg-gray-500/20",
			high: "bg-red-400/60",
			medium: "bg-yellow-500/60",
			low: "bg-blue-400/70"
		}
	},
	defaultVariants: { backgroundColor: "gray" }
});

export const Badge = ({
	children,
	className,
	variants,
	style
}: PropsWithChildren<IBadgeProps>) => {
	return (
		<span
			className={badge({
				backgroundColor: variants as "low" | "medium" | "high",
				className
			})}
			style={style}
		>
			{children}
		</span>
	);
};

export default Badge;
