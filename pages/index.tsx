import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const MainPage: NextPage = () => {

  const router = useRouter()
  useEffect(() => {
    router.push('/login')
  }, [])

  return (
    <>
    </>
  );
};

export default MainPage;
