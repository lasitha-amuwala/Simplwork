import { Form, Formik, FormikConfig, FormikValues } from 'formik';
import React, { ReactNode } from 'react';

export const FormikLayout = ({ initialValues, onSubmit, children, ...rest }: FormikConfig<FormikValues>) => {
	return (
		<Formik initialValues={initialValues} onSubmit={onSubmit} {...rest}>
			{({ values, setFieldValue }) => (
				<Form noValidate>
					{children as ReactNode}
					{/* <div>{JSON.stringify(values, null, 2)}</div> */}
				</Form>
			)}
		</Formik>
	);
};
