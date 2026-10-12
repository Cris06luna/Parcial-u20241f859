import { MachineryModel } from "../domain/model/machinery-model.entity.js";

export class MachineryModelAssembler {
  static toEntities(resources) {
    return resources.map((resource) => new MachineryModel(resource));
  }
}
