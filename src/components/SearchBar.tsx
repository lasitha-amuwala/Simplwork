type SearchBarProps = {
	value: string;
	onChange: (arg: React.ChangeEvent<HTMLInputElement>) => void;
	onClick: () => void;
};

export const SearchBar = ({ value, onChange, onClick }: SearchBarProps) => {
	return (
		<div className='w-full flex justify-center gap-3'>
			<input
				type='search'
				value={value}
				className='inputStyle w-[600px] shadow-[0_0_0_1px] shadow-gray-200 h-[42px]'
				placeholder='Search postings'
				onChange={onChange}
			/>
			<button type='submit' className='button' onClick={onClick}>
				Search
			</button>
		</div>
	);
};
