import { passwordRules } from "#/lib/schema/sign-up-schema";
import { cn } from "#/utils/class-helper";

import { Meter } from "#/components/ui/kobalte-meter";

interface Props {
	inputValue: string;
}

export const PasswordStrengthMeter = (props: Props) => {
	// all password rules passing state
	const rulesPassedState = () =>
		passwordRules.map((rule) => {
			const isPassed = () => rule.test(props.inputValue);

			return isPassed();
		});

	// only passing password rules state
	const passedRules = () => rulesPassedState().filter(Boolean);

	const getMeterValue = () => {
		switch (passedRules().length) {
			case 1:
				return 25;
			case 2:
				return 50;
			case 3:
				return 75;
			case 4:
				return 100;
			default:
				return 0;
		}
	};

	const getMeterLabel = (value: number) => {
		switch (value) {
			case 25:
				return "Weak";
			case 50:
				return "Fair";
			case 75:
				return "Good";
			case 100:
				return "Strong";
			default:
				return "";
		}
	};

	return (
		<Meter
			value={getMeterValue()}
			getValueLabel={({ value }) => getMeterLabel(value)}
			class="grid gap-1.75">
			<Meter.Track>
				<Meter.Fill class="grid grid-cols-4 gap-1">
					<span
						class={cn(
							"bg-border transition-colors duration-200 block-full inline-full",
							{ "bg-text-error": getMeterValue() === 25 },
							{ "bg-fair": getMeterValue() === 50 },
							{ "bg-primary": getMeterValue() >= 75 },
						)}></span>
					<span
						class={cn(
							"bg-border transition-colors duration-200 block-full inline-full",
							{ "bg-fair": getMeterValue() === 50 },
							{ "bg-primary": getMeterValue() >= 75 },
						)}></span>
					<span
						class={cn(
							"bg-border transition-colors duration-200 block-full inline-full",
							{ "bg-primary": getMeterValue() >= 75 },
						)}></span>
					<span
						class={cn(
							"bg-border transition-colors duration-200 block-full inline-full",
							{ "bg-primary": getMeterValue() === 100 },
						)}></span>
				</Meter.Fill>
			</Meter.Track>

			<div class="flex items-center justify-between gap-4">
				<Meter.Label>Password strength</Meter.Label>
				<Meter.ValueLabel
					class={cn(
						"text-end tracking-500 uppercase",
						{ "text-text-error": getMeterValue() === 25 },
						{ "text-fair": getMeterValue() === 50 },
						{ "text-primary": getMeterValue() >= 75 },
					)}
				/>
			</div>
		</Meter>
	);
};
