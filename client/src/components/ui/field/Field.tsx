import { ForwardedRef, forwardRef } from "react";
import styles from "./field.module.scss";

interface InputFieldProps {
	id?: string;
	label?: string;
	placeholder?: string;
	state?: "error" | "success";
	disabled?: boolean;
	type?: string;
	isNumeric?: boolean;
}

export const Field = forwardRef<HTMLInputElement, InputFieldProps>(
	(props: InputFieldProps, ref: ForwardedRef<HTMLInputElement>) => {
		const { id, label, placeholder, state, disabled, type, isNumeric } = props;

		return (
			<div className={styles.fieldHolder}>
				<label htmlFor={id} className={styles.label}>
					{label}
				</label>
				<input
					id={id}
					ref={ref}
					placeholder={placeholder}
					className={`${styles.input} ${state === "error" ? styles.error : ""} ${state === "success" ? styles.success : ""}`}
					disabled={disabled}
					type={type}
					data-is-numeric={isNumeric}
				/>
			</div>
		);
	}
);

export default Field;

Field.displayName = "Field";
