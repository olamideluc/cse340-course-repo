// Import any needed model functions
import { getAllOrganizations } from '../models/organizations.js';

// Define any controller functions
const showOrganizationsPage = async (req, res) => {
    try {
        const organizations = await getAllOrganizations();
        const title = 'Our Partner Organizations';
        res.render('organizations', { title, organizations });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving organizations');
    }
};

// Export any controller functions
export { showOrganizationsPage };
