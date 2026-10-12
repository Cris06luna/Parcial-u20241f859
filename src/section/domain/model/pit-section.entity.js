export class PitSection {
  constructor({ id, name = "", maxOperatingHours = 0 }) {
    this.id = id;
    this.name = name;
    this.maxOperatingHours = maxOperatingHours;
  }
}
