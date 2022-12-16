declare global {
	interface Window {
		electronAPI: {
			getProfile(): Promise<string|undefined>;
			getToken(): Promise<string|undefined>;
			logOut(): Promise<boolean>;
			logIn(token: string): Promise<boolean>;
		}
	}
}

export const getProfile = window.electronAPI.getProfile;
export const getToken = window.electronAPI.getToken;
export const logOut = window.electronAPI.logOut;
export const logIn = window.electronAPI.logIn;
