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
