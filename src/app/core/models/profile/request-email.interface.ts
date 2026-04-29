export interface RequestEmail {
    status: boolean;
    code: number;
    message?: string;
    payload: {
        message: string;
        code: string;
    };
}
