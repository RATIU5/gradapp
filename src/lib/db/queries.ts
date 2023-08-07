
type PresentGraduatesData = {
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
    }
}[] | string;

export async function getPresentGraduates() {
    const result = await fetch("/api/db/get-present-graduates");
    if (!result.ok) throw new Error("Could not fetch present graduates");
    const { data } = await result.json();
    return data as PresentGraduatesData;
}
