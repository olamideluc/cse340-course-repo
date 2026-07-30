// src/models/categories.js
import db from './db.js';

// Retrieve all categories
const getAllCategories = async () => {
  const query = `
    SELECT category_id, name
    FROM categories
    ORDER BY name;
  `;
  const result = await db.query(query);
  return result.rows;
};

// Retrieve a single category by its ID
const getCategoryById = async (categoryId) => {
  const query = `
    SELECT category_id, name
    FROM categories
    WHERE category_id = $1;
  `;
  const result = await db.query(query, [categoryId]);
  return result.rows[0];
};

// Retrieve all categories for a given service project
const getCategoriesForProject = async (projectId) => {
  const query = `
    SELECT c.category_id, c.name
    FROM categories c
    JOIN project_categories pc ON c.category_id = pc.category_id
    WHERE pc.project_id = $1;
  `;
  const result = await db.query(query, [projectId]);
  return result.rows;
};

// Retrieve all service projects for a given category
const getProjectsForCategory = async (categoryId) => {
  const query = `
    SELECT p.project_id, p.title, p.date, p.location,
           o.organization_id, o.name AS organization_name
    FROM projects p
    JOIN project_categories pc ON p.project_id = pc.project_id
    JOIN organizations o ON p.organization_id = o.organization_id
    WHERE pc.category_id = $1
    ORDER BY p.date ASC;
  `;
  const result = await db.query(query, [categoryId]);
  return result.rows;
};

export {
  getAllCategories,
  getCategoryById,
  getCategoriesForProject,
  getProjectsForCategory
};
