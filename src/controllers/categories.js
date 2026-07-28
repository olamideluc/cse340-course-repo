// Import any needed model functions
import { getAllCategories } from '../models/categories.js';

// Define any controller functions
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

// Export any controller functions
export { showCategoriesPage };
