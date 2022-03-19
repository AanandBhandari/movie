import { Model } from "mongoose";
class MongooseService {
  constructor(Model: Model<any>) {
    this.model = Model;
  }
  model: Model<any>;

  create(body: any) {
    return this.model.create(body);
  }

  delete(query: any) {
    return this.model.findOneAndDelete(query).exec();
  }

  deleteMany(query: any) {
    return this.model.deleteMany(query).exec();
  }

  findOne(query: any, projection = { __v: 0 }, options = { lean: true }) {
    return this.model.findOne(query, projection, options).exec();
  }

  find(
    query: any,
    projection = { __v: 0 },
    populate = [],
    sort = { createdAt: -1 },
    options = { lean: true }
  ) {
    return this.model
      .find(query, projection, options)
      .populate(populate)
      .sort(sort)
      .exec();
  }

  findById(
    id: string,
    projection = { __v: 0 },
    populate = [],
    options = { lean: true }
  ) {
    return this.model
      .findById(id, projection, options)
      .populate(populate)
      .exec();
  }
}

export default MongooseService;
