// DanhMucModule.tsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { DanhMucListCp } from './DanhMucListCp';
import { DanhMucFormCp } from './DanhMucFormCp';
import NoutFountPage from '../../shared/page/NoutFound';

export const DanhMucModule: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path='' element={<DanhMucListCp/>}></Route>
        <Route path='/:id' element={<DanhMucFormCp/>}></Route>
        <Route path='*' element={<NoutFountPage/>}></Route>
      </Routes>
    </>
  );
};
