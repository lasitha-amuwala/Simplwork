import React, { useState } from 'react';
import { useCombobox } from 'downshift';
import { SimplworkClient } from '../utils/simplwork';
import { useAuth } from './Auth/AuthProvider';
import { useQuery } from '@tanstack/react-query';

type Props = {};
type ItemType = {
	place_name: '';
	center: number[];
	id?: string;
};

const AutoComplete = (props: Props) => {
	const { user } = useAuth();

	const initalItem: ItemType = { place_name: '', center: [] };
	const [items, setItems] = useState<ItemType[]>([initalItem]);
	const [selectedItem, setSelectedItem] = useState<ItemType | null>(null);

	const { isOpen, highlightedIndex, getInputProps, getMenuProps, getItemProps, getLabelProps } = useCombobox({
		items,
		selectedItem,
		onInputValueChange: ({ inputValue }) => getResults(inputValue),
		itemToString: (item) => (item ? item.place_name : ''),
		onSelectedItemChange: ({ selectedItem: newSelectedItem }) => setSelectedItem(newSelectedItem ?? null),
	});

	const getResults = async (inputValue?: string) => {
		if (!inputValue && !inputValue?.length) setItems([initalItem]);

		if (inputValue && inputValue.length > 3 && user?.credential) {
			const query = inputValue.replaceAll(/[^a-zA-Z0-9 ]/g, '');
			await SimplworkClient(user?.credential)
				.get(`geocoding?query=${query}`)
				.then(({ data }) => setItems(data.features.map(({ place_name, center }: ItemType) => ({ place_name, center }))))
				.catch((err) => setItems([initalItem]));
		}
	};

	return (
		<div className='flex flex-col'>
			<label {...getLabelProps()} className='font-medium leading-[35px]'>
				Home Address:
			</label>
			<div>
				<input
					{...getInputProps()}
					className='box-border inline-flex h-9 w-full appearance-none items-center justify-center rounded-[4px] px-[10px] leading-none shadow-[0_0_0_1px]  focus:shadow-[0_0_0_2px_black]'
				/>
				<ul
					{...getMenuProps()}
					className={`absolute p-0 w-[350px] mt-1 bg-white shadow-md overflow-auto max-h-80 ${!(isOpen && items.length) && 'hidden'}`}>
					{isOpen &&
						items.length &&
						items.map(
							(item, index) =>
								isOpen && (
									<li
										key={`${item.id}${index}`}
										className={`truncate p-1 border-b  ${highlightedIndex === index && 'bg-sky-100'} ${
											selectedItem?.place_name === item.place_name && 'text-sky-500'
										}`}
										{...getItemProps({ item, index })}>
										<span className='font-semibold'>{`${item.place_name.split(',')[0]}`}</span>
										<span className='text-sm'>{item.place_name.split(',').splice(1).join(',')}</span>
									</li>
								)
						)}
				</ul>
			</div>
		</div>
	);
};

export default AutoComplete;
