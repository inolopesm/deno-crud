export interface CreateToDoRepository {
  create: (title: string) => Promise<void>;
}
