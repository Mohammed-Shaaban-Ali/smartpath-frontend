export type ICourses = {
  _id: string;
  title: string;
  image: string;
  enrolledCount: number;
  completedCount: number;
  totalDuration: number;
  numberOfSections: number;
  createdAt: string;
};

export type ICourseDetails = {
  _id: string;
  title: string;
  image: string;
  description: string;
  track: string;
  sections: {
    _id: string;
    title: string;
    totalDuration: number;
    videos: {
      _id: string;
      title: string;
      videoUrl: string;
      duration: number;
    }[];
  }[];
};
