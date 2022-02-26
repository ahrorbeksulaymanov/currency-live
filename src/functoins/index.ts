import { useState } from "react";

const RefreshFunc = (loading: boolean) => {
  const [refresh, setrefresh] = useState<boolean>(true);

  if (!loading) {
    setTimeout(() => {
      setrefresh(!refresh);
    }, 60000);
  }

  return refresh;
};
export default RefreshFunc;
