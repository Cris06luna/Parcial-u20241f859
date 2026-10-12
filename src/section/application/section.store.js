/**
 * Application service store for the section bounded context.
 * It coordinates category and tutorial use cases and keeps UI-facing state.
 *
 * @module useSectionStore
 */
import {defineStore} from "pinia";
import {computed, ref} from "vue";
import {SectionApi} from "../infrastructure/section-api.js";
import {InspectionRecordsAssembler} from "../infrastructure/inspectionRecord.assembler.js";
import {TelemetryReadingsAssembler} from "../infrastructure/telemetryReading.assembler.js";
import {inspectionRecord} from "../domain/model/inspectionRecord.entity.js";
import {telemetryReading} from "../domain/model/telemetryReading.entity.js";

const sectionApi = new SectionApi();

/**
 * Reactive store that exposes Section commands and queries.
 *
 * @returns {Object} Store state and actions.
 */
export const useSectionStore = defineStore('section', () => {
    /**
     * List of category entities.
     * @type {import('vue').Ref<Category[]>}
     */
    const categories = ref([]);
    /**
     * List of tutorial entities.
     * @type {import('vue').Ref<Tutorial[]>}
     */
    const tutorials = ref([]);
    /**
     * List of errors encountered during API operations.
     * @type {import('vue').Ref<Error[]>}
     */
    const errors = ref([]);
    /**
     * Whether categories have been loaded from the API.
     * @type {import('vue').Ref<boolean>}
     */
    const categoriesLoaded = ref(false);
    /**
     * Whether tutorials have been loaded from the API.
     * @type {import('vue').Ref<boolean>}
     */
    const tutorialsLoaded = ref(false);
    /**
     * Number of loaded categories.
     * @type {import('vue').ComputedRef<number>}
     */
    const categoriesCount = computed(() => {
        return categoriesLoaded ? categories.value.length : 0;
    });
    /**
     * Number of loaded tutorials.
     * @type {import('vue').ComputedRef<number>}
     */
    const tutorialsCount = computed(() => {
        return tutorialsLoaded ? tutorials.value.length : 0;
    });

    /**
     * Loads categories from infrastructure and updates the application state.
     * @returns {void}
     */
    function fetchCategories() {
        sectionApi.getCategories().then(response => {
            categories.value = CategoryAssembler.toEntitiesFromResponse(response);
            categoriesLoaded.value = true;
            console.log(categoriesLoaded.value);
            console.log(categories.value);
        }).catch(error => {
            errors.value.push(error);
        });
    }

    /**
     * Loads tutorials from infrastructure and updates the application state.
     * @returns {void}
     */
    function fetchTutorials() {
        sectionApi.getTutorials().then(response => {
            tutorials.value = TutorialAssembler.toEntitiesFromResponse(response);
            tutorialsLoaded.value = true;
        }).catch(error => {
            errors.value.push(error);
        });
    }

    /**
     * Finds a category entity by identifier.
     * @param {number|string} id - Category identifier.
     * @returns {Category|undefined} Matching category, if available.
     */
    function getCategoryById(id) {
        let idNum = parseInt(id);
        return categories.value.find(category => category["id"] === idNum);
    }

    /**
     * Creates a category through infrastructure and appends it to local state.
     * @param {Category} category - Category entity to persist.
     * @returns {void}
     */
    function addCategory(category) {
        publishingApi.createCategory(category).then(response => {
            const resource = response.data;
            const newCategory = CategoryAssembler.toEntityFromResource(resource);
            categories.value.push(newCategory);
        }).catch(error => {
            errors.value.push(error);
        });
    }

    /**
     * Updates an existing category and synchronizes local state.
     * @param {Category} category - Category entity with updated data.
     * @returns {void}
     */
    function updateCategory(category) {
        sectionApi.updateCategory(category).then(response => {
            const resource = response.data;
            const updatedCategory = CategoryAssembler.toEntityFromResource(resource);
            const index = categories.value.findIndex(c => c["id"] === updatedCategory.id);
            if (index !== -1) categories.value[index] = updatedCategory;
        }).catch(error => {
            errors.value.push(error);
        });
    }

    /**
     * Deletes a category and removes it from local state.
     * @param {Category} category - Category entity to remove.
     * @returns {void}
     */
    function deleteCategory(category) {
        sectionApi.deleteCategory(category.id).then(() => {
            const index = categories.value.findIndex(c => c["id"] === category.id);
            if (index !== -1) categories.value.splice(index, 1);
        }).catch(error => {
            errors.value.push(error);
        });
    }


    /**
     * Finds a tutorial entity by identifier.
     * @param {number|string} id - Tutorial identifier.
     * @returns {Tutorial|undefined} Matching tutorial, if available.
     */
    function getTutorialById(id) {
        let idNum = parseInt(id);
        return tutorials.value.find(tutorial => tutorial["id"] === idNum);
    }

    /**
     * Creates a tutorial through infrastructure and appends it to local state.
     * @param {Tutorial} tutorial - Tutorial entity to persist.
     * @returns {void}
     */
    function addTutorial(tutorial) {
        sectionApi.createTutorial(tutorial).then(response => {
            const resource = response.data;
            const newTutorial = TutorialAssembler.toEntityFromResource(resource);
            tutorials.value.push(newTutorial);
        }).catch(error => {
            errors.value.push(error);
        });
    }

    /**
     * Updates an existing tutorial and synchronizes local state.
     * @param {Tutorial} tutorial - Tutorial entity with updated data.
     * @returns {void}
     */
    function updateTutorial(tutorial) {
        sectionApi.updateTutorial(tutorial).then(response => {
            const resource = response.data;
            const updatedTutorial = TutorialAssembler.toEntityFromResource(resource);
            const index = tutorials.value.findIndex(t => t["id"] === updatedTutorial.id);
            if (index !== -1) tutorials.value[index] = updatedTutorial;
        }).catch(error => {
            errors.value.push(error);
        });
    }

    /**
     * Deletes a tutorial and removes it from local state.
     * @param {Tutorial} tutorial - Tutorial entity to remove.
     * @returns {void}
     */
    function deleteTutorial(tutorial) {
        sectionApi.deleteTutorial(tutorial.id).then(() => {
            const index = tutorials.value.findIndex(t => t["id"] === tutorial.id);
            if (index !== -1) tutorials.value.splice(index, 1);
        }).catch(error => {
            errors.value.push(error);
        });
    }

    return {
        categories,
        tutorials,
        errors,
        categoriesLoaded,
        tutorialsLoaded,
        categoriesCount,
        tutorialsCount,
        fetchCategories,
        fetchTutorials,
        getCategoryById,
        addCategory,
        updateCategory,
        deleteCategory,
        addTutorial,
        updateTutorial,
        deleteTutorial,
        getTutorialById
    }
});

export default useSectionStore;