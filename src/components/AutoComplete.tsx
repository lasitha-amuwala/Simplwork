import React, { useState } from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { useCombobox } from 'downshift';
import { useQuery } from '@tanstack/react-query';

type Props = {};

const AutoComplete = (props: Props) => {
	const [items, setItems] = useState([]);
	const { isOpen, getInputProps } = useCombobox({ items });

	const { data } = useQuery({
		queryKey: ['search', 'toronto'],
		queryFn: () => fetch('https://simplwork.com/api/autoSuggest?query=toronto', {context: {headers: {authorization: `Bearer`}}}).then((res) => res.json()),
	});

	return (
		<div className='flex flex-col'>
			<label className='font-medium leading-[35px]'>Home Address:</label>
			<input
				{...getInputProps()}
				className='box-border inline-flex h-[35px] w-full appearance-none items-center justify-center rounded-[4px] px-[10px] leading-none shadow-[0_0_0_1px]  focus:shadow-[0_0_0_2px_black]'
			/>
			<ul>{isOpen && items.map((item, index) => <li key={`${item}${index}`}>hi</li>)}</ul>
		</div>
	);
};

export default AutoComplete;
