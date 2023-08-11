type PresentGraduatesData =
	| {
			id: string;
			name: string;
			people: {
				id: string;
				firstname: string;
				lastname: string;
				programid: number;
				email: string;
				platinum: boolean;
				highschool: boolean;
				persontype: 1 | 2 | 3;
				present: boolean;
			};
	  }[]
	| string;

export async function getPresentGraduates() {
	const result = await fetch('/api/db/get-present-graduates');
	if (!result.ok) throw new Error('Could not fetch present graduates');
	const { data } = await result.json();
	return data as PresentGraduatesData;
}

type AllAttendeesData =
	| {
			id: string;
			firstname: string;
			lastname: string;
			programid: number;
			email: string;
			platinum: boolean;
			highschool: boolean;
			persontype: 1 | 2 | 3;
			present: boolean;
			programs: {
				name: string;
			};
	  }[];

export async function getAllAttendees(
	fetch: (input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>
) {
	const result = await fetch('/api/db/get-all-attendees');
	if (!result.ok) throw new Error('Could not fetch all attendees');
	const { data } = await result.json();
	return data as AllAttendeesData;
}
