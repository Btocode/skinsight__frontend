import Spinner from "@/components/common/Spinner";
import dynamic from "next/dynamic";

const ProfileForm = dynamic(() => import("../_components/ProfileForm"), {
  loading: () => <Spinner />,
});

const MyProfilePage = () => {
  return <ProfileForm />;
};

export default MyProfilePage;
