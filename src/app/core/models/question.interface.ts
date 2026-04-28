export interface QuestionsResponse {
    status: boolean;
    code: number;
    payload: QuestionsPayload;
}

export interface QuestionsPayload {
    questions: Question[];
}

export interface Question {
    id: string;
    title: string;
    text: string;
    examId: string;
    immutable: boolean;
    createdAt: string;
    updatedAt: string;
    options: Answer[];
    exam: ExamRef;
}

export interface Answer {
    id: string;
    text: string;
    isCorrect: boolean;
}

export interface ExamRef {
    id: string;
    title: string;
}

export interface SubmissionPayload {
    examId: string;
    answers: SubmissionAnswer[];
}

export interface SubmissionAnswer {
    questionId: string;
    selectedId: string;
}

export interface SubmissionResponse {
    status: boolean;
    code: number;
    payload: SubmissionResult;
}

export interface SubmissionResult {
    submissionId: string;
    score: number;
    correctAnswers: number;
    totalQuestions: number;
    correctAnswersList: CorrectAnswer[];
}

export interface CorrectAnswer {
    questionId: string;
    correctAnswerId: string;
    selectedAnswerId: string;
    isCorrect: boolean;
}