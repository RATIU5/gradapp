import type { AllAttendeesData } from '$lib/utils/types';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
	const result = await fetch('/api/db/get-all-attendees');
	if (!result.ok) throw new Error('Could not fetch all attendees');
	const { data } = (await result.json()) as { data: AllAttendeesData[] };
	if (result.status !== 200) {
		// API data is a string if the status is not 200
		throw new Error(data as unknown as string);
	}
	return {
		attendees: data
	};
};
