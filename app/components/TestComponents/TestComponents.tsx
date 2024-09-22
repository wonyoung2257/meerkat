"use client";

import { getClientSideClient } from "@/app/utils/supabase/client";
import { PRD } from "@/app/_types/prd.type";

export const TestComponents = () => {
  const supabase = getClientSideClient();

  const handleAddTestData = async () => {
    const testData: Omit<PRD, "id">[] = [
      {
        send_at: new Date(),
        receiver: "dnjsdud2257@gmail.com",
        message: "PRD 검토 부탁드립니다.",
        prd_url: "https://example.com/prd1",
        checked: false,
        complated: false,
      },
      {
        send_at: new Date(Date.now() - 86400000), // 1일 전
        receiver: "dnjsdud2257@gmail.com",
        message: "새로운 기능 PRD입니다.",
        prd_url: "https://example.com/prd2",
        checked: true,
        complated: false,
      },
      {
        send_at: new Date(Date.now() - 172800000), // 2일 전
        receiver: "dnjsdud2257@gmail.com",
        message: "긴급 PRD 리뷰 요청",
        prd_url: "https://example.com/prd3",
        checked: true,
        complated: true,
      },
      {
        send_at: new Date(Date.now() + 86400000), // 1일 후
        receiver: "dnjsdud2257@gmail.com",
        message: "다음 스프린트 PRD입니다.",
        prd_url: "https://example.com/prd4",
        checked: false,
        complated: false,
      },
      {
        send_at: new Date(Date.now() + 172800000), // 2일 후
        receiver: "dnjsdud2257@gmail.com",
        message: "신규 프로젝트 PRD",
        prd_url: "https://example.com/prd5",
        checked: false,
        complated: false,
      },
    ];

    const { data, error } = await supabase.from("prd").insert(testData);
    console.log("🚀 ~ handleAddTestData ~ data:", data);

    if (error) {
      console.error("데이터 추가 중 오류 발생:", error);
    } else {
      console.log("테스트 데이터가 성공적으로 추가되었습니다.");
    }
  };

  return <button onClick={handleAddTestData}>PRD 테스트 데이터 추가</button>;
};
