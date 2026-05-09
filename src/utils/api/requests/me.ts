export async function getMe() {
	const user = localStorage.getItem('user') ?? undefined;

	if (user) {
		return JSON.parse(user);
	}
	return undefined;
}