// src/controllers/categories.js

// Import needed model functions
import {
  getAllCategories,
  getCategoryById,
  getCategoriesForProject,
  getProjectsForCategory,
  updateCategoryAssignments
} from '../models/categories.js';
import { getProjectDetails } from '../models/projects.js';

// Controller: show all categories
const showCategoriesPage = async (req, res) => {
  try {
    const categories = await getAllCategories();
    const title = 'Service Project Categories';
    res.render('categories', { title, categories });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving categories');
  }
};

const showAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;

    const projectDetails = await getProjectDetails(projectId);
    const categories = await getAllCategories();
    const assignedCategories = await getCategoriesForProject(projectId);

    const title = 'Assign Categories to Project';

    res.render('assign-categories', { title, projectId, projectDetails, categories, assignedCategories });
};

const processAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;
    const selectedCategoryIds = req.body.categoryIds || [];
    
    // Ensure selectedCategoryIds is an array
    const categoryIdsArray = Array.isArray(selectedCategoryIds) ? selectedCategoryIds : [selectedCategoryIds];
    await updateCategoryAssignments(projectId, categoryIdsArray);
    req.flash('success', 'Categories updated successfully.');
    res.redirect(`/project/${projectId}`);
};

// Controller: show category details page
const showCategoryDetailsPage = async (req, res) => {
  try {
    const categoryId = req.params.id;

    // Get category info
    const category = await getCategoryById(categoryId);
    if (!category) {
      return res.status(404).send('Category not found');
    }

    // Get projects for this category
    const projects = await getProjectsForCategory(categoryId);

    const title = category.name;
    res.render('category', { title, category, projects });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving category details');
  }
};

// Export controller functions
export {
  showCategoriesPage,
  showCategoryDetailsPage,
  showAssignCategoriesForm,
  processAssignCategoriesForm
};
