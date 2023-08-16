export interface AvailabilityWidgetProps {
	hourlyChunks?: number;
	readonly?: boolean;
	availability?: SW.IAvailability;
	onChange?: (arg: SW.IAvailability) => void;
}
