import React from "react";
import { Route } from "react-router";

import Layout from "./components/Layout";
import Home from "./components/Home";
import UploadFile from "./components/UploadFile";

export default function App() {
  return (
    <Layout>
      <Route exact path="/" component={Home} />
      <Route path="/upload-file" component={UploadFile} />
    </Layout>
  );
}
