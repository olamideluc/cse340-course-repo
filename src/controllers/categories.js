// src/controllers/categories.js

// Import needed model functions
import {
  getAllCategories,
  getCategoryById,
  getProjectsForCategory
} from '../models/categories.js';

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
  showCategoryDetailsPage
};
