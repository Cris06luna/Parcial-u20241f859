import { BaseApi } from "../../shared/infrastructure/base-api.js";

const pitSectionsUrl =
  "https://gist.githubusercontent.com/ovillafuerte/aee81192da8fe9df3a11e4b27f07e8f7/raw/4d96caf25d747d1463d9c997e03330b52e6005d4/pit-sections";
const machineryModelsUrl =
  "https://gist.githubusercontent.com/ovillafuerte/bb42d462214465c70b3472a10e23c558/raw/06083af1287c749e219bb650e05700274d020c09/machinery-models.json";

export class SectionApi extends BaseApi {
  constructor() {
    super();
  }

  getPitSections() {
    return this.http.get(pitSectionsUrl);
  }

  getMachineryModels() {
    return this.http.get(machineryModelsUrl);
  }
}
