'use client';

import Header from "@/components/header/header";
import { useState } from "react";
import { Input, Select } from 'antd';

const { Option } = Select;

const HomePage = () => {
  const [status, setStatus] = useState('unknown');
  const [gender, setGender] = useState('unknown');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <body>
  <div className="container">
      <Header />
      <main>
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-start">
            <label className="mb-1 text-white">
              <h4>Имя персонажа</h4>
            </label>
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Введите имя персонажа..."
              className="w-[90vw] sm:w-[70vw]"
            />
          </div>
        </div>

        <div className="flex justify-around mt-10">
          <div className="flex flex-col items-center">
            <div className="flex flex-col items-start">
              <label className="mb-1 text-white">
                <h4>Жив???</h4>
              </label>
              <Select
                value={status}
                onChange={(value) => setStatus(value)}
                className="w-[80vw] sm:w-[60vw] md:w-[40vw] lg:w-[30vw]"
                placeholder="Выберите статус"
              >
                <Option value="unknown">Неизвестно</Option>
                <Option value="alive">Жив</Option>
                <Option value="dead">Мертв</Option>
              </Select>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex flex-col items-start">
              <label className="mb-1 text-white">
                <h4>Пол</h4>
              </label>
              <Select
                value={gender}
                onChange={(value) => setGender(value)}
                className="w-[80vw] sm:w-[60vw] md:w-[40vw] lg:w-[30vw]"
                placeholder="Выберите гендер"
              >
                <Option value="unknown">Неизвестно</Option>
                <Option value="male">Мужчина</Option>
                <Option value="female">Женщина</Option>
                <Option value="genderless">Без пола</Option>
              </Select>
            </div>  
          </div>
        </div>
      </main>


  </div>
  </body>
  );
}

export default HomePage;
