export class User {
    id?: string;
    name: string;
    group?: string;

    public asFormData(): FormData {
        const data = new FormData();

        data.append('id', this.id);
        data.append('name', this.name);
        return data;
      }
}
