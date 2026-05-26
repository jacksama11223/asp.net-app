export type UserRole = 'Student' | 'Instructor' | 'Admin' | 'Mentor';

export interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
  avatar: string;
  points: number;
  studyHours: number;
  classYear?: string;
  major?: string;
}

export interface Comment {
  id: string;
  authorName: string;
  authorAvatar: string;
  authorRole: UserRole;
  createdAt: string;
  content: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  authorName: string;
  authorAvatar: string;
  authorRole: UserRole;
  createdAt: string;
  likes: number;
  likedByUser: boolean;
  commentsCount: number;
  comments: Comment[];
  category: string;
  attachmentUrl?: string;
  attachmentType?: 'image' | 'video' | 'file';
  tag?: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  authorName: string;
  authorAvatar: string;
  authorRole: UserRole;
  subject: string;
  downloadCount: number;
  fileSize: string;
  fileType: string;
  createdAt: string;
  likes: number;
  likedByUser: boolean;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  speaker: string;
  speakerAvatar: string;
  date: string;
  time: string;
  platform: string;
  registeredCount: number;
  registeredByUser: boolean;
  category: 'webinar' | 'workshop' | 'study_session';
}

export interface Answer {
  id: string;
  authorName: string;
  authorAvatar: string;
  authorRole: UserRole;
  content: string;
  createdAt: string;
  votes: number;
  votedByUser?: 'up' | 'down';
  isAccepted: boolean;
}

export interface Question {
  id: string;
  title: string;
  content: string;
  authorName: string;
  authorAvatar: string;
  authorRole: UserRole;
  createdAt: string;
  votes: number;
  votedByUser?: 'up' | 'down';
  answersCount: number;
  answers: Answer[];
  tags: string[];
  solved: boolean;
}

export interface StudyGroup {
  id: string;
  name: string;
  subject: string;
  memberCount: number;
  maxMembers: number;
  description: string;
  creatorName: string;
  joinedByUser: boolean;
  nextMeeting?: string;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  avatar: string;
  role: UserRole;
  points: number;
  badges: string[];
  weeklyGain: number;
}
