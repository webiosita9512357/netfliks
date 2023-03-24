import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import Auth from '@/pages/auth';

jest.mock('next/router', () => ({
  useRouter: jest.fn()
}));

   describe('Login/Register layer render', () => {
      it('should render the movie dashboard', () => {
        render(<Auth />);
        expect(screen.getByText('email')).toBeInTheDocument();
      });
   });

