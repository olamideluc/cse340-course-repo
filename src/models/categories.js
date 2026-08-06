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

const assignCategoryToProject = async(categoryId, projectId) => {
    const query = `
        INSERT INTO project_categories (category_id, project_id)
        VALUES ($1, $2);
    `;

    await db.query(query, [categoryId, projectId]);
}

const updateCategoryAssignments = async(projectId, categoryIds) => {
    // First, remove existing category assignments for the project
    const deleteQuery = `
        DELETE FROM project_categories
        WHERE project_id = $1;
    `;
    await db.query(deleteQuery, [projectId]);

    // Next, add the new category assignments
    for (const categoryId of categoryIds) {
        await assignCategoryToProject(categoryId, projectId);
    }
}

// Insert a new category
const createCategory = async (name) => {
  const query = `
    INSERT INTO categories (name)
    VALUES ($1)
    RETURNING category_id;
  `;
  const result = await db.query(query, [name]);
  return result.rows[0]?.category_id;
};

// Update an existing category
const updateCategory = async (categoryId, name) => {
  const query = `
    UPDATE categories
    SET name = $1
    WHERE category_id = $2
    RETURNING category_id, name;
  `;
  const result = await db.query(query, [name, categoryId]);
  return result.rows[0];
};


export {
  getAllCategories,
  getCategoryById,
  getCategoriesForProject,
  getProjectsForCategory,
  updateCategoryAssignments,
  createCategory,
  updateCategory
  
};
