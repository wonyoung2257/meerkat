import LoginPage from "./components/LoginPage/LoginPage";
import Header from "./components/DetailPage/Header";
export default function Home() {
  return (
    <div className="h-screen bg-[linear-gradient(0deg,rgba(255,255,255,0.35)_0%,rgba(255,255,255,0.35)_100%),linear-gradient(180deg,rgba(220,255,175,0.40)_0%,rgba(255,231,240,0.40)_100%)]">
      <Header />
      <div className="flex justify-center flex-col items-center pt-20">
        <LoginPage />
      </div>
    </div>
  );
}
