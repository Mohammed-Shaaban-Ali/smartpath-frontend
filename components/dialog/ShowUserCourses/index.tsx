import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";

export function ShowUserCourses() {
  const enrolledCourses = [
    {
      _id: "683e97a5fd6b539ff845b32a",
      title: "Learn JavaScript In Arabic 2021",
      image:
        "https://res.cloudinary.com/dwhzpccfb/image/upload/v1748932475/sections/1748932477140-hqdefault.jpg.jpg",
      totalVideos: 1,
      watchedVideos: 0,
      progress: 0,
    },
    {
      _id: "683e9a94fd6b539ff845b340",
      title: "moshaaban",
      image:
        "https://res.cloudinary.com/dwhzpccfb/image/upload/v1748933227/sections/1748933229298-Screenshot-2025-03-18-154954.png.png",
      totalVideos: 1,
      watchedVideos: 0,
      progress: 0,
    },
    {
      _id: "683ec54e9578b8951d589dd5",
      title: "122121",
      image:
        "https://res.cloudinary.com/dwhzpccfb/image/upload/v1748944167/sections/1748944169554-Screenshot-2025-03-18-154954.png.png",
      totalVideos: 1,
      watchedVideos: 0,
      progress: 0,
    },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>View Enrolled Courses</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>My Enrolled Courses</DialogTitle>
          <DialogDescription>
            Here are all the courses you're currently enrolled in.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {enrolledCourses.map((course) => (
            <div
              key={course._id}
              className="flex items-center space-x-4 p-4 border rounded-lg"
            >
              <Image
                src={course.image}
                alt={course.title}
                width={100}
                height={100}
                className="w-16 h-16 rounded-md"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm truncate">
                  {course.title}
                </h3>
                <div className="flex items-center justify-between mt-2 text-sm text-gray-600">
                  <span>{course.totalVideos} videos</span>
                  <span>
                    {course.watchedVideos}/{course.totalVideos} watched
                  </span>
                </div>
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500 mt-1 inline-block">
                    {course.progress}% complete
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
