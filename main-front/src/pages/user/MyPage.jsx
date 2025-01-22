import { useEffect, useState } from "react";
import { getAllUser } from "../../api/userApi";

export default function MyPage() {
  const [userData, setUserData] = useState([]); // 초기값을 빈 배열로 설정

  useEffect(() => {
    const allData = async () => {
      const data = await getAllUser();
      setUserData(data);
    };
    allData();
  }, []);
  console.log(userData);

  return <></>;
}
