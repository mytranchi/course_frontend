"use client";
import Loading from "@/app/(root)/user/personal/loading";
import CourseInforForm from "@/components/form/CourseInforForm";
import { useGetCourseByIdQuery } from "@/redux/services/courseApi";
import { Course } from "@/types/course.type";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function BasicsPage() {
  const params = useParams();
  const { data, isLoading } = useGetCourseByIdQuery(params.id as string);
  if (isLoading) return <Loading />;
  return (
    <div className="mt-10 shadow-xl w-full mx-5 ">
      <div className="my-5 mx-5 flex items-center font-bold text-xl">
        Thông Tin Cơ Bản
      </div>
      <hr />
      <div className="mt-10 ml-10">
        <CourseInforForm course={data?.data as Course} />
      </div>
    </div>
  );
}

export default BasicsPage;
