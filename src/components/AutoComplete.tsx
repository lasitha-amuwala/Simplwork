import { useEffect, useState } from 'react';
import { useCombobox } from 'downshift';
import { SimplworkApi } from '../utils/simplwork';

type Props = { update: (arg: SW.ILocation) => void };

type ItemType = {
	place_name: '';
	center: number[];
	context: any;
	place_type: string[];
	text: string;
	id?: string;
};

export const AutoComplete = ({ update }: Props) => {
	const initalItem: ItemType = { place_name: '', center: [], context: null, place_type: [], text: '' };
	const [items, setItems] = useState<ItemType[]>([initalItem]);
	const [selectedItem, setSelectedItem] = useState<ItemType | null>(null);

	useEffect(() => {
		if (selectedItem) {
			let postcode = '';
			if (selectedItem.place_type.includes('postcode')) {
				postcode = selectedItem.text;
			} else if (selectedItem.context && selectedItem.context.length) {
				const findPostCode = selectedItem.context.find((item: any) => item.id.toLowerCase().includes('postcode'));
				if (findPostCode) postcode = findPostCode.text;
			}
			update({
				longitude: selectedItem.center[0],
				latitude: selectedItem.center[1],
				postalCode: postcode.replace(/\s+/g, '').toUpperCase(),
			});
		}
	}, [selectedItem]);

	const { isOpen, highlightedIndex, getInputProps, getMenuProps, getItemProps, getLabelProps } = useCombobox({
		items,
		selectedItem,
		onInputValueChange: ({ inputValue }) => getResults(inputValue),
		itemToString: (item) => (item ? item.place_name : ''),
		onSelectedItemChange: ({ selectedItem: newSelectedItem }) => setSelectedItem(newSelectedItem ?? null),
	});

	const getResults = async (inputValue?: string) => {
		if (!inputValue && !inputValue?.length) setItems([initalItem]);

		if (inputValue && inputValue.length > 3) {
			const query = inputValue.replaceAll(/[^a-zA-Z0-9 ]/g, '');
			await SimplworkApi.get(`geocoding?query=${query}`)
				.then(({ data }) =>
					setItems(
						data.features.map((item: ItemType) => ({
							place_name: item.place_name,
							center: item.center,
							context: item.context,
							place_type: item.place_type,
							text: item.text,
						}))
					)
				)
				.catch((err) => setItems([initalItem]));
		}
	};

	return (
		<div className='flex flex-col'>
			<label {...getLabelProps()} className='font-medium leading-[35px]'>
				Home Address
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
