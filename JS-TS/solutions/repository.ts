export class InMemoryRepository<T extends { id: number }> {
  // private storage
  private items: T[] = [];

  add(entity: T): T {
    this.items.push(entity);

    return entity;
  }

  update(id: number, patch: Partial<T>): T {
    const candidateT: T | undefined = this.items.find((item) => item.id === id);

    if (!candidateT) {
      throw new Error("Cannot find with this id");
    }

    const updatedT: T = { ...candidateT, ...patch }

    this.items = this.items.map((item) => {
      if (item.id === id) {
        return updatedT;
      }
      else {
        return item;
      }
    })

    return updatedT;
  }

  remove(id: number): void {
    const candidateT: T | undefined = this.items.find((item) => item.id === id);

    if (!candidateT) {
      throw new Error("Cannot find with this id");
    }

    this.items = this.items.filter((item) => item.id !== id);
  }

  findById(id: number): T | undefined {
    const candidateT: T | undefined = this.items.find((item) => item.id === id);

    return candidateT;
  }

  findAll(): T[] {
    return this.items;
  }
}
