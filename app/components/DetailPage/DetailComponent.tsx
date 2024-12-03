import React from "react";
import { getClient } from "@/app/utils/supabase/server";
import Header from "./Header";
import UserProfile from "../UserProfile/UserProfile";
import Footer from "../Footer/Footer";
import { PrdBoard } from "./PrdBoard";
import { PrdProvider } from "../PrdProvider/PrdProvider";

const Dashboard: React.FC = async () => {
  const supabase = getClient();

  // 사용자 정보 가져오기
  const { data: user, error: userError } = await supabase.auth.getUser();

  if (userError) {
    return (
      <div>
        사용자 정보를 가져오는 중 오류가 발생했습니다: {userError.message}
      </div>
    );
  }

  // 사용자의 이메일로 프로젝트 데이터 가져오기
  const { data: projects, error: projectsError } = await supabase
    .from("prd")
    .select("*")
    .eq("receiver", user.user?.email)
    .order("send_at", { ascending: false });

  const { data: sendPrd, error: sendPrdError } = await supabase
    .from("prd")
    .select("*")
    .eq("sender_email", user.user?.email)
    .order("send_at", { ascending: false });

  if (projectsError || sendPrdError) {
    return (
      <div>
        프로젝트 데이터를 가져오는 중 오류가 발생했습니다:{" "}
        {projectsError?.message || sendPrdError?.message}
      </div>
    );
  }

  return (
    <>
      <div className="flex overflow-hidden flex-col bg-white">
        <Header />
        <main className="flex flex-col self-center px-6 py-20 w-full max-w-[1200px] min-h-[958px] max-md:px-5 max-md:max-w-full gap-[60px]">
          <PrdProvider projects={projects} sendPrd={sendPrd}>
            <UserProfile user={user.user} />
            <PrdBoard userId={user.user?.id} />
            <Footer />
          </PrdProvider>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
