/*
This is the dashboard element. It retrieve the user profile from github and display it.
*/

type DashboardProperties = {
  profile: {
    github_profile: { user_name: string; email: string; avatar_url: string };
  };
};

const Dashboard = ({ profile }: DashboardProperties): JSX.Element => {
  console.log(profile);
  return (
    <div className="flex flex-col w-full max-w-xl px-5 py-10 m-auto text-left">
      <div className="flex flex-col justify-center w-full max-w-sm p-5 m-auto">
        <h1 className="mb-10 text-4xl font-bold text-center md:text-5xl font-title">
          My Profile
        </h1>
        {profile.github_profile.avatar_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={profile.github_profile.avatar_url}
            width={150}
            height={150}
            alt="avatar"
            className="rounded-full mx-auto mb-10"
          />
        )}
        <div className="flex flex-col mb-5">
          <div>
            <span className="font-bold">Email:</span>{' '}
            {profile.github_profile.email}
          </div>
        </div>
        <div>
          <span className="font-bold">Github Username:</span>{' '}
          {profile.github_profile.user_name}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
