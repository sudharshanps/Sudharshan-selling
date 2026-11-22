import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Database configuration with environment variable defaults
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = parseInt(process.env.DB_PORT || '3306', 10);
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD !== undefined ? process.env.DB_PASSWORD : '';
const DB_NAME = process.env.DB_NAME || 'sudharshan_tech';

let pool = null;
let isConnected = false;
let lastError = null;

/**
 * Create or return the MySQL Connection Pool
 */
export function getPool() {
  if (!pool) {
    try {
      pool = mysql.createPool({
        host: DB_HOST,
        port: DB_PORT,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME,
        waitForConnections: true,
        connectionLimit: 10,
        maxIdle: 10,
        idleTimeout: 60000,
        queueLimit: 0,
        enableKeepAlive: true,
        keepAliveInitialDelay: 10000,
        timezone: '+05:30' // Indian Standard Time
      });
    } catch (err) {
      lastError = err.message;
      console.error('[MySQL POOL INITIALIZATION ERROR]:', err.message);
    }
  }
  return pool;
}

/**
 * Health check for MySQL Database Connection
 */
export async function checkDatabaseHealth() {
  const currentPool = getPool();
  if (!currentPool) {
    return {
      connected: false,
      host: DB_HOST,
      port: DB_PORT,
      database: DB_NAME,
      user: DB_USER,
      error: lastError || 'Pool could not be created'
    };
  }

  try {
    const [rows] = await currentPool.query('SELECT 1 as test_val, NOW() as server_time');
    isConnected = true;
    lastError = null;
    return {
      connected: true,
      host: DB_HOST,
      port: DB_PORT,
      database: DB_NAME,
      user: DB_USER,
      server_time: rows[0]?.server_time
    };
  } catch (err) {
    isConnected = false;
    lastError = err.message;
    return {
      connected: false,
      host: DB_HOST,
      port: DB_PORT,
      database: DB_NAME,
      user: DB_USER,
      error: err.message
    };
  }
}

/**
 * Initialize database and execute schema automatically if needed
 */
export async function initializeDatabase() {
  try {
    // 1. Create temporary connection without database selected to ensure DB exists
    const rootConn = await mysql.createConnection({
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASSWORD
    });

    await rootConn.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
    await rootConn.end();

    // 2. Connect to the database and create tables
    const dbPool = getPool();
    const schemaFile = path.join(__dirname, '..', 'database', 'schema.sql');
    
    // Create inquiries table directly using parameterized / robust DDL
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS \`inquiries\` (
        \`id\` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        \`full_name\` VARCHAR(150) NOT NULL,
        \`email\` VARCHAR(150) NOT NULL,
        \`phone\` VARCHAR(50) NOT NULL,
        \`company_name\` VARCHAR(150) NULL DEFAULT NULL,
        \`service\` VARCHAR(100) NOT NULL,
        \`project_budget\` VARCHAR(100) NULL DEFAULT 'Flexible',
        \`message\` TEXT NOT NULL,
        \`source\` VARCHAR(50) NOT NULL DEFAULT 'website',
        \`status\` VARCHAR(50) NOT NULL DEFAULT 'New',
        \`email_notification_status\` VARCHAR(50) NOT NULL DEFAULT 'Pending',
        \`whatsapp_notification_status\` VARCHAR(50) NOT NULL DEFAULT 'Pending',
        \`admin_notes\` TEXT NULL DEFAULT NULL,
        \`created_at\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX \`idx_inquiries_email\` (\`email\`),
        INDEX \`idx_inquiries_phone\` (\`phone\`),
        INDEX \`idx_inquiries_status\` (\`status\`),
        INDEX \`idx_inquiries_service\` (\`service\`),
        INDEX \`idx_inquiries_source\` (\`source\`),
        INDEX \`idx_inquiries_created_at\` (\`created_at\`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `;

    await dbPool.query(createTableQuery);
    isConnected = true;
    lastError = null;
    console.log(`[MySQL SUCCESS] Connected to database '${DB_NAME}' on ${DB_HOST}:${DB_PORT} and verified 'inquiries' table.`);
    return true;
  } catch (err) {
    isConnected = false;
    lastError = err.message;
    console.warn(`[MySQL NOTICE] Database auto-initialization could not complete: ${err.message}.`);
    console.warn(`[MySQL GUIDANCE] Please configure DB_PASSWORD in .env or run database/schema.sql in MySQL Workbench.`);
    return false;
  }
}

export function isMySqlConnected() {
  return isConnected;
}
