#!/bin/bash
# Script to create missing StudyGroups and CommunityQuestions tables in MariaDB

docker exec aspnet-app-backend-1 bash -c '
apt-get update -qq && apt-get install -y -qq mariadb-client > /dev/null 2>&1

mariadb -h db -u root -pSmartLMS_DB_Secure_2026 SmartLMS <<'EOSQL'

-- ========================================
-- STEP 1: Create StudyGroups table
-- ========================================
CREATE TABLE IF NOT EXISTS `StudyGroups` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `Name` longtext CHARACTER SET utf8mb4 NOT NULL,
    `Subject` longtext CHARACTER SET utf8mb4 NOT NULL,
    `Description` longtext CHARACTER SET utf8mb4 NOT NULL,
    `LeaderId` int NOT NULL,
    `ProgressPercentage` int NOT NULL,
    `EXP` int NOT NULL,
    `IsPrivate` tinyint(1) NOT NULL,
    `IsApproved` tinyint(1) NOT NULL,
    `CreatedAt` datetime(6) NOT NULL,
    CONSTRAINT `PK_StudyGroups` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_StudyGroups_Users_LeaderId` FOREIGN KEY (`LeaderId`) REFERENCES `Users` (`UserID`) ON DELETE CASCADE
) CHARACTER SET=utf8mb4;

-- ========================================
-- STEP 2: Create StudyGroupMembers table
-- ========================================
CREATE TABLE IF NOT EXISTS `StudyGroupMembers` (
    `GroupId` int NOT NULL,
    `UserId` int NOT NULL,
    `Role` longtext CHARACTER SET utf8mb4 NOT NULL,
    `JoinedAt` datetime(6) NOT NULL,
    CONSTRAINT `PK_StudyGroupMembers` PRIMARY KEY (`GroupId`, `UserId`),
    CONSTRAINT `FK_StudyGroupMembers_StudyGroups_GroupId` FOREIGN KEY (`GroupId`) REFERENCES `StudyGroups` (`Id`) ON DELETE CASCADE,
    CONSTRAINT `FK_StudyGroupMembers_Users_UserId` FOREIGN KEY (`UserId`) REFERENCES `Users` (`UserID`) ON DELETE CASCADE
) CHARACTER SET=utf8mb4;

-- ========================================
-- STEP 3: Create CommunityQuestions table
-- ========================================
CREATE TABLE IF NOT EXISTS `CommunityQuestions` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `Title` longtext CHARACTER SET utf8mb4 NOT NULL,
    `Content` longtext CHARACTER SET utf8mb4 NOT NULL,
    `AttachmentIds` longtext CHARACTER SET utf8mb4 NOT NULL,
    `AuthorId` int NOT NULL,
    `Status` longtext CHARACTER SET utf8mb4 NOT NULL,
    `BestAnswerId` int NULL,
    `IsApproved` tinyint(1) NOT NULL,
    `CreatedAt` datetime(6) NOT NULL,
    CONSTRAINT `PK_CommunityQuestions` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_CommunityQuestions_Users_AuthorId` FOREIGN KEY (`AuthorId`) REFERENCES `Users` (`UserID`) ON DELETE CASCADE
) CHARACTER SET=utf8mb4;

-- ========================================
-- STEP 4: Create CommunityAnswers table
-- ========================================
CREATE TABLE IF NOT EXISTS `CommunityAnswers` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `QuestionId` int NOT NULL,
    `Content` longtext CHARACTER SET utf8mb4 NOT NULL,
    `AttachmentIds` longtext CHARACTER SET utf8mb4 NOT NULL,
    `AuthorId` int NOT NULL,
    `IsVerified` tinyint(1) NOT NULL,
    `Votes` int NOT NULL,
    `CreatedAt` datetime(6) NOT NULL,
    CONSTRAINT `PK_CommunityAnswers` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_CommunityAnswers_CommunityQuestions_QuestionId` FOREIGN KEY (`QuestionId`) REFERENCES `CommunityQuestions` (`Id`) ON DELETE CASCADE,
    CONSTRAINT `FK_CommunityAnswers_Users_AuthorId` FOREIGN KEY (`AuthorId`) REFERENCES `Users` (`UserID`) ON DELETE CASCADE
) CHARACTER SET=utf8mb4;

-- ========================================
-- VERIFY
-- ========================================
SELECT "=== New Tables Created Successfully ===" AS Info;
SHOW TABLES LIKE "Study%";
SHOW TABLES LIKE "CommunityQ%";
SHOW TABLES LIKE "CommunityA%";

EOSQL
'
