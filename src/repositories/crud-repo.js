

export const CrudRepo = class {
  constructor(model) {
    this.model = model;
  }

  async create(data) {  
      const response = await this.model.create(data);
      return response;
  }

  async destroy(data) {
    
      const response = await this.model.destroy(data);
      return response;
    
  }

  async get(data) {
      const response = await this.model.findByPk(data);
      return response;
  }

  async getAll(filter = {}) {
    const response = await this.model.findAll({
      where: filter
    });
    return response;
  }

  async update(id, data) {
      const response = await this.model.update(data, {
        where: { id },
      });
      return response;
  }
};
