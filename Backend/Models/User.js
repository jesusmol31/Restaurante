import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

export const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    telefono: {
        type: DataTypes.STRING(255),
    },
}, {
    timestamps: false,
});