export type ICounts = {
  users: number;
  courses: number;
  messages: number;
  tracks: number;
};

export type IUsersVSUsersEnrolled = {
  period: string;
  totalUsers: number;
  enrolledUsers: number;
};
export type IUsersVSUsersWithRoadmaps = {
  period: string;
  totalUsers: number;
  usersWithRoadmaps: number;
};
export type IDashboard = {
  counts: ICounts;
  UsersVSUsersEnrolled: IUsersVSUsersEnrolled[];
  UsersVSUsersWithRoadmaps: IUsersVSUsersWithRoadmaps[];
};
