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
import { Eye } from "lucide-react";
import Image from "next/image";

export function ShowUserCourses({
  enrolledCourses,
  name,
}: {
  enrolledCourses: {
    _id: string;
    title: string;
    image: string;
    totalVideos: string;
    watchedVideos: string;
    progress: string;
  }[];
  name: string;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="border-gray-300">
          <Eye className=" h-5 w-5" />
          View Courses
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Enrolled Courses for {name} </DialogTitle>
          <DialogDescription>
            Here are all the courses you're currently enrolled in.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {enrolledCourses?.map((course) => (
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
                      className={`h-2 rounded-full transition-all duration-300
                        
                        ${
                          parseInt(course.progress, 10) >= 80
                            ? "bg-green-500"
                            : parseInt(course.progress, 10) >= 50
                            ? "bg-yellow-500"
                            : "bg-blue-500"
                        }`}
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
      </DialogContent>
    </Dialog>
  );
}
