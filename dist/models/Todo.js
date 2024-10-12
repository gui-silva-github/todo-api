"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Todo = void 0;
const sequelize_1 = require("sequelize");
const pg_1 = require("../instances/pg");
exports.Todo = pg_1.sequelize.define('Todo', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER
    },
    title: {
        type: sequelize_1.DataTypes.STRING
    },
    done: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    tableName: 'data',
    timestamps: false
});
