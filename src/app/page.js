import Activities from "./components/Activities";
import { getActivities } from "@/utils/api";
//import { toast } from "react-hot-toast";

const page = async () => {
  const data = await getActivities();
  return <Activities data={data} />;
};

export default page;
