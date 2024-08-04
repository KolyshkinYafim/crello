import styles from "./checkbox.module.scss";
import { useState } from "react";

interface CheckboxFieldProps {
	id: string;
	checked: boolean;
	label: string;
}

export const CheckBox = (props: CheckboxFieldProps) => {
	const { id, label, checked } = props;

	const [isChecked, setChecked] = useState(checked);

	const handleCheckboxChange = () => {
		setChecked(!isChecked);
	};

	return (
		<div className={styles.checkboxHolder}>
			<input
				type="checkbox"
				id={id}
				checked={isChecked}
				className={styles.checkbox}
				onChange={handleCheckboxChange}
			/>
			<label htmlFor={id} className={styles.label}>
				{label}
			</label>
		</div>
	);
};
export default CheckBox;
