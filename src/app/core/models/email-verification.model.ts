export interface SendEmailVerificationCodeRequest {
    email: string;
}

export interface VerifyEmailCodeRequest {
    email: string;
    code: string;
}

export interface EmailVerificationApiResponse {
    success?: boolean;
    message?: string;
}