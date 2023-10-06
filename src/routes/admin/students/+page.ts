import type { AllProgramsData } from '$lib/utils/types';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
	const result = await fetch('/api/db/get-all-programs');
	if (!result.ok) throw new Error('Could not fetch all programs');
	const { data } = (await result.json()) as { data: AllProgramsData[] };
	if (result.status !== 200) {
		// API data is a string if the status is not 200
		throw new Error(data as unknown as string);
	}
	return {
		programs: data
	};
};
