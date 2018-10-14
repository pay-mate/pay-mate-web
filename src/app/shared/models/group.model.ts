export class Group {
    id?: string;
    name: string;

    public asFormData(): FormData {
        const data = new FormData();

        data.append('id', this.id);
        data.append('name', this.name);
        // data['id'] = this.id;
        // data['name'] = this.name;
        return data;
      }
}

