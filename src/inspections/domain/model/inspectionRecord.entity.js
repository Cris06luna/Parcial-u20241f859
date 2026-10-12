/**
 * @class inspectionRecord
 * @property {?number} id - Unique identifier for the inspection record.
 * @property {string} name - Human-readable name of the inspection record.
 */
export class inspectionRecord {
    /**
     *Creates an instance of the inspectionRecord entity.
     * @param {Object} params - Entity attributes.
     * @param {?number} [params.id=null] - Inspection record identifier.
     * @param {string} [params.name=''] - Human-readable inspection record name.
     * @param {string} [params.machineryCode=''] - Code of the machinery being inspected.
     * @param {number} [params.pitSectionId=null] - Identifier of the pit section where the inspection took place.
     * @param {string} [params.inspectorName=''] - Name of the inspector who performed the inspection.
     * @param {string} [params.status=''] - Current status of the inspection (e.g., 'pending', 'completed').
     * @param {string} [params.notes=''] - Additional notes or comments about the inspection.
     * @param {string} [params.inspectedAt=''] - Timestamp of when the inspection was conducted.
     * @param {number} [params.maxOperatingHours=0] - Maximum operating hours recorded during the inspection.
     */
    constructor({ id = null, name = '', machineryCode = '', pitSectionId = null, inspectorName = '', status = '', notes = '', inspectedAt = '', maxOperatingHours = 0 }) {
       this.id = id;
       this.name = name;
       this.machineryCode = machineryCode;
       this.pitSectionId = pitSectionId;
       this.inspectorName = inspectorName;
       this.status = status;
       this.notes = notes;
       this.inspectedAt = inspectedAt;
       this.maxOperatingHours = maxOperatingHours;
    }

}