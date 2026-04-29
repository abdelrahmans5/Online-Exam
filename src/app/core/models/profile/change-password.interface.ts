export interface ChangePassword {
    status: boolean;
    code: number;
    message?: string;
    payload?: {
        message: string;
    };
}
