import * as React from 'react';
import LoadingPage from '../Screens/Loading';
import {AuthProvider} from './AuthProvider';

export default class StartPage extends React.Component {
  render() {
    return (
      <AuthProvider>
        <LoadingPage />
      </AuthProvider>
    );
  }
}
