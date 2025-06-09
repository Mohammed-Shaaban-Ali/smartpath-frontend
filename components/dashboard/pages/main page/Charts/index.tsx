import { IDashboard } from "@/types/dashboard";
import PlansStatistic from "./PlansStatistic";
import SubscriptionsStatistic from "./SubscriptionsStatistic";

type Props = {
  data: IDashboard | undefined;
  isLoading: boolean;
};

function Charts({ data, isLoading }: Props) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-5 gap-4">
      <SubscriptionsStatistic
        data={data?.UsersVSUsersEnrolled}
        isLoading={isLoading}
      />
      <PlansStatistic
        data={data?.UsersVSUsersWithRoadmaps}
        isLoading={isLoading}
      />
    </section>
  );
}

export default Charts;
