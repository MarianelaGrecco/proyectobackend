export default class BasicMongo {
  constructor(model) {
    this.model = model
  }
 
  async findAll() {
    try {
      const users = await this.model.find();
      return users;
    } catch (error) {
      return error;
    }
  }

  async findOneById(id) {
    try {
      const user = await this.model.findById(id);
      return user;
    } catch (error) {
      return error;
    }
  }

  async createOne(obj) {
    try {
      const newUser = await this.model.create(obj);
      return newUser;
    } catch (error) {
      return error;
    }
  }

  async updateOne(id, obj) {
    try {
      const updateUser = await this.model.updateOne({ _id: id }, { $set: obj });
      return updateUser;
    } catch (error) {
      return error;
    }
  }

  async deleteOne(id) {
    try {
      const deleteUser = await this.model.deleteOne({ _id: id });
      return deleteUser;
    } catch (error) {
      return error;
    }
  }
}
