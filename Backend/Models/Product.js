import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

export const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    precio: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    categoria: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    imagen: {
        type: DataTypes.STRING(255),
    },
}, {
    timestamps: false,
});