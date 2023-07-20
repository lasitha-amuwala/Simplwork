import { ErrorMessage } from 'formik';

export const CustomErrorMessage = ({ name }: { name: string }) => {
	return <ErrorMessage name={name} render={(msg: string) => <p className={'text-sm font-medium text-red-700 py-1'}>{msg}</p>} />;
};
