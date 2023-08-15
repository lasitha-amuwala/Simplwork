type CandaidateAvailibility = import('../../types/api/candidate').CandaidateAvailibility;

export interface AvailabilityWidgetProps {
	hourlyChunks?: number;
	readonly?: boolean;
	availability?: CandaidateAvailibility;
	onChange?: (arg: CandaidateAvailibility) => void;
}
