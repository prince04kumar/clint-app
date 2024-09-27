import { Router } from "express";
import dbPromise from "../db.js";

const router = Router();

// Create the Dishes table if it doesn't exist
const createTable = async () => {
    try {
        const db = await dbPromise;
        await db.run(`
            CREATE TABLE IF NOT EXISTS employeAuthData (
                employeId TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                phone_number INTEGER NOT NULL DEFAULT 0,
                password TEXT NOT NULL DEFAULT '0',
                mail TEXT UNIQUE NOT NULL DEFAULT '0'
            );
        `);

        // Create employePersonalData table
        await db.run(`
            CREATE TABLE IF NOT EXISTS employePersonalData (
                employeId TEXT PRIMARY KEY,
                attendence TEXT NOT NULL DEFAULT '{}',
                salery TEXT NOT NULL DEFAULT '{}'
            );
        `);

        // Create trigger to insert into employePersonalData when a new record is added to employeAuthData
        await db.run(`
            CREATE TRIGGER IF NOT EXISTS after_insert_employeAuthData
            AFTER INSERT ON employeAuthData
            FOR EACH ROW
            BEGIN
                INSERT INTO employePersonalData (employeId) VALUES (NEW.employeId);
            END;
        `);

        // Create trigger to delete from employePersonalData when a record is deleted from employeAuthData
        await db.run(`
            CREATE TRIGGER IF NOT EXISTS after_delete_employeAuthData
            AFTER DELETE ON employeAuthData
            FOR EACH ROW
            BEGIN
                DELETE FROM employePersonalData WHERE employeId = OLD.employeId;
            END;
        `);

    } catch (err) {
        console.error("Error creating table:", err.message);
    }
};
createTable()
// delete employee
router.delete('/del/:employeId', async (req, res) => {
    const employeId = req.params.employeId;
    try {
        const db = await dbPromise;
        const result = await db.run('DELETE FROM employeAuthData WHERE employeId = ?', [employeId]);

        if (result.changes === 1) {
            res.json({ message: `Employee with employeId ${employeId} deleted successfully.` });
        } else {
            res.status(404).json({ error: `Employee with employeId ${employeId} not found.` });
        }
    } catch (err) {
        console.error('Error deleting employee:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// update end point 
router.put('/update/:id', async (req, res) => {
    const employeId = req.params.id;
    const { name, phone_number, password, mail } = req.body;
    try {
        const db = await dbPromise;
        const result = await db.run(`
            UPDATE employeAuthData
            SET name = ?, phone_number = ?, password = ?, mail = ?
            WHERE employeId = ?
        `, [name, phone_number, password, mail, employeId]);

        if (result.changes === 1) {
            res.json({ message: { employeId, name, phone_number, password, mail } });
        } else {
            res.status(404).json({ error: `Employee with employeId ${employeId} not found.` });
        }
    } catch (err) {
        console.error('Error updating employee:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// add employe data 
router.post('/add', async (req, res) => {
    const { name, phone_number, password, mail } = req.body;
    const employeId = await generateUniqueEmployeId();

    try {
        const db = await dbPromise;
        await db.run(`
            INSERT INTO employeAuthData (employeId, name, phone_number, password, mail)
            VALUES (?, ?, ?, ?, ?)
        `, [employeId, name, phone_number, password, mail]);

        res.json({ employeId, name, phone_number, password, mail });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all endpoint to retrieve all employee records
router.get('/getall', async (req, res) => {
    try {
        const db = await dbPromise;
        const allEmployees = await db.all('SELECT * FROM employeAuthData ORDER BY employeId');
        res.json(allEmployees);
    } catch (err) {
        console.error('Error fetching employees:', err.message);
        res.status(500).json({ error: err.message });
    }
});

router.post("/login", async (req, res) => {
    const { id, password } = req.body;

    try {

        const db = await dbPromise;
        const employee = await db.get(`SELECT * FROM employeAuthData WHERE employeId = ?`, [id]);

        if (!employee) return res.status(404).json({ message: "User not found" });

        if (employee.password != password) return res.status(403).json({ message: "Invalid credentials" });

        return res.status(200).json({ message: "successfully logged in" });

    } catch (error) {

        return res.status(500).json({ error: err.message });

    }
})

export default router;







// custum functions 

const generateUniqueEmployeId = async () => {
    const db = await dbPromise;
    let isUnique = false;
    let employeId;

    while (!isUnique) {
        employeId = Math.floor(1000 + Math.random() * 9000).toString();
        const existingOrder = await db.get('SELECT 1 FROM employeAuthData WHERE employeId = ?', [employeId]);
        if (!existingOrder) {
            isUnique = true;
        }
    }

    return employeId;
};