export interface Diplomas {
  id: string
  title: string
  description: string
  image: string
  immutable: boolean
  createdAt: string
  updatedAt: string
}

export interface DiplomasMetadata {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface DiplomasPayload {
  data: Diplomas[];
  metadata: DiplomasMetadata;
}

export interface DiplomasResponse {
  status: boolean;
  code: number;
  payload: DiplomasPayload;
}

export interface DiplomaExam {
  id: string;
  title: string;
  description?: string;
  questionsCount?: number;
  durationMinutes?: number;
}

export interface DiplomaExamsPayload {
  data: DiplomaExam[];
}

export interface DiplomaExamsResponse {
  status: boolean;
  code: number;
  payload: DiplomaExamsPayload;
}