export interface IFormInput {
  title: string;
  body?: string;
  dueDate?: string;
  priorty?: "High" | "Medium" | "Low";
}
