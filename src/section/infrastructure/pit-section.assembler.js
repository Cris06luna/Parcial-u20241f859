import { PitSection } from "../domain/model/pit-section.entity.js";

export class PitSectionAssembler {
  static toEntities(resources) {
    return resources.map((resource) => new PitSection(resource));
  }
}
