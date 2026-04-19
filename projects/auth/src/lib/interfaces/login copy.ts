export interface LoginReq {
    username: string;
    password: string;
}

export interface LoginApiRes {
    user: {
        id: string;
        username: string;
        email: string;
        phone: string;
        firstName: string;
        lastName: string;
        profilePhoto: string;
        emailVerified: boolean;
        phoneVerified: boolean;
        role: string;
        createdAt: string;
        updatedAt: string;
    };
    token: string;
    refreshToken: string;
}

