import React from "react";
import QuotesCard from "./components/cards/QuotesCard";
import QuotesModal from "./components/Modals/QuotesModal";

const Home: React.FC = () => {
  return (
    <div className="flex items-center justify-center mt-10">
      <QuotesCard />
      <QuotesModal />
    </div>
  );
};

export default Home;
