// src/controllers/projects.js

// Import needed model functions
import { getUpcomingProjects, getProjectDetails, getCategoriesForProject } from '../models/projects.js';

// Constant for number of upcoming projects
const NUMBER_OF_UPCOMING_PROJECTS = 5;

// Controller: show upcoming projects page
const showProjectsPage = async (req, res) => {
  try {
    const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
    const title = 'Upcoming Service Projects';
    res.render('projects', { title, projects });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving upcoming projects');
  }
};

// Controller: show project details page
const showProjectDetailsPage = async (req, res) => {
  try {
    const projectId = req.params.id;
    const project = await getProjectDetails(projectId);

    if (!project) {
      return res.status(404).send('Project not found');
    }

    // Fetch categories for this project
    const categories = await getCategoriesForProject(projectId);

    const title = project.title;

    // IMPORTANT: pass categories into the view
    res.render('project', { title, project, categories });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving project details');
  }
};

// Export controller functions
export { showProjectsPage, showProjectDetailsPage };
