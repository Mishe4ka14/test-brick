'use client';

import Header from "@/components/header/header";
import { useState } from "react";

const HomePage = () => {

  const [searchQuery, setSearchQuery] = useState('');

  return(
    <>
      <Header/>
      <main>
        <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border p-2 w-full rounded-lg"
            placeholder="Введите имя персонажа..."
          />
      </main>
    </>
  )
}

export default HomePage;