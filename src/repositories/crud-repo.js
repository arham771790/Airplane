import { Logger } from "../config/index.js";

export const CrudRepo = class {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    try {
      console.log(data);
      const response = await this.model.create(data);
      return response;
    } catch (error) {
      Logger.error(error);
      throw new Error("Failed to create record");
    }
  }

  async destroy(data) {
    try {
      const response = await this.model.destroy(data);
      return response;
    } catch (error) {
      Logger.error(error);
      throw new Error("Failed to delete record");
    }
  }

  async get(data) {
    try {
      const response = await this.model.findByPk(data);
      return response;
    } catch (error) {
      Logger.error(error);
      throw new Error("Failed to retrieve record");
    }
  }

  async getAll() {
    try {
      const response = await this.model.findAll();
      return response;
    } catch (error) {
      Logger.error(error);
      throw new Error("Failed to retrieve records");
    }
  }

  async update(id, data) {
    try {
      const response = await this.model.update(data, {
        where: { id },
      });
      return response;
    } catch (error) {
      Logger.error(error);
      throw new Error("Failed to update record");
    }
  }
};
