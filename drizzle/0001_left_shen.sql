CREATE TABLE `journals` (
	`journal_id` integer PRIMARY KEY NOT NULL,
	`title` text,
	`content` text,
	`created_at` text DEFAULT CURRENT_DATE,
	`updated_at` text DEFAULT CURRENT_DATE,
	`user_id` integer DEFAULT 1,
	`timestamp` text DEFAULT CURRENT_TIMESTAMP,
	`time` text DEFAULT CURRENT_TIME
);
