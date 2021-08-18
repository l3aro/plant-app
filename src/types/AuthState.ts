import User from "./User";

export default interface AuthState {
    isAuthenticated: boolean;
    user: User | undefined;
    error: undefined;
}