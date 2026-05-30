#!/bin/bash
# Script to fix missing columns in MariaDB for CommunityResources table
# and create missing gamification tables

docker exec aspnet-app-backend-1 bash -c '
apt-get update -qq && apt-get install -y -qq mariadb-client > /dev/null 2>&1

mariadb -h db -u root -pSmartLMS_DB_Secure_2026 SmartLMS <<EOSQL

-- ========================================
-- STEP 1: Add missing columns to CommunityResources
-- ========================================
ALTER TABLE CommunityResources
  ADD COLUMN IF NOT EXISTS ViewCount int NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS DownloadCount int NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS BookmarkCount int NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS ViralScore double NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS PopularityScore double NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS IsHidden tinyint(1) NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS IsDeleted tinyint(1) NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS Status longtext DEFAULT "Active";

-- ========================================
-- STEP 2: Create ResourceBookmarks table
-- ========================================
CREATE TABLE IF NOT EXISTS ResourceBookmarks (
  ResourceId int NOT NULL,
  UserId int NOT NULL,
  CreatedAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (ResourceId, UserId),
  CONSTRAINT FK_ResourceBookmarks_CommunityResources FOREIGN KEY (ResourceId) REFERENCES CommunityResources(Id) ON DELETE CASCADE,
  CONSTRAINT FK_ResourceBookmarks_Users FOREIGN KEY (UserId) REFERENCES Users(UserID) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ========================================
-- STEP 3: Create UserCollections table
-- ========================================
CREATE TABLE IF NOT EXISTS UserCollections (
  Id int NOT NULL AUTO_INCREMENT,
  UserId int NOT NULL,
  Title longtext NOT NULL,
  Description longtext NULL,
  IsPublic tinyint(1) NOT NULL DEFAULT 1,
  CreatedAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (Id),
  CONSTRAINT FK_UserCollections_Users FOREIGN KEY (UserId) REFERENCES Users(UserID) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ========================================
-- STEP 4: Create ResourceCollectionItems table
-- ========================================
CREATE TABLE IF NOT EXISTS ResourceCollectionItems (
  CollectionId int NOT NULL,
  ResourceId int NOT NULL,
  AddedAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (CollectionId, ResourceId),
  CONSTRAINT FK_RCI_UserCollections FOREIGN KEY (CollectionId) REFERENCES UserCollections(Id) ON DELETE CASCADE,
  CONSTRAINT FK_RCI_CommunityResources FOREIGN KEY (ResourceId) REFERENCES CommunityResources(Id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ========================================
-- STEP 5: Create ResourceRatings table
-- ========================================
CREATE TABLE IF NOT EXISTS ResourceRatings (
  Id int NOT NULL AUTO_INCREMENT,
  ResourceId int NOT NULL,
  UserId int NOT NULL,
  Score int NOT NULL,
  ReviewText longtext NULL,
  CreatedAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (Id),
  UNIQUE KEY IX_ResourceRatings_ResourceId_UserId (ResourceId, UserId),
  CONSTRAINT FK_ResourceRatings_CommunityResources FOREIGN KEY (ResourceId) REFERENCES CommunityResources(Id) ON DELETE CASCADE,
  CONSTRAINT FK_ResourceRatings_Users FOREIGN KEY (UserId) REFERENCES Users(UserID) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ========================================
-- STEP 6: Create ResourceComments table
-- ========================================
CREATE TABLE IF NOT EXISTS ResourceComments (
  Id int NOT NULL AUTO_INCREMENT,
  ResourceId int NOT NULL,
  UserId int NOT NULL,
  Content longtext NOT NULL,
  ParentCommentId int NULL,
  Upvotes int NOT NULL DEFAULT 0,
  IsPinned tinyint(1) NOT NULL DEFAULT 0,
  IsDeleted tinyint(1) NOT NULL DEFAULT 0,
  CreatedAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UpdatedAt datetime NULL,
  PRIMARY KEY (Id),
  CONSTRAINT FK_ResourceComments_CommunityResources FOREIGN KEY (ResourceId) REFERENCES CommunityResources(Id) ON DELETE CASCADE,
  CONSTRAINT FK_ResourceComments_Users FOREIGN KEY (UserId) REFERENCES Users(UserID) ON DELETE RESTRICT,
  CONSTRAINT FK_ResourceComments_Parent FOREIGN KEY (ParentCommentId) REFERENCES ResourceComments(Id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ========================================
-- STEP 7: Create ResourceReports table
-- ========================================
CREATE TABLE IF NOT EXISTS ResourceReports (
  Id int NOT NULL AUTO_INCREMENT,
  ResourceId int NOT NULL,
  ReporterId int NOT NULL,
  \`Reason\` longtext NOT NULL,
  Status longtext DEFAULT "Pending",
  CreatedAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  ResolvedAt datetime NULL,
  PRIMARY KEY (Id),
  CONSTRAINT FK_ResourceReports_CommunityResources FOREIGN KEY (ResourceId) REFERENCES CommunityResources(Id) ON DELETE CASCADE,
  CONSTRAINT FK_ResourceReports_Users FOREIGN KEY (ReporterId) REFERENCES Users(UserID) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ========================================
-- STEP 8: Create ResourceShares table
-- ========================================
CREATE TABLE IF NOT EXISTS ResourceShares (
  Id int NOT NULL AUTO_INCREMENT,
  ResourceId int NOT NULL,
  UserId int NULL,
  SharedVia longtext NULL,
  ExternalIpAddress longtext NULL,
  CreatedAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (Id),
  CONSTRAINT FK_ResourceShares_CommunityResources FOREIGN KEY (ResourceId) REFERENCES CommunityResources(Id) ON DELETE CASCADE,
  CONSTRAINT FK_ResourceShares_Users FOREIGN KEY (UserId) REFERENCES Users(UserID) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ========================================
-- STEP 9: Update EF Migrations History
-- ========================================
INSERT IGNORE INTO __EFMigrationsHistory (MigrationId, ProductVersion)
VALUES
  ("20260530113851_UpdateCommunityResourceMetrics", "8.0.12"),
  ("20260530123343_AddCommunityGamificationTables", "8.0.12");

-- ========================================
-- VERIFY
-- ========================================
SELECT "=== CommunityResources Columns ===" AS Info;
DESCRIBE CommunityResources;
SELECT "=== New Tables Created ===" AS Info;
SHOW TABLES LIKE "Resource%";
SHOW TABLES LIKE "UserCollections";

EOSQL
'
