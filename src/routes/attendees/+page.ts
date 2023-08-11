import { getAllAttendees } from '$lib/db/queries';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const data = await getAllAttendees();
	return {
		attendees: data
	};
};
