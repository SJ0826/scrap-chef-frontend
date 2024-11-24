export interface GenericResponse {
  data: never;
  message: string;
  length?: number;
  code?: number;
}
