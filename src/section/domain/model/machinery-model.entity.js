export class MachineryModel {
  constructor({ id, modelName = "", manufacturer = "", idSection = null }) {
    this.id = id;
    this.modelName = modelName;
    this.manufacturer = manufacturer;
    this.idSection = idSection;
  }
}
