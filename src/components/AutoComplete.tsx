import React, { useState } from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { useCombobox } from 'downshift';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { SimplworkClient } from '../utils/simplwork';
import { useAuth } from './Auth/AuthProvider';

type Props = {};

const AutoComplete = (props: Props) => {
	const [items, setItems] = useState([]);
	const { isOpen, getInputProps } = useCombobox({ items });
	const { user } = useAuth();

	const getResults = () => {
		if (user?.credential) {
			SimplworkClient(user?.credential).get('autoSuggest?query=toronto').then(res => console.log(res))
		}
	}

	return (
		<div className='flex flex-col'>
			<label className='font-medium leading-[35px]'>Home Address:</label>
			<input
				{...getInputProps()}
				className='box-border inline-flex h-[35px] w-full appearance-none items-center justify-center rounded-[4px] px-[10px] leading-none shadow-[0_0_0_1px]  focus:shadow-[0_0_0_2px_black]'
			/>
			<button onClick={() => getResults()}>Press</button>
			<ul>{isOpen && items.map((item, index) => <li key={`${item}${index}`}>hi</li>)}</ul>
		</div>
	);
};

export default AutoComplete;
