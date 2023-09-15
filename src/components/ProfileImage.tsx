import Image from 'next/image';

export const ProfileImage = ({ image }: { image: string | undefined }) => (
	<div className='rounded-full w-[150px] h-[150px] bg-sw-100 overflow-hidden flex justify-center items-center shadow-lg '>
		<div className='w-[140px] h-[140px] rounded-full relative overflow-hidden'>
			{image && (
				<Image
					className='object-cover'
					src={image.replace('s96-c', 's384-c')}
					alt='profile picture'
					fill
					quality={100}
					priority
					placeholder='blur'
					blurDataURL={image}
				/>
			)}
		</div>
	</div>
);
