import { Cart } from "@/types/cart.type";
import { Lecture, Section } from "@/types/section.type";
import path from "path";

export const totalPrice = (carts: Cart[]) => {
    const checkedItems = carts.filter((item) => item.checked);

    const totalPrice = checkedItems.reduce(
      (total, item) => total + item.price,
      0
    );

    return totalPrice;
};
  
export const convertVNDtoUSD = (moneyVND: number) => {
    const exchangeRate = 24580;

    const convertedAmount = (moneyVND / exchangeRate).toFixed(1);

    return parseFloat(convertedAmount);
}

export const isURLValid = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};

export const checkFileExtension = (file: File):boolean =>{
  const allowedExtensions: string[] = ['mp4'];
  const fileName: string = file.name;
  const fileExtension: string = fileName.split('.').pop()!.toLowerCase();
  return allowedExtensions.includes(fileExtension);
}

export const handleGetDurationFormVideo = async (file: File) => {
    if (checkFileExtension(file)) {
      const videoElement = document.createElement("video");
      const videoURL = URL.createObjectURL(file);
      videoElement.src = videoURL;

      await new Promise<void>((resolve) => {
        videoElement.addEventListener("loadedmetadata", () => {
          resolve();
        });
      });

      return Math.round(videoElement.duration);
    }

    return 0;
};
  
export const handleCountFieldsInSection = (array: Section[] | null): { totalLectureCount: number, totalDurationCourse: string } => {
  if (array) {
    const lectureCounts = array.map(section => {
      const filteredLectures = (section as Section)?.lectures.filter(lecture => lecture.ordinalNumber !== -1);
      return filteredLectures.length;
    });
  
    const totalLectureCount = lectureCounts.reduce((acc, count) => acc + count, 0);
  
    const totalDurationCourse: string = convertLongToTime(array.reduce((total, section) => {
      const sectionDuration: number = section.lectures.reduce(
        (sectionTotal, lecture) => sectionTotal + (lecture.videoDuration as number),
        0
      );
      return total + sectionDuration;
    }, 0))
  
    return { totalLectureCount: totalLectureCount, totalDurationCourse: totalDurationCourse };
  }
  return { totalLectureCount: 0, totalDurationCourse: "0" };
}
  
export const convertLongToTime = (longValue: number): string => {
  const date = new Date(longValue * 1000);
  const timeString = date.toISOString().substr(11, 8);

  if (timeString.startsWith("00")) {
    return timeString.substr(3);
  }

  return timeString;
};
