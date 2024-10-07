'use client';

import { usePathname } from 'next/navigation';

const Header = () => {
  const pathname = usePathname();

  const isHomePage = pathname === '/';
  const isCharacterPage = pathname.startsWith('/details/character');
  const isSeriesPage = pathname.startsWith('/details/series');

  return (
    <header>
      <h1 className='font-bold first-letter:text-red-700 text-3xl'>Вселенная Рик и Морти</h1>
      {isHomePage && (
        <p>
          На этой странице вы можете найти любимых персонажей по имени, расе, полу (если он у них есть) и многим другим параметрам.
        </p>
      )}
      {(isCharacterPage || isSeriesPage) && (
        <p>
          На этой странице вы можете больше узнать про {isCharacterPage ? 'персонажа' : 'серию'}.
        </p>
      )}
    </header>
  );
};

export default Header;
