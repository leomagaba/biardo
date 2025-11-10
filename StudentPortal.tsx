import { Routes, Route } from "react-router-dom";
import Header from "@/components/Header";
import StudentMenuSelection from "@/components/StudentMenuSelection";

const StudentPortal = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto p-6">
        <Routes>
          <Route path="/" element={<StudentMenuSelection />} />
          {/* Outras rotas do portal do estudante podem ser adicionadas aqui */}
        </Routes>
      </main>
    </div>
  );
};

export default StudentPortal;