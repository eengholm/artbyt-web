import Avatar from "./avatar";
import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";
import { AssignmentTitle } from "@/app/_components/assignment-title";
import { type Author } from "@/interfaces/author";

type Props = {
  title: string;
  coverImage: string;
};

export function AssignmentHeader({ title, coverImage }: Props) {
  return (
    <>
      <AssignmentTitle>{title}</AssignmentTitle>
      <div className="hidden md:block md:mb-12"></div>
      <div className="mb-8 md:mb-16 sm:mx-0">
        <CoverImage title={title} src={coverImage} />
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="block md:hidden mb-6"></div>
      </div>
    </>
  );
}
