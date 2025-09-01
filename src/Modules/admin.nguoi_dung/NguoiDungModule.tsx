// DanhMucModule.tsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NoutFountPage from '../../shared/page/NoutFound';
import { NguoiDungListComponent } from './NguoiDungListComponent';

export const NguoiDungModule: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path='' element={<NguoiDungListComponent/>}>
        </Route>
        <Route path='*' element={<NoutFountPage/>}></Route>
      </Routes>
    </>
  );
};
