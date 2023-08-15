import { PostingResponse } from "@/src/types/api/candidate";
import { constructAvailabilityObject } from "../../AvailabilityWiget";
import { AvailabilityExpand } from "../../AvailabilityWiget/AvailabilityExpand";

type PostBodyProps = { post: PostingResponse };

export const PostBody = ({ post }: PostBodyProps) => {
  const availability = constructAvailabilityObject(post.posting.shifts);

  return (
    <div className='flex flex-col gap-5 p-5'>
      <div className='text-2xl font-semibold'>{`$${post.posting.pay}/hr`}</div>
      <div className='flex flex-col gap-1'>
        <h1 className='font-semibold text-lg'>Job Description</h1>
        <p className='text-gray-500'>{post.posting.jobDescription}</p>
      </div>
      <div className='flex flex-col gap-1'>
        <h1 className='font-semibold text-lg'>Benefits</h1>
        <p className='text-gray-500'>{post.posting.benefits}</p>
      </div>
      <div className='flex flex-col gap-1'>
        <h1 className='font-semibold text-lg'>Availability</h1>
        <div className='h-[500px] overflow-auto pr-1'>
          <AvailabilityExpand availability={availability} />
        </div>
      </div>
    </div>
  );
};