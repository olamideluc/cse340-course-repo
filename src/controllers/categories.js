// src/controllers/categories.js

// Import needed model functions
import {
  getAllCategories,
  getCategoryById,
  getCategoriesForProject,
  getProjectsForCategory,
  updateCategoryAssignments,
  createCategory,
  updateCategory
} from '../models/categories.js';
import { getProjectDetails } from '../models/projects.js';
import { body, validationResult } from 'express-validator';


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
// Validation rules
const categoryValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Category name is required')
    .isLength({ min: 3, max: 100 }).withMessage('Category name must be between 3 and 100 characters')
];

// Controller: show new category form
const showNewCategoryForm = (req, res) => {
  const title = 'Add New Category';
  res.render('new-category', { title });
};

// Controller: process new category form
const processNewCategoryForm = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errors.array().forEach(error => req.flash('error', error.msg));
    return res.redirect('/new-category');
  }

  try {
    const { name } = req.body;
    const newCategoryId = await createCategory(name);
    req.flash('success', 'Category created successfully!');
    res.redirect(`/category/${newCategoryId}`);
  } catch (error) {
    console.error('Error creating category:', error);
    req.flash('error', 'Error creating category');
    res.redirect('/new-category');
  }
};

// Controller: show edit category form
const showEditCategoryForm = async (req, res) => {
  const categoryId = req.params.id;
  const category = await getCategoryById(categoryId);

  if (!category) {
    return res.status(404).send('Category not found');
  }

  const title = 'Edit Category';
  res.render('edit-category', { title, category });
};

// Controller: process edit category form
const processEditCategoryForm = async (req, res) => {
  const categoryId = req.params.id;
  const { name } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errors.array().forEach(error => req.flash('error', error.msg));
    return res.redirect(`/edit-category/${categoryId}`);
  }

  try {
    await updateCategory(categoryId, name);
    req.flash('success', 'Category updated successfully!');
    res.redirect(`/category/${categoryId}`);
  } catch (error) {
    console.error('Error updating category:', error);
    req.flash('error', 'Error updating category');
    res.redirect(`/edit-category/${categoryId}`);
  }
};

// Export controller functions
export {
  showCategoriesPage,
  showCategoryDetailsPage,
  showAssignCategoriesForm,
  processAssignCategoriesForm,
  categoryValidation,        
  showNewCategoryForm,       
  processNewCategoryForm,    
  showEditCategoryForm,      
  processEditCategoryForm    
};
