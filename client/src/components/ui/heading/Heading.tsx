import styles from "./heading.module.scss";

interface IHeading {
	title: string;
}
export const Heading = (props: IHeading) => {
	const { title } = props;
	return (
		<>
			<h1 className={styles.headingHolder}>{title}</h1>
			<div className={styles.headingBorder} />
		</>
	);
};

export default Heading;
