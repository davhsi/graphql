const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
    connectionString: process.env.DATABASE_URL,
});

client.connect();

const Task = {
    createTask: async (task) => {
        try {
            const { name, description, deadline } = task;
            const res = await client.query(
                'INSERT INTO tasks (name, description, deadline) VALUES ($1, $2, $3) RETURNING *',
                [name, description, deadline]
            );
            return res.rows[0];
        } catch (error) {
            console.error("Error creating task:", error);
            throw new Error("Failed to create task.");
        }
    },

    getTasks: async () => {
        try {
            const res = await client.query('SELECT * FROM tasks');
            return res.rows;
        } catch (error) {
            console.error("Error fetching tasks:", error);
            throw new Error("Failed to fetch tasks.");
        }
    },

    updateTask: async (id, task) => {
        try {
            const { name, description, deadline, completed } = task;
            const res = await client.query(
                'UPDATE tasks SET name = $1, description = $2, deadline = $3, completed = $4 WHERE id = $5 RETURNING *',
                [name, description, deadline, completed, id]
            );
            return res.rows[0];
        } catch (error) {
            console.error("Error updating task:", error);
            throw new Error("Failed to update task.");
        }
    },

    deleteTask: async (id) => {
        try {
            const result = await client.query("DELETE FROM tasks WHERE id = $1", [id]);
            if (result.rowCount === 0) {
                throw new Error("Task not found");
            }
            return "Task deleted successfully";
        } catch (error) {
            console.error("Error deleting task:", error);
            throw new Error("Failed to delete task.");
        }
    },
    markAsCompleted: async (id) => {
        try {
            const res = await client.query(
                'UPDATE tasks SET completed = TRUE WHERE id = $1 RETURNING *',
                [id]
            );
            return res.rows[0];
        } catch (error) {
            console.error("Error marking task as completed:", error);
            throw new Error("Failed to mark task as completed.");
        }
    },
};

// Gracefully close the connection when the app is terminated
process.on('SIGINT', () => {
    client.end(err => {
        console.log('Disconnected from the database');
        if (err) console.error("Error disconnecting:", err.stack);
        process.exit();
    });
});

module.exports = Task;
