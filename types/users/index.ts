export type IUser = {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  roadmap: {
    progress: string | null;
    trackName: string | null;
  };
  enrolledCourses: {
    _id: string;
    title: string;
    image: string;
    totalVideos: string;
    watchedVideos: string;
    progress: string;
  }[];
  isBlocked: boolean;
};
