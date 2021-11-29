import { DownvoteIcon, MinusIcon, UpvoteIcon } from 'components/Icons';
import PipelineStatusButton from 'components/MergeRequest/PipelineStatusButton';
import Pill from 'components/Pill';
import { UserContext } from 'components/UserProvider';
import Emojify from 'react-emojione';
import { MergeRequest } from 'types/FormattedTypes';
import { User } from 'types/GitLabTypes';

interface Props {
  mergeRequest: MergeRequest;
}

const MergeRequestItem = ({ mergeRequest }: Props): JSX.Element => {
  return (
    <UserContext.Consumer>
      {(user: User) => {
        const haveIUpVoted = mergeRequest.upvoters.find((upvoter) => upvoter.id === user.id) ? true : false;
        const haveIDownVoted = mergeRequest.downvoters.find((downvoter) => downvoter.id === user.id) ? true : false;

        return (
          <tr>
            <td>
              <a
                className="text-xl no-underline text-black"
                href={mergeRequest.web_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Emojify>{mergeRequest.title}</Emojify>
              </a>
            </td>
            <td className="w-32">
              <div className="flex justify-center">
                <img
                  src={mergeRequest.author.avatar_url}
                  alt={mergeRequest.author.name}
                  className="h-10 w-10 rounded-full shadow-md"
                />
              </div>
            </td>
            <td className="w-24 text-center">
              {haveIUpVoted ? (
                <UpvoteIcon size={'lg'} />
              ) : haveIDownVoted ? (
                <DownvoteIcon size={'lg'} />
              ) : (
                <MinusIcon size={'lg'} />
              )}
            </td>
            <td className="w-24 text-center">
              <Pill text={mergeRequest.upvotes} type={mergeRequest.upvotes > 0 ? 'success' : 'disable'} />
            </td>
            <td className="w-24 text-center">
              <Pill text={mergeRequest.downvotes} type={mergeRequest.downvotes > 0 ? 'danger' : 'disable'} />
            </td>
            <td className="w-32 text-center">
              <PipelineStatusButton pipeline={mergeRequest.pipeline} />
            </td>
          </tr>
        );
      }}
    </UserContext.Consumer>
  );
};

export default MergeRequestItem;
