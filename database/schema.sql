-- ==============================================================================
-- SUDHARSHAN_TECH Digital Services Marketplace
-- Database Schema for MySQL 8.0+
-- Database Name: sudharshan_tech
-- ==============================================================================

CREATE DATABASE IF NOT EXISTS `sudharshan_tech`
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE `sudharshan_tech`;

-- ==============================================================================
-- Table: inquiries
-- Stores customer project inquiries, contact submissions, and service requests
-- with permanent database storage and independent alert tracking.
-- ==============================================================================
CREATE TABLE IF NOT EXISTS `inquiries` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `full_name` VARCHAR(150) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `phone` VARCHAR(50) NOT NULL,
  `company_name` VARCHAR(150) NULL DEFAULT NULL,
  `service` VARCHAR(100) NOT NULL,
  `project_budget` VARCHAR(100) NULL DEFAULT 'Flexible',
  `message` TEXT NOT NULL,
  `source` VARCHAR(50) NOT NULL DEFAULT 'website',
  `status` VARCHAR(50) NOT NULL DEFAULT 'New',
  `email_notification_status` VARCHAR(50) NOT NULL DEFAULT 'Pending',
  `whatsapp_notification_status` VARCHAR(50) NOT NULL DEFAULT 'Pending',
  `admin_notes` TEXT NULL DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  -- Performance Indexes for search & filtering
  INDEX `idx_inquiries_email` (`email`),
  INDEX `idx_inquiries_phone` (`phone`),
  INDEX `idx_inquiries_status` (`status`),
  INDEX `idx_inquiries_service` (`service`),
  INDEX `idx_inquiries_source` (`source`),
  INDEX `idx_inquiries_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Optional Initial Sample Inquiry for Testing
INSERT INTO `inquiries` (
  `full_name`,
  `email`,
  `phone`,
  `company_name`,
  `service`,
  `project_budget`,
  `message`,
  `source`,
  `status`,
  `email_notification_status`,
  `whatsapp_notification_status`,
  `admin_notes`
) VALUES (
  'Praveen Kumar',
  'praveen.tech@example.com',
  '+91 98401 23456',
  'AeroNext Innovations',
  'AI Solutions & Automation',
  '₹25,000 - ₹50,000',
  'We need a custom computer vision model and edge inference pipeline for automated defect detection in warehouse packaging.',
  'custom_project_modal',
  'New',
  'sent',
  'sent',
  'Initial sample verified inquiry for admin dashboard validation.'
) ON DUPLICATE KEY UPDATE `id`=`id`;
