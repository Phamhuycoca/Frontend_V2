// DanhMucModule.tsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NoutFountPage from '../../shared/page/NoutFound';
import { DanhMucFormComponent } from './DanhMucFormComponent';
import { DanhMucListComponent } from './DanhMucListComponent';

export const DanhMucModule: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path='' element={<DanhMucListComponent/>}>
        </Route>
        <Route path=':id' element={<DanhMucFormComponent/>}></Route>
        <Route path='*' element={<NoutFountPage/>}></Route>
      </Routes>
    </>
  );
};
