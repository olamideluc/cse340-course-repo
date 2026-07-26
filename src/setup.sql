CREATE TABLE organizations (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

INSERT INTO organizations (name, description, contact_email, logo_filename)
VALUES 
('BrightFuture Builders', 
 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 
 'info@brightfuturebuilders.org', 
 'brightfuture-logo.png');

INSERT INTO organizations (name, description, contact_email, logo_filename)
VALUES 
('GreenHarvest Growers', 
 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 
 'contact@greenharvest.org', 
 'greenharvest-logo.png');

INSERT INTO organizations (name, description, contact_email, logo_filename)
VALUES 
('UnityServe Volunteers', 
 'A volunteer coordination group supporting local charities and service initiatives.', 
 'hello@unityserve.org', 
 'unityserve-logo.png');




CREATE TABLE projects (
  project_id SERIAL PRIMARY KEY,
  organization_id INT NOT NULL REFERENCES organizations(organization_id),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  location VARCHAR(255),
  date DATE NOT NULL
);

-- Insert sample projects (5 per organization)
INSERT INTO projects (organization_id, title, description, location, date)
VALUES
(1, 'Community Clean-Up', 'Cleaning public spaces', 'Porto-Novo', '2026-08-01'),
(1, 'Tree Planting', 'Planting 200 trees', 'Cotonou', '2026-08-15'),
(2, 'Food Drive', 'Collecting food for families', 'Sakété', '2026-09-01'),
(2, 'Health Fair', 'Free medical check-ups', 'Abomey', '2026-09-10'),
(3, 'Literacy Workshop', 'Teaching reading skills', 'Parakou', '2026-10-05'),
(1, 'Bridge Repair', 'Fixing damaged community bridges', 'Porto-Novo', '2026-11-01'),
(1, 'Playground Construction', 'Building safe play areas for children', 'Cotonou', '2026-11-15'),
(1, 'Community Center Upgrade', 'Renovating local community centers', 'Ouidah', '2026-12-01'),
(2, 'Community Garden', 'Creating shared garden plots for families', 'Sakété', '2026-12-10'),
(2, 'Composting Workshop', 'Teaching sustainable waste management', 'Abomey', '2026-12-20'),
(2, 'Farmers Market Expansion', 'Supporting local farmers with new stalls', 'Lokossa', '2027-01-05'),
(3, 'Clothing Drive', 'Collecting clothes for families in need', 'Parakou', '2027-01-12'),
(3, 'Senior Care Visits', 'Providing companionship and support to elders', 'Natitingou', '2027-01-20'),
(3, 'Disaster Relief Training', 'Training volunteers for emergency response', 'Kandi', '2027-02-01'),
(3, 'Youth Leadership Camp', 'Developing leadership skills in young volunteers', 'Allada', '2027-02-10');





-- Categories table
CREATE TABLE categories (
  category_id SERIAL PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL
);

-- Join table for many-to-many relationship
CREATE TABLE project_categories (
  project_id INT NOT NULL REFERENCES projects(project_id),
  category_id INT NOT NULL REFERENCES categories(category_id),
  PRIMARY KEY (project_id, category_id)
);

-- Insert sample categories
INSERT INTO categories (name) VALUES
('Environmental'),
('Health'),
('Education');

-- Associate projects with categories
INSERT INTO project_categories (project_id, category_id) VALUES
(1, 1),  -- Community Clean-Up → Environmental
(2, 1),  -- Tree Planting → Environmental
(3, 2),  -- Food Drive → Health
(4, 2),  -- Health Fair → Health
(5, 3),  -- Literacy Workshop → Education
(6, 1),  -- Bridge Repair → Environmental
(7, 1),  -- Playground Construction → Environmental
(8, 3),  -- Community Center Upgrade → Education
(9, 1),  -- Community Garden → Environmental
(10, 1), -- Composting Workshop → Environmental
(11, 1), -- Farmers Market Expansion → Environmental
(12, 2), -- Clothing Drive → Health
(13, 2), -- Senior Care Visits → Health
(14, 2), -- Disaster Relief Training → Health
(15, 3); -- Youth Leadership Camp → Education

