import type { PageLoad } from "./$types";

export const load = (() => {
    return {
        attendees: [
            {
                programname: "Dental Assistant",
                id: "someid",
                students: [
                    {
                        firstname: "Kevin",
                        lastname: "Charles",
                        programid: 21,
                        email: "test@test.com",
                        platinum: true,
                        highschool: false,
                        persontype: 2,
                        present: true,
                        id: "1234567890"
                    }
                ]
            }
        ]
    }
}) satisfies PageLoad;


