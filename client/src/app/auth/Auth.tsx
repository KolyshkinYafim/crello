"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { IAuthForm } from "@/types/auth.types";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";
import { toast } from "sonner";
import { DASHBOARD_PAGES } from "@/config/pages-url.config";
import styles from "./auth.module.scss";
import Heading from "@/components/ui/heading/Heading";
import Field from "@/components/ui/field/Field";
import Button from "@/components/ui/button/Button";

export const Auth = () => {
	const { register, handleSubmit, reset } = useForm<IAuthForm>({
		mode: "onChange"
	});

	const [isLoginForm, setIsLoginForm] = useState(false);

	const { push } = useRouter();

	const { mutate } = useMutation({
		mutationKey: ["auth"],
		mutationFn: (data: IAuthForm) =>
			authService.main(isLoginForm ? "login" : "register", data),
		onSuccess() {
			toast.success("Successfully logged in");
			reset();
			push(DASHBOARD_PAGES.HOME);
		}
	});

	const onSubmit: SubmitHandler<IAuthForm> = data => {
		mutate(data);
	};

	return (
		<div className={styles.formHandler}>
			<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
				<Heading title={"Auth"} />
				<Field
					id={"email"}
					label={"Email"}
					placeholder={"Enter email"}
					type={"email"}
					{...register("email", { required: "Email is required!" })}
				/>
				<Field
					id={"password"}
					label={"Password"}
					placeholder={"Enter password"}
					type={"password"}
					{...register("password", { required: "Password is required!" })}
				/>
				<div className={styles.formButtons}>
					<Button
						type="button"
						text={isLoginForm ? "Register" : "Login"}
						onClick={() => setIsLoginForm(!isLoginForm)}
					/>
					<Button type="submit" text={isLoginForm ? "Login" : "Register"} />
				</div>
			</form>
		</div>
	);
};

export default Auth;

//"use client";
//
//import { SubmitHandler, useForm } from "react-hook-form";
//import { IAuthForm } from "@/types/auth.types";
//import { useState } from "react";
//import { useRouter } from "next/navigation";
//import { useMutation } from "@tanstack/react-query";
//import { authService } from "@/services/auth.service";
//import { toast } from "sonner";
//import { DASHBOARD_PAGES } from "@/config/pages-url.config";
//import styles from "./auth.module.scss";
//import Heading from "@/components/ui/heading/Heading";
//import { Field } from "@/components/ui/field/Field";
//import Button from "@/components/ui/button/Button";
//
//export const Auth = () => {
//	const { register, handleSubmit, reset } = useForm<IAuthForm>({
//		mode: "onChange"
//	});
//
//	const [isLoginForm, setIsLoginForm] = useState(false);
//
//	const { push } = useRouter();
//
//	const { mutate } = useMutation({
//		mutationKey: ["auth"],
//		mutationFn: (data: IAuthForm) =>
//			authService.main(isLoginForm ? "login" : "register", data),
//		onSuccess() {
//			toast.success("Successfully logged in");
//			reset();
//			push(DASHBOARD_PAGES.HOME);
//		}
//	});
//
//	const onSubmit: SubmitHandler<IAuthForm> = data => {
//		mutate(data);
//	};
//
//	return (
//		<div className={styles.formHandler}>
//			<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
//				<Heading title={"Auth"} />
//				<Field
//					id={"email"}
//					label={"Email"}
//					placeholder={"Enter email"}
//					type={"email"}
//					{...register("email", { required: "Email is required!" })}
//				/>
//				<Field
//					id={"password"}
//					label={"Password"}
//					placeholder={"Enter password"}
//					type={"password"}
//					{...register("password", { required: "Password is required!" })}
//				/>
//				<div className={styles.formButtons}>
//					<Button onClick={() => setIsLoginForm(true)}>Login</Button>
//				</div>
//			</form>
//		</div>
//	);
//};
//// default Auth;
