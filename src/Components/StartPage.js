import * as React from "react";
import { Loading } from "../Screens";
import { AuthProvider } from "./AuthProvider";

export default class StartPage extends React.Component {
  render() {
    return (
      <AuthProvider>
        <Loading />
      </AuthProvider>
    );
  }
}
