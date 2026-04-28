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