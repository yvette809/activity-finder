import Activities from "./components/Activities";
import { getActivities } from "@/utils/api";
import ClientOnly from "./components/ClientOnly";
//import { toast } from "react-hot-toast";

const page = async () => {
  const data = await getActivities();
  console.log(JSON.stringify(data, null, 2));

  return <ClientOnly><Activities data={data} /></ClientOnly>;
};

export default page;
