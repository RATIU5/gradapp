export type AllAttendeesData = {
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
};

export type PresentGraduateData = {
	name: string;
	id: string;
	people: {
		id: string;
		firstname: string;
		lastname: string;
		email: string;
		persontype: 1 | 2 | 3;
		present: boolean;
		highschool: boolean;
		platinum: boolean;
		programid: number;
	}[];
};
