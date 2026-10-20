import type { ReactNode } from 'react';
import { Outlet, Route, Routes } from 'react-router';

interface OutletContextProviderProps<T> {
  context: T;
  path?: string;
  children: ReactNode;
}

export const OutletContextProvider = <T,>({
  context,
  path = '*',
  children,
}: OutletContextProviderProps<T>) => (
  <Routes>
    <Route element={<Outlet context={context} />}>
      <Route path={path} element={children} />
    </Route>
  </Routes>
);
