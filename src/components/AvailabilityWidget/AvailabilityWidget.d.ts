import { CandaidateAvailibility } from '@typings/api/candidate';

interface AvailabilityWidgetProps {
	hourlyChunks?: number;
	readonly?: boolean;
	availability?: CandaidateAvailibility;
	onChange?: (arg: CandaidateAvailibility) => void;
}
