export interface ExamsMetadata {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface ExamDiploma {
    id: string;
    title: string;
}

export interface Exam {
    id: string;
    title: string;
    description: string;
    image: string;
    duration: number;
    createdAt: string;
    updatedAt?: string;
    questionsCount: number;
    diploma: ExamDiploma;
}

export interface ExamsPayload {
    data: Exam[];
    metadata: ExamsMetadata;
}

export interface Exams {
    status: boolean;
    code: number;
    payload: ExamsPayload;
}
