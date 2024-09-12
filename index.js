import express from 'express';
import { Sequelize, DataTypes } from 'sequelize';
import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import AdminJSSequelize from '@adminjs/sequelize';

// Initialize Express app
const app = express();

// Initialize Sequelize
const sequelize = new Sequelize('dashboard_panel', 'postgres', 'db1718', {
    host: 'localhost',
    dialect: 'postgres'
});

// Define User model
const User = sequelize.define('User', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    }
});

// Define Pharmacy model
const Pharmacy = sequelize.define('Pharmacy', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
    },
    phone: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    }
});

// Sync both models with the database
sequelize.sync();

// Set up AdminJS
AdminJS.registerAdapter(AdminJSSequelize);

const adminJs = new AdminJS({
    resources: [
        { resource: User },
        { resource: Pharmacy } // Add the Pharmacy model
    ],
    rootPath: '/dashboard',
});

// Set up AdminJS with Express
const adminRouter = AdminJSExpress.buildRouter(adminJs);
app.use(adminJs.options.rootPath, adminRouter);

// Start the Express server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/dashboard`);
});
