// Import any needed model functions
import { getAllProjects } from '../models/projects.js';

// Define any controller functions
const showProjectsPage = async (req, res) => {
    try {
        const projects = await getAllProjects();
        const title = 'Our Service Projects';
        res.render('projects', { title, projects });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving projects');
    }
};

// Export any controller functions
export { showProjectsPage };
