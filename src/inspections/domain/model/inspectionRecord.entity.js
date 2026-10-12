/**
 * Category entity within the Section bounded context.
 *
 * @class inspectionRecord
 * @property {?number} id - Unique identifier for the inspection record.
 * @property {string} name - Human-readable name of the inspection record.
 */
export class inspectionRecord {
    /**
     * @param {Object} params - Entity attributes.
     * @param {?number} [params.id=null] - Inspection record identifier.
     * @param {string} [params.name=''] - Human-readable inspection record name.
     */
    constructor({ id = null, name = ''}) {
       this.id = id;
       this.name = name;
    }

}