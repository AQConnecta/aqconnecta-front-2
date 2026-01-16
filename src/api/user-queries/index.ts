import { getResumes } from "./get-resumes";

export function mountPath(path: string): string {
  return `/usuario/${path}`;
}

export default {
  getResumes,
};
