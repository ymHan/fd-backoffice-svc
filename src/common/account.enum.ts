export const userRole = {
  USER: 'user', // 일반 사용자
  MEMBER: 'member', // 거래처 소속 사용자
  ENGINEER: 'engineer', // 기술지원 담당자
  MODERATOR: 'moderator', // 관리자
  ADMIN: 'admin', // 시스템 관리자
} as const;

export type UserRole = (typeof userRole)[keyof typeof userRole];
