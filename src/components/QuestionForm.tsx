import { cn } from "@/lib/utils";
import { relative } from "path";
import React from "react";
import Meteors from "@/components/magicui/Meteors";
const LabelnputContainer = ({
  children,
  classname,
}: {
  children: React.ReactNode;
  classname?: string;
}) => {
  return (
    <div
      className={cn(
        "relative flex w-full flex-col space-y-2 overflow-hidden rounded-xl border border-white/20 bg-slate-950 p-4",
        classname
      )}
    >
      <Meteors number={30} />
      {children}
    </div>
  );
};

function QuestionForm() {
  return <div>QuestionForm</div>;
}

export default QuestionForm;
