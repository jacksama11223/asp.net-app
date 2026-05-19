import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  token: localStorage.getItem('slms_token') || null,
  user: JSON.parse(localStorage.getItem('slms_user')) || null,
  isAuthenticated: !!localStorage.getItem('slms_token'),
  currentLessonProgress: {}, // Lưu tiến trình video hiện tại dưới dạng { lessonId: seconds }

  login: (token, user) => {
    localStorage.setItem('slms_token', token);
    localStorage.setItem('slms_user', JSON.stringify(user));
    set({ token, user, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem('slms_token');
    localStorage.removeItem('slms_user');
    set({ token: null, user: null, isAuthenticated: false, currentLessonProgress: {} });
  },

  updateUser: (updatedUser) => {
    localStorage.setItem('slms_user', JSON.stringify(updatedUser));
    set({ user: updatedUser });
  },

  setLessonProgress: (lessonId, seconds) => {
    set((state) => ({
      currentLessonProgress: {
        ...state.currentLessonProgress,
        [lessonId]: seconds
      }
    }));
  }
}));
