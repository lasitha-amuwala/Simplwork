import React, { useEffect, useState } from 'react';
import { useCombobox } from 'downshift';
import { SimplworkClient } from '../utils/simplwork';
import { useAuth } from './Auth/AuthProvider';
import { CandidateLocation } from '../types/api/candidate';

type Props = { update: (arg: CandidateLocation) => void };
type ItemType = {
	place_name: '';
	center: number[];
	context: any;
	place_type: string[];
	text: string;
	id?: string;
};

export const AutoComplete = ({ update }: Props) => {
	const { user } = useAuth();

	const initalItem: ItemType = { place_name: '', center: [], context: null, place_type: [], text: '' };
	const [items, setItems] = useState<ItemType[]>([initalItem]);
	const [selectedItem, setSelectedItem] = useState<ItemType | null>(null);

	useEffect(() => {
		if (selectedItem) {
			let postcode = ''
			if (selectedItem.place_type.includes("postcode")) {
				postcode = selectedItem.text
			} else if (selectedItem.context && selectedItem.context.length) {
				postcode = selectedItem.context.find((item: any) => item.id.toLowerCase().includes('postcode')).text
			}
			update({
				latitude: selectedItem.center[0],
				longitude: selectedItem.center[1],
				postalCode: postcode,
			})
		}

	}, [selectedItem])


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
				.then(({ data }) => setItems(data.features.map(({ place_name, center, context, place_type, text }: ItemType) => ({ place_name, center, context, place_type, text }))))
				.catch((err) => setItems([initalItem]));
		}
	};

	return (
		<div className='flex flex-col'>
			<label {...getLabelProps()} className='font-medium leading-[35px]'>
				Home Address:
			</label>
			<div>
				<input {...getInputProps()} className='inputStyle' />
				<ul
					{...getMenuProps()}
					className={`absolute p-0 mt-1 bg-white shadow-md overflow-auto max-h-80 w-[450px] ${!(isOpen && items.length) && 'hidden'}`}>
					{isOpen &&
						items.length &&
						items.map(
							(item, index) =>
								isOpen && (
									<li
										key={`${item.id}${index}`}
										className={`truncate p-1 border-b  ${highlightedIndex === index && 'bg-sky-100'} ${selectedItem?.place_name === item.place_name && 'text-sky-500'
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
